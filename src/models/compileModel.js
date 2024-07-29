export class ActionCaseModel {
    constructor(action='', interruption='', workingPeriod='', power='') {
        this.action = action;
        this.interruption = interruption;
        this.workingPeriod = workingPeriod;
        this.power = power;
    }
    getFormatObject(){
        return new ActionCaseModel(
            this.action,
            this.interruption.replace(/ms|\s/g, ''),
            this.workingPeriod.replace(/ms|sec|\s/g, ''),
            this.power.replace(/%/g, '')
        )
    }
}

export class ConditionCaseModel {
    constructor(condition='', value='', countSignals='', delay={type: '', value: ''}) {
        this.condition = condition;
        this.value = value;
        this.countSignals = countSignals;
        this.delay = delay
    }
    getFormatObject(){
        return this;
    }
}

export class ContainerModel {
    constructor(actionCases=[new ActionCaseModel()], conditionCases=[new ConditionCaseModel()]) {
        this.actionCases = actionCases;
        this.conditionCases = conditionCases;
    }
    getFormatObject(){
        const actionCases = []
        this.actionCases.forEach(actionCase =>{
            actionCases.push(actionCase.getFormatObject())
        })
        const conditionCases = [];
        this.conditionCases.forEach(conditionCase => {
            conditionCases.push(conditionCase.getFormatObject())
        })
        return new ContainerModel(actionCases, conditionCases)
    }
}

export class ContourModel {
    constructor(contourID, name, selected=false, containers=[]) {
        this.contourID = contourID;
        this.name = name;
        this.selected = selected;
        this.containers = containers;
    }
    getFormatObject(){
        const containers = [];
        this.containers.forEach(container => {
            containers.push(container.getFormatObject())
        });
        return new ContourModel(this.contourID, this.name, this.selected, containers)
    }
}

export class CompileModel {
    constructor(id, scenario, contours=null) {
        this.scenario_id = id;
        this.scenario = scenario;
        if (contours === null){
            this.contours = [];
            for (let i = 1; i <= 8; i++) {
                const contour = new ContourModel(i, `Контур ${i}`);
                this.contours.push(contour);
            }
        }
        else this.contours = contours;
    }
    getFormatObject(){
        const contours = [];
        this.contours.forEach(contour => {
            contours.push(contour.getFormatObject())
        });
        return new CompileModel(this.scenario_id, this.scenario, contours)
    }
}