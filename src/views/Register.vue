<template>
  <div class="registration-container">
    <h2 class="fira-sans-medium">Регистрация</h2>
    <form @submit.prevent="register" class="registration-form" ref="form">
      <input v-model="username" placeholder="Username" required class="registration-input">
      <input v-model="password" type="password" placeholder="Password" required class="registration-input">
      <button type="submit">Зарегистрироваться</button>
      <span v-if="isError" class="errorMsg fira-sans-regular">Ошибка регистрации</span>
    </form>
    <button @click="goToLogin">Вход</button>
    <Notification :message="notificationMessage" :type="notificationType" @hide="hideNotification"/>
  </div>
</template>

  
<script>
import { authApi } from '@/services/api';
import Notification from "@/components/shared/Notification.vue";

export default {
  components: {Notification},
  data() {
    return {
      username: '',
      password: '',
      isError: false,
      notificationMessage: '',
      notificationType: '' // 'success' или 'error'
    };
  },
  methods: {
    async register() {
      try {
        await this.$recaptchaLoaded();
        const recaptchaToken = await this.$recaptcha('register');
        const response = await authApi.register({
          username: this.username,
          password: this.password,
          reCaptcha: recaptchaToken
        });
        // Устанавливаем уведомление об успешной регистрации
        this.notificationMessage = 'Регистрация прошла успешно! Через 3 секунды будете перенаправлены на страницу логина...';
        this.notificationType = 'success';
        setTimeout(() => {
          this.$router.push('/login');  // Redirect after a short delay to show the modal
        }, 3000);  // Adjust delay as needed
      } catch (error) {
        this.notificationMessage = 'Ошибка регистрации. Попробуйте снова...';
        this.notificationType = 'error';
        this.isError = true;
        console.error('Ошибка регистрации', error.response.data);
      }
    },
    hideNotification(){
      this.notificationMessage = '';
      this.notificationType = '';
    },
    goToLogin() {
      this.$router.push({name: 'Login'});
    },
  }
};
</script>

  
<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.registration-form {
  width: 300px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.registration-input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;
}

button {
  width: 340px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  color: var(--background-editorfield);
  cursor: pointer;
  font-size: 16px;
  font-family: "Fira Sans", sans-serif;
  margin-top: 15px;
}

.registration-form button {
  width: 100%;
  padding: 10px;
  background-color: var(--background-editorfield);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Fira Sans", sans-serif;
  margin-bottom: 5px;
}

.registration-form button:hover {
  background-color: var(--selected-block);
}

h2 {
  text-align: center;
  color: white;
  margin-bottom: 20px;
}

.errorMsg {
  color: red;
  font-size: 12px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-content h3 {
  margin: 0;
}

.modal-content button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: var(--background-editorfield);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: var(--selected-block);
}

@media(max-width: 420px) {
  .registration-form {
    width: 75%;
  }
  button {
    width: 90%;
  }
}
</style>
