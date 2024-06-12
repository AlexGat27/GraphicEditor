export class ActionCase {
    constructor(action='', interruption='', workingPeriod='', power='') {
        this.action = action;
        this.interruption = interruption;
        this.workingPeriod = workingPeriod;
        this.power = power;
    }
}

export class ConditionCase {
    constructor(condition='', value='', countSignals='', delay={delayType: '', delayValue: ''}) {
        this.condition = condition;
        this.value = value;
        this.countSignals = countSignals;
        this.delay = delay
    }
}

export class Container {
    constructor(actionCases=[], conditionCases=[]) {
        this.actionCases = actionCases;
        this.conditionCases = conditionCases;
    }
}

export class Contour {
    constructor(contourID, name=[], containers=[]) {
        this.contourID = contourID;
        this.name = name;
        this.selected = false;
        this.containers = containers;
    }
}

export class CompileModel {
    constructor(scenario, contours=[]) {
        this.scenario = scenario;
        this.contours = contours;
    }
}