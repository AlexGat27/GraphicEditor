// const fs = require('fs')

export class ArduinoConverter{

    constructor(){
        this.updatedLoopContent = '';
        this.conIndex = 0;
    }

    _createConditionStringRecord(container){
        switch(container.countConditions) {
            case 1:
                const con = container.conditionAttributes[0];
                if (con.condition === "Сухой контакт"){
                    this.updatedLoopContent += parseInt(con.inputSignal) ? 
                    `   con[${this.conIndex}].checkOneValue(buttons[${con.value}].isPressed(${con.inputSignal}, ${con.spCanInterval}));\n` :
                    `   con[${this.conIndex}].checkOneValue(buttons[${con.value}].isHold(${con.spCanInterval}));\n`
                }else if (con.condition === "Фоторезистор"){
                    this.updatedLoopContent += con.value === "День" ? 
                    `   con[${this.conIndex}].checkOneValue(day_night(${con.spCanInterval}));\n` :
                    `   con[${this.conIndex}].checkOneValue(!day_night(${con.spCanInterval}));\n`
                }
                break;
            case 2:
                this.updatedLoopContent += `   con[${this.conIndex}].checkTwoValues(`
                container.conditionAttributes.forEach(con =>{
                    if (con.condition === "Сухой контакт"){
                        this.updatedLoopContent += parseInt(con.inputSignal) ? 
                        `buttons[${con.value}].isPressed(${con.inputSignal}, ${con.spCanInterval}), ` :
                        `buttons[${con.value}].isHold(${con.spCanInterval}), `
                    }else if (con.condition === "Фоторезистор"){
                        this.updatedLoopContent += con.value === "День" ? 
                        `day_night(${con.spCanInterval}), ` :`!day_night(${con.spCanInterval}), `
                    }
                })
                this.updatedLoopContent = this.updatedLoopContent.slice(0, this.updatedLoopContent.length - 2) + `);\n`;
                break;
            case 3:
                this.updatedLoopContent += `   con[${this.conIndex}].checkThreeValues(`
                container.conditionAttributes.forEach(con =>{
                    if (con.condition === "Сухой контакт"){
                        this.updatedLoopContent += parseInt(con.inputSignal) ? 
                        `buttons[${con.value}].isPressed(${con.inputSignal}, ${con.spCanInterval}), ` :
                        `buttons[${con.value}].isHold(${con.spCanInterval}), `
                    }else if (con.condition === "Фоторезистор"){
                        this.updatedLoopContent += con.value === "День" ? 
                        `day_night(${con.spCanInterval}), ` :`!day_night(${con.spCanInterval}), `
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
        container.actionAttributes.forEach(act =>{
            if (act.action === "Включить"){
                if (act.actionType === "Без мерцания"){
                    this.updatedLoopContent += `      kontours[${contourID}].turnON(${act.power});\n`;
                }else if (act.actionType === "Мигание"){
                    if (act.cyclePeriod === "Постоянно" || act.cyclePeriod === ''){
                        this.updatedLoopContent += `      kontours[${contourID}].blink(${act.interrupedTime}, ${act.interrupedTime}, ${act.power});\n`;
                    }else{
                        this.updatedLoopContent += `      kontours[${contourID}].blinkInPeriod(${act.interrupedTime}, ${act.interrupedTime}, ${act.cyclePeriod}, ${act.power});\n`;
                    }
                }
            }else if (act.action === "Выключить"){
                this.updatedLoopContent += `      kontours[${contourID}].turnOFF();\n`
            }
        })
    }

    createStringRecord(fileString, data){
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