export class ConditionAttribute {
    constructor(condition='', values=null, countSignals=null, delayTypes=["более", "менее", "равно"]) {
        this.condition = condition;
        this.values = values;
        this.countSignals = countSignals;
        this.delayTypes = delayTypes;
    }
}

export class ActionAttribute{
    constructor(actions=['Включить', "Выключить", "Мигать", "Включить/Выключить"], interruptions=null, workingPeriod=null, powers=[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]){
        this.actions = actions;
        this.interruptions = interruptions;
        this.workingPeriod = workingPeriod;
        this.powers = powers;
    }
}

export class ModelAttributes {
    constructor(scenario, conditionAttributes, actionAttributes) {
        this.scenario = scenario;
        this.conditionAttributes = conditionAttributes;
        this.actionAttributes = actionAttributes;
    }
}