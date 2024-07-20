// stores/auth.js
import { defineStore } from 'pinia';
import api from '@/services/api/auth';

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
                    this.user = response.data.user;
                    if (response.data.roles[0] === "admin"){
                        console.log(response.data)
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
        logout() {
            api.logout().then(() => {
                this.isAuthenticated = false;
                this.user = null;
                this.isAdmin = false;
            })
        }
    },
});
