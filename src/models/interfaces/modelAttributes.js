export class ConditionAttribute {
    constructor(condition, values, countSignals, delayTypes) {
        this.condition = condition;
        this.values = values;
        this.countSignals = countSignals;
        this.delays = { types: delayTypes };
    }
}

export class ActionAttribute{
    constructor(actions, types, interruptions, workingPeriodTypes, powers){
        this.actions = actions;
        this.types = types;
        this.interruptions = interruptions;
        this.workingPeriod = {types: workingPeriodTypes};
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