class ConditionAttributes{

    constructor(){
        this._condition = "";
        this._value = "";
        this._inputSignal = 0;
    }

    set inputSignal(value){
        if (value >= 0 && Number.isInteger(value)) {this._inputSignal = value}
        else {console.log("Значение inputSignal некорректно")}
    }
}




