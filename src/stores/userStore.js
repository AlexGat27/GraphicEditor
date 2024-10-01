// stores/userStore.js
import { defineStore } from 'pinia';
import api from '@/services/api/user.js';
import { UserResponse } from '@/models/responses.js';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [],
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await api.getUsers();
                this.users = response.data.users.map(user => new UserResponse(user));
                console.log(this.users);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error);
            }
        },
        async assignRoleUser(userId, roleName) {
            try {
                await api.assignRoleUser(userId, { roleName });
            } catch (error) {
                console.error('Ошибка при назначении роли пользователю:', error);
            }
        },
        editRole(user) {
            this.users.forEach(user => {
                user.editingRole = false;
            });
            user.editingRole = true;
        },
        async deleteUser(userId) {
            try {
                await api.deleteUser(userId);
                this.users = this.users.filter(user => user.id !== userId);
            } catch (error) {
                console.error('Ошибка при удалении пользователя:', error);
            }
        },
        async blockUser(userId) {
            await this.assignRoleUser(userId, 'banned');
            const userToBlock = this.users.find(user => user.id === userId);
            if (userToBlock) {
                userToBlock.role = 'banned';
            }
        },
        async unBlockUser(userId) {
            await this.assignRoleUser(userId, 'user');
            const userToUnblock = this.users.find(user => user.id === userId);
            if (userToUnblock) {
                userToUnblock.role = 'user';
            }
        },
    },
});
