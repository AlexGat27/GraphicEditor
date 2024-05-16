// const fs = require('fs')

export class ArduinoConverter{

    constructor(newFilePath){
        this.filePath = 'src/assets/default.txt';
        this.newFilePath = newFilePath;
    }

    async _readFile() {
        try {
            const response = await fetch(this.filePath);
            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }
            return await response.text();
        } catch (error) {
            console.error('Ошибка чтения файла:', error);
            return null;
        }
    }

    _writeFile(data) {
        try {
            const blob = new Blob([data], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.newFilePath;
            a.click();
            window.URL.revokeObjectURL(url);
            console.log('Файл успешно записан');
            return true;
        } catch (error) {
          console.error('Ошибка записи файла:', error);
          return false;
        }
      }

    _createStringRecord(fileString, data){
        fileString = fileString.replace(/int countCon = (\d+);/, `int countCon = ${data.countContainers};`);
        let updatedLoopContent = '';
        let conIndex = 0;
        data.contours.forEach(contour => {
            contour.containers.forEach(container => {
                switch(container.countConditions) {
                    case 1:
                        const con = container.conditionAttributes[0];
                        if (con.condition === "Сухой контакт"){
                            updatedLoopContent += parseInt(con.inputSignal) ? 
                            `   con[${conIndex}].checkOneValue(buttons[${con.value}].isPressed(${con.inputSignal}, ${con.spCanInterval}));\n` :
                            `   con[${conIndex}].checkOneValue(buttons[${con.value}].isHold(${con.spCanInterval}));\n`
                        }else if (con.condition === "Фоторезистор"){
                            updatedLoopContent += con.value === "День" ? 
                            `   con[${conIndex}].checkOneValue(day_night(${con.spCanInterval}));\n` :
                            `   con[${conIndex}].checkOneValue(!day_night(${con.spCanInterval}));\n`
                        }
                        break;
                    case 2:
                        updatedLoopContent += ` con[${conIndex}].checkTwoValues(`
                        container.conditionAttributes.forEach(con =>{
                            if (con.condition === "Сухой контакт"){
                                updatedLoopContent += parseInt(con.inputSignal) ? 
                                `buttons[${con.value}].isPressed(${con.inputSignal}, ${con.spCanInterval}), ` :
                                `buttons[${con.value}].isHold(${con.spCanInterval}), `
                            }else if (con.condition === "Фоторезистор"){
                                updatedLoopContent += con.value === "День" ? 
                                `day_night(${con.spCanInterval}), ` :`!day_night(${con.spCanInterval}), `
                            }
                        })
                        updatedLoopContent = updatedLoopContent.slice(0, updatedLoopContent.length - 2) + `);\n`;
                        break;
                    case 3:
                        updatedLoopContent += ` con[${conIndex}].checkThreeValues(`
                        container.conditionAttributes.forEach(con =>{
                            if (con.condition === "Сухой контакт"){
                                updatedLoopContent += parseInt(con.inputSignal) ? 
                                `buttons[${con.value}].isPressed(${con.inputSignal}, ${con.spCanInterval}), ` :
                                `buttons[${con.value}].isHold(${con.spCanInterval}), `
                            }else if (con.condition === "Фоторезистор"){
                                updatedLoopContent += con.value === "День" ? 
                                `day_night(${con.spCanInterval}), ` :`!day_night(${con.spCanInterval}), `
                            }
                        })
                        updatedLoopContent = updatedLoopContent.slice(0, updatedLoopContent.length - 2) + `);\n`;
                        break;
                    default:
                        console.error("Нет условий вообще")
                        break;
                }
                conIndex += 1;
            })
        });
        const match = fileString.match(/void loop\(\) \{([\s\S]*?)for/);
        if (match) {
            return fileString.replace(/void loop\(\) \{([\s\S]*?)for/, `void loop() {\n${updatedLoopContent}\n  for`);
        }
        return fileString;
    }

    async saveTxtFile(data){
        let fileString = await this._readFile();
        if (fileString){
            const newFileData = this._createStringRecord(fileString, data);
            return this._writeFile(newFileData);
        }
        return false;
    }
}