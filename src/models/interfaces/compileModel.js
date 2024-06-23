export class ActionCaseModel {
    constructor(action='', interruption='', workingPeriod='', power='') {
        this.action = action;
        this.interruption = interruption;
        this.workingPeriod = workingPeriod;
        this.power = power;
    }
}

export class ConditionCaseModel {
    constructor(condition='', value='', countSignals='', delay={type: '', value: ''}) {
        this.condition = condition;
        this.value = value;
        this.countSignals = countSignals;
        this.delay = delay
    }
}

export class ContainerModel {
    constructor(actionCases=[new ActionCaseModel()], conditionCases=[new ConditionCaseModel()]) {
        this.actionCases = actionCases;
        this.conditionCases = conditionCases;
    }
}

export class ContourModel {
    constructor(contourID, name, containers=[]) {
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