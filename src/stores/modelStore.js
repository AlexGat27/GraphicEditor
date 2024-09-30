// stores/modelStore.js
import { defineStore } from 'pinia';
import { ModelResponse } from '@/models/responses.js';
import { modelApi } from '@/services/api/index.js';

export const useModelStore = defineStore('model', {
    state: () => ({
        models: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchModels(brandId) {
            this.loading = true;
            try {
                const response = await modelApi.getBrandModels(brandId);
                this.models = response.data.map((element) => new ModelResponse(element));
            } catch (error) {
                console.error('Ошибка при загрузке моделей:', error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addModel(value) {
            try {
                const response = await modelApi.createModel(value);
                const newModel = new ModelResponse(response.data.model);
                this.models.push(newModel);
            } catch (error) {
                console.error('Ошибка при добавлении модели:', error);
            }
        },
        async updateModel(model) {
            try {
                const response = await modelApi.updateModel(model.id, { brand_id: model.brand_id, name: model.name });
                const updatedModel = new ModelResponse(response.data.model);
                const index = this.models.findIndex((m) => m.id === model.id);
                if (index !== -1) {
                    this.models.splice(index, 1, updatedModel);
                }
            } catch (error) {
                console.error('Ошибка при обновлении модели:', error);
            }
        },
        async deleteModel(modelId) {
            try {
                await modelApi.deleteModel(modelId);
                this.models = this.models.filter((model) => model.id !== modelId);
            } catch (error) {
                console.error('Ошибка при удалении модели:', error);
            }
        },
    },
    getters: {
        filteredModels: (state) => (searchQuery) => {
            return state.models.filter((model) => model.name.toLowerCase().includes(searchQuery.toLowerCase()));
        },
    },
});
