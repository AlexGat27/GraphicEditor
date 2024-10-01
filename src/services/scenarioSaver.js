// services/ScenarioSaver.js
import {ActionParams} from "@/models/attributeEnums.js";
import {scenarioApi} from "@/services/api/index.js";
import { useMainStore } from '@/stores/mainStore.js';
import {useScenarioStore} from "@/stores/scenarioStore.js";

export default class ScenarioSaver {
    constructor() {
        this.store = useMainStore();
        this.scenarioStore = useScenarioStore();
        this.notificationMessage = '';
        this.notificationType = '';
    }

    async saveScenario() {
        let isNullValues = false;
        const compileModel = this.store.getFormattedCurrentModel();
        compileModel.countContainers = 0;

        compileModel.contours.forEach(contour => {
            contour.containers.forEach(container => {
                container.conditionCases.forEach(attr => {
                    if (attr.condition === '' || attr.value === '' || attr.countSignals === '' ||
                        attr.delay.type === '' || attr.delay.value === '') {
                        isNullValues = true;
                        return;
                    }
                })
                container.actionCases.forEach(attr => {
                    if (attr.action === ActionParams.EMPTY || attr.power === '' ||
                        (attr.action === ActionParams.BLINK && (attr.interruption === '' || attr.workingPeriod === ''))) {
                        isNullValues = true;
                        return;
                    }
                })
                if (isNullValues) return;
            });
            compileModel.countContainers += contour.containers.length;
            if (isNullValues) return;
        });

        if (isNullValues) {
            this.notificationMessage = 'Не все поля заполнены';
            this.notificationType = 'error';
            return { status: 'error', message: this.notificationMessage };
        }

        const requestData = { jsonData: compileModel };
        const response = await scenarioApi.updateScenario(compileModel.scenario_id, requestData);

        if (response.status === 200) {
            this.notificationMessage = 'Успешное сохранение сценария';
            this.notificationType = 'success';
            return { status: 'success', message: this.notificationMessage };
        } else {
            this.notificationMessage = 'Произошла непредвиденная ошибка при сохранении сценария';
            this.notificationType = 'error';
            return { status: 'error', message: this.notificationMessage };
        }
    }

    async downloadScenarioTXT() {
        try {
            const response = await scenarioApi.downloadScenario(this.scenarioStore.selectedScenarioId);
            if (response.data.status === "error") {
                this.notificationMessage = 'Ошибка выгрузки. Сценарий не сохранен';
                this.notificationType = 'error';
                return { status: 'error', message: this.notificationMessage };
            }

            const hexData = response.data["hexData"];
            const blob = new Blob([hexData], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'scenario.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            this.notificationMessage = 'Успешная выгрузка сценария';
            this.notificationType = 'success';
            return { status: 'success', message: this.notificationMessage };
        } catch (error) {
            this.notificationMessage = 'Возникла ошибка при выгрузке сценария';
            this.notificationType = 'error';
            return { status: 'error', message: this.notificationMessage };
        }
    }
}