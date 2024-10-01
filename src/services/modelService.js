// services/modelService.js
import {ActionCaseModel, ConditionCaseModel, ContainerModel} from '../models/compileModel.js';
import { useMainStore } from '@/stores/mainStore.js';
import {ActionParams, ActionAttributesType, ConditionAttributesType, ModelAttributesType} from "@/models/attributeEnums.js";

export default class ModelService {
    constructor() {
        this.store = useMainStore();
    }

    getCurrentModel() {
        return this.store.currentModel;
    }

    setCurrentModel(value) {
        this.store.setCurrentModel(value);
    }

    updateModelName(value, index){
        const currentModel = this.getCurrentModel();
        currentModel.contours[index].name = value;
        this.setCurrentModel(currentModel);
    }
    updateActiveContour(value, index){
        const currentModel = this.getCurrentModel();
        currentModel.contours.forEach(contour => {
            contour.selected = false;
        });
        currentModel.contours[index].selected = value;
        this.setCurrentModel(currentModel);
    }

    addCase(containerID, type) {
        const selectedContour = this.getCurrentModel().contours.find(contour => contour.selected);

        if (type === ModelAttributesType.ACTION && selectedContour.containers[containerID].actionCases.length < 1) {
            selectedContour.containers[containerID].actionCases.push(new ActionCaseModel());
        } else if (type === ModelAttributesType.CONDITION && selectedContour.containers[containerID].conditionCases.length < 3) {
            selectedContour.containers[containerID].conditionCases.push(new ConditionCaseModel());
        } else {
            console.error("Превышено количество кейсов");
        }
    }
    removeCase(containerID, caseID, type){
        console.log(this.getCurrentModel())
        const container = this.getCurrentModel().contours.find(contour => contour.selected).containers[containerID];
        if (type === ModelAttributesType.ACTION) {
            container.actionCases.splice(caseID, 1)
        } else if (type === ModelAttributesType.CONDITION) {
            container.conditionCases.splice(caseID, 1);
        } else {
            console.error("Несуществующий тип кейса");
        }
    }

    addContainer(){
        const potentialContour = this.getCurrentModel().contours.find(contour => contour.selected && contour.name !== '');
        if (potentialContour && potentialContour.containers.length < 5) {
            potentialContour.containers.push(new ContainerModel());
        }
        else{ console.error("Превышено допустимое количество контейнеров или не выбран контур"); }
    }
    removeContainer(containerID) {
        const selectedContour = this.getCurrentModel().contours.find(contour => contour.selected);
        selectedContour.containers.splice(containerID, 1);
    }

    updateAction(containerID, caseID, type, value){
        const currentModel = this.getCurrentModel();
        let currentCase = this.getCurrentModel().contours.find(contour => contour.selected).containers[containerID].actionCases[caseID];
        if (type === ActionAttributesType.ACTION){ const currentCase =  new ActionCaseModel()}
        else if (type === ActionAttributesType.WORKING_PERIOD) {
            if ([ActionParams.OFF, ActionParams.EMPTY, ActionParams.TOGGLE].includes(currentCase[ActionAttributesType.ACTION])) {
                this.notificationMessage = "Данное действие не включает параметр периода";
                this.notificationType = 'error';
                value = '';
            }else if (value > 3600 || value < 1) {
                this.notificationMessage = "Значение за пределами диапазона было приведено к ближайшему допустимому";
                this.notificationType = 'error';
                value = value > 3600 ? 3600 : 1;
            }
        }
        currentCase[type] = value.toString();
        currentModel.contours.find(contour => contour.selected).containers[containerID].actionCases[caseID] = currentCase;
        this.setCurrentModel(currentModel);
    }
    updateCondition(containerID, caseID, type, value){
        const currentModel = this.getCurrentModel();
        if (type === ConditionAttributesType.CONDITION){
            currentModel.contours.find(contour => contour.selected).containers[containerID].conditionCases[caseID] = new ConditionCaseModel(value);
        } else {
            currentModel.contours.find(contour => contour.selected).containers[containerID].conditionCases[caseID][type] = value;
        }
        this.setCurrentModel(currentModel);
    }
    setCanCommands(canCommands){
       this.store.setCanCommands(canCommands);
    }
}