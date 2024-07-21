export class ConditionAttribute {
    constructor(condition='', values=[], countSignals=[], delayTypes=[]) {
        this.condition = condition;
        this.values = values;
        this.countSignals = countSignals;
        this.delayTypes = delayTypes;
    }
}

export class ActionAttribute{
    constructor(actions=[], interruptions=[], workingPeriod=[], powers=[]){
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