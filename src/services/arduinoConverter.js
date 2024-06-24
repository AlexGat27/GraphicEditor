// const fs = require('fs')

export class ArduinoConverter{

    constructor(){
        this.updatedLoopContent = '';
        this.conIndex = 0;
    }

    _createConditionStringRecord(container){
        switch(container.conditionCases.length) {
            case 1:
                const con = container.conditionCases[0];
                if (con.condition === "Сухой контакт"){
                    this.updatedLoopContent += parseInt(con.countSignals) ? 
                    `   con[${this.conIndex}].checkOneValue(buttons[${con.value}].isPressed(${con.countSignals}, ${con.delay.value}));\n` :
                    `   con[${this.conIndex}].checkOneValue(buttons[${con.value}].isHold(${con.delay.value}));\n`
                }else if (con.condition === "Фоторезистор"){
                    this.updatedLoopContent += con.value === "День" ? 
                    `   con[${this.conIndex}].checkOneValue(day_night(${con.delay.value}));\n` :
                    `   con[${this.conIndex}].checkOneValue(!day_night(${con.delay.value}));\n`
                }
                break;
            case 2:
                this.updatedLoopContent += `   con[${this.conIndex}].checkTwoValues(`
                container.conditionCases.forEach(con =>{
                    if (con.condition === "Сухой контакт"){
                        this.updatedLoopContent += parseInt(con.countSignals) ? 
                        `buttons[${con.value}].isPressed(${con.countSignals}, ${con.delay.value}), ` :
                        `buttons[${con.value}].isHold(${con.delay.value}), `
                    }else if (con.condition === "Фоторезистор"){
                        this.updatedLoopContent += con.value === "День" ? 
                        `day_night(${con.delay.value}), ` :`!day_night(${con.delay.value}), `
                    }
                })
                this.updatedLoopContent = this.updatedLoopContent.slice(0, this.updatedLoopContent.length - 2) + `);\n`;
                break;
            case 3:
                this.updatedLoopContent += `   con[${this.conIndex}].checkThreeValues(`
                container.conditionCases.forEach(con =>{
                    if (con.condition === "Сухой контакт"){
                        this.updatedLoopContent += parseInt(con.countSignals) ? 
                        `buttons[${con.value}].isPressed(${con.countSignals}, ${con.delay.value}), ` :
                        `buttons[${con.value}].isHold(${con.delay.value}), `
                    }else if (con.condition === "Фоторезистор"){
                        this.updatedLoopContent += con.value === "День" ? 
                        `day_night(${con.delay.value}), ` :`!day_night(${con.delay.value}), `
                    }
                })
                this.updatedLoopContent = this.updatedLoopContent.slice(0, this.updatedLoopContent.length - 2) + `);\n`;
                break;
            default:
                console.error("Нет условий вообще")
                break;
        }
    }

    _createActionStringRecord(container, contourID){
        container.actionCases.forEach(act =>{
            switch(act.action){
                case "Включить":
                    this.updatedLoopContent += `      kontours[${contourID}].turnON(${act.power});\n`;
                    break;
                case "Мигать":
                    if (act.workingPeriod === "Постоянно" || act.workingPeriod === ''){
                        this.updatedLoopContent += `      kontours[${contourID}].blink(${act.interruption}, ${act.interruption}, ${act.power});\n`;
                    }else{
                        this.updatedLoopContent += `      kontours[${contourID}].blinkInPeriod(${act.interruption}, ${act.interruption}, ${act.workingPeriod}, ${act.power});\n`;
                    }
                    break;
                case "Выключить":
                    this.updatedLoopContent += `      kontours[${contourID}].turnOFF();\n`
                    break;
                default:
                    break;
            }
        })
    }

    createStringRecord(fileString, data){
        console.log(data)
        fileString = fileString.replace(/int countCon = (\d+);/, `int countCon = ${data.countContainers};`);
        data.contours.forEach(contour => {
            contour.containers.forEach(container => {
                this._createConditionStringRecord(container);
                this.updatedLoopContent += `   if (con[${this.conIndex}].getKontState() == KONT_ON){\n`;
                this._createActionStringRecord(container, contour.contourID);
                this.updatedLoopContent += `   }else if (con[${this.conIndex}].getKontState() == KONT_OFF) {
      kontours[${contour.contourID}].turnOFF();\n   }\n\n`;
                this.conIndex += 1;
            })
        });
        const match = fileString.match(/void loop\(\) \{([\s\S]*?)newUpdate\(\);/);
        if (match) {
            return fileString.replace(/void loop\(\) \{([\s\S]*?)newUpdate\(\);/, `void loop() {\n${this.updatedLoopContent}\n   newUpdate();`);
        }
        return fileString;
    }
}