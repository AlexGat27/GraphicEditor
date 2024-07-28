<template>
  <div class="registration-container">
    <h2 class="fira-sans-medium">Регистрация</h2>
    <form @submit.prevent="register" class="registration-form" ref="form">
      <input v-model="username" placeholder="Username" required class="registration-input">
      <input v-model="password" type="password" placeholder="Password" required class="registration-input">
      <button type="submit">Зарегистрироваться</button>
      <span v-if="isError" class="errorMsg fira-sans-regular">Ошибка регистрации</span>
    </form>
    <button @click="goToRedactor">Вернуться в редактор</button>

    <!-- Success Modal -->
    <div v-if="isSuccess" class="modal-overlay">
      <div class="modal-content">
        <h3>Регистрация успешна!</h3>
        <p>Через 5 секунд вы будете перенаправлены на страницу логина.</p>
        <button @click="closeModal">ОК</button>
      </div>
    </div>
  </div>
</template>

  
<script>
import { authApi } from '@/services/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      isError: false,
      isSuccess: false  // Flag to control the modal visibility
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
        console.log('Регистрация успешна', response.data);
        this.isSuccess = true;  // Show the success modal
        setTimeout(() => {
          this.$router.push('/login');  // Redirect after a short delay to show the modal
        }, 5000);  // Adjust delay as needed
      } catch (error) {
        this.isError = true;
        console.error('Ошибка регистрации', error.response.data);
      }
    },
    closeModal() {
      this.isSuccess = false;
      this.$router.push('/login');  // Redirect to login page
    },
    goToRedactor() {
      this.$router.push('/');
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
