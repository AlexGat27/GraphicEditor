import { ActionAttribute, ConditionAttribute, ModelAttributes } from "./modelAttributes";

export class ScenarioResponse{
    constructor(data){
        this.id = data.id;
        this.model_attributes = data.model_attributes;
        this.jsonData = data.jsonData;
        this.name = data.name;
        this.user_id = data.user_id;
        this.model_id = data.model_id;
    }
}

export class UserResponse{
    constructor(data){
        this.id = data.id;
        this.username = data.username;
        this.editingRole = false;
        this.role = data.roles[0];
        this.created_at = data.created_at;
    }
}

export class ModelResponse{
    constructor(response){
        this.id = response.id;
        this.name = response.name;
        const conditionAttributes = [];
        response.data.conditionAttributes.forEach(element => {
            conditionAttributes.push(new ConditionAttribute(
                element.condition,
                element.values,
                element.countSignals,
                element.delayTypes
            ))
        });
        this.data = new ModelAttributes(
            response.data.scenario,
            conditionAttributes,
            new ActionAttribute(
                response.data.actionAttributes.actions,
                response.data.actionAttributes.interruptions,
                response.data.actionAttributes.workingPeriod,
                response.data.actionAttributes.powers
            )
        );
        this.brand_id = response.brand_id;
    }
}

export class BrandResponse{
    constructor(response){
        this.id = response.id;
        this.name = response.name
    }
}