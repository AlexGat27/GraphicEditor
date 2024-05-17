import { ArduinoConverter } from "./arduinoConverter";

export class FileCreator{
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

    async saveTxtFile(data){
        let fileString = await this._readFile();
        if (fileString){
            const arduinoConverter = new ArduinoConverter();
            const newFileData = arduinoConverter.createStringRecord(fileString, data);
            return this._writeFile(newFileData);
        }
        return false;
    }
}