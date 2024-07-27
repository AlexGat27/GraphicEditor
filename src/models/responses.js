
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