// stores/auth.js
import { defineStore } from 'pinia';
import api from '@/services/api/auth';

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
        async checkAdmin(){
            try {
                const response = await api.checkAdmin();
                if (response.data.status === 'permitted') {
                    this.isAuthenticated = true;
                    this.user = response.data.user;
                    console.log('permitted')
                    return false; 
                }
                console.log('allow')
                this.isAuthenticated = true;
                this.user = response.data.user;
                return true; 
            } catch (error) {
                return false;
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
