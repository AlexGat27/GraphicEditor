// stores/auth.js
import { defineStore } from 'pinia';
import api from '@/services/api/auth';
import { UserResponse } from '@/models/responses';
import { Roles } from '@/models/attributeEnums';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
    }),
    actions: {
        async checkAuth() {
            try {
                const response = await api.checkAuth();
                if (response.data.status === 'authorized') {
                    this.isAuthenticated = true;
                    this.user = new UserResponse(response.data);
                    if (this.user.role === Roles.ADMIN){
                        this.isAdmin = true;
                    }
                } else {
                    this.isAuthenticated = false;
                    this.user = null;
                    this.isAdmin = false;
                }
            } catch (error) {
                this.isAuthenticated = false;
                this.user = null;
                this.isAdmin = false;
            }
        },
        async logout() {
            return api.logout().then(() => {
                this.isAuthenticated = false;
                this.user = null;
                this.isAdmin = false;
            })
        }
    },
});
