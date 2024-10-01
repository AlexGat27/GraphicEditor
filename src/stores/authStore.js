// stores/auth.js
import { defineStore } from 'pinia';
import { UserResponse } from '@/models/responses';
import { Roles } from '@/models/attributeEnums';
import {authApi} from "@/services/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
    }),
    actions: {
        async checkAuth() {
            try {
                const response = await authApi.checkAuth();
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
            return authApi.logout().then(() => {
                this.isAuthenticated = false;
                this.user = null;
                this.isAdmin = false;
            })
        },
        async login(username, password, recaptchaToken){
            try{
                const response = await authApi.login({
                    username: username,
                    password: password,
                    reCaptcha: recaptchaToken
                })
                console.log("Успешная авторизация", response);
                return false;
            }catch (error){
                console.error("Ошибка авторизации", error);
                return true;
            }
        },
        async register(username, password, recaptchaToken){
            try {
                const response = await authApi.register({
                    username: username,
                    password: password,
                    reCaptcha: recaptchaToken
                });
                console.log(response);
                return {
                    notificationMessage: 'Регистрация прошла успешно! Через 3 секунды будете перенаправлены на страницу логина...',
                    notificationType: 'success',
                    isError: false
                }
            } catch (error) {
                console.error('Ошибка регистрации', error);
                return {
                    notificationMessage: 'Ошибка регистрации. Попробуйте снова...',
                    notificationType: 'error',
                    isError: true
                }
            }
        }

    },
});
