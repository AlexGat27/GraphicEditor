
export class ScenarioResponse{
    constructor(data){
        this.id = data.id;
        this.jsonData = data.jsonData;
        this.name = data.name;
        this.user_id = data.user_id;
        this.model = {
            id: data.model.id,
            name: data.model.name,
            canCommands: data.model.canCommands
        }
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
        this.canComands = response.canComands;
        this.brand_id = response.brand_id;
    }
}

export class BrandResponse{
    constructor(response){
        this.id = response.id;
        this.name = response.name
    }
}

export class CanCommandResponse{
    constructor(response){
        this.id = response.id;
        this.name = response.name;
        this.command_id = response.command_id;
        this.model_id = response.model_id;
        this.byte_1 = response.byte_1;
        this.byte_2 = response.byte_2;
        this.byte_3 = response.byte_3;
        this.byte_4 = response.byte_4;
        this.byte_5 = response.byte_5;
        this.byte_6 = response.byte_6;
        this.byte_7 = response.byte_7;
        this.byte_8 = response.byte_8;
    }
}