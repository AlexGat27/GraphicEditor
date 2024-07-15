// stores/auth.js
import { defineStore } from 'pinia';
import api from '@/services/apiInstance';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        async checkAuth() {
            try {
                const response = await api.checkAuth();
                if (response.data.status === 'authorized') {
                    this.isAuthenticated = true;
                    this.user = response.data.user;
                } else {
                    this.isAuthenticated = false;
                    this.user = null;
                }
            } catch (error) {
                this.isAuthenticated = false;
                this.user = null;
            }
        },
        logout() {
            api.logout().then(() => {
                this.isAuthenticated = false;
                this.user = null;
            })
        }
    },
});
