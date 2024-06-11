export class ActionCase {
    constructor(action, type, interruption, workingPeriod, power) {
        this.action = action;
        this.type = type;
        this.interruption = interruption;
        this.workingPeriod = workingPeriod;
        this.power = power;
    }
}

export class ConditionCase {
    constructor(condition, value, countSignals, delayType, delayValue) {
        this.condition = condition;
        this.value = value;
        this.countSignals = countSignals;
        this.delay = {
            type: delayType,
            value: delayValue
        };
    }
}

export class Container {
    constructor(actionCase, conditionCase) {
        this.actionCase = actionCase;
        this.conditionCase = conditionCase;
    }
}

export class Contour {
    constructor(contourID, rules) {
        this.contourID = contourID;
        this.rules = rules;
    }
}

export class CompileModel {
    constructor(scenario, contours) {
        this.scenario = scenario;
        this.contours = contours;
    }
}