// stores/canCommandStore.js
import { defineStore } from 'pinia';
import { CanCommandResponse } from '@/models/responses.js';
import canCommandsApi from '@/services/api/canCommand.js';

export const useCanCommandStore = defineStore('canCommand', {
    state: () => ({
        canCommands: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchCommands(modelId) {
            this.loading = true;
            try {
                const response = await canCommandsApi.getCanCommands(modelId);
                this.canCommands = response.data.map(element => new CanCommandResponse(element));
            } catch (error) {
                console.error('Ошибка при загрузке команд:', error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async deleteCommand(commandId) {
            try {
                await canCommandsApi.deleteModel(commandId);
                this.canCommands = this.canCommands.filter(command => command.id !== commandId);
            } catch (error) {
                console.error('Ошибка при удалении команды:', error);
            }
        },
        async addCommand(commandData) {
            try {
                const response = await canCommandsApi.createModel(commandData);
                const newCommand = new CanCommandResponse(response.data);
                this.canCommands.push(newCommand);
            } catch (error) {
                console.error('Ошибка при добавлении команды:', error);
            }
        },
        async updateCommand(command) {
            try {
                const response = await canCommandsApi.updateModel(command.id, { ...command });
                const updatedCommand = new CanCommandResponse(response.data);
                const index = this.canCommands.findIndex(c => c.id === command.id);
                if (index !== -1) {
                    this.canCommands.splice(index, 1, updatedCommand);
                }
            } catch (error) {
                console.error('Ошибка при обновлении команды:', error);
            }
        },
    },
    getters: {
        filteredCommands: (state) => (searchNameQuery, searchIdQuery) => {
            return state.canCommands.filter(command =>
                command.name.toLowerCase().includes(searchNameQuery.toLowerCase()) &&
                command.command_id.toString().toLowerCase().includes(searchIdQuery.toLowerCase())
            );
        },
    },
});
