<template>
  <transition name="fade">
    <div v-if="visible" :class="['notification', type]" @click="hide">
      <span class="message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success' // 'success' или 'error'
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
        this.$emit('hide');
      }, 3000); // Скрытие через 3 секунды
    },
    hide() {
      this.visible = false;
      this.$emit('hide');
    }
  },
  watch: {
    message(newValue) {
      if (newValue) {
        this.show();
      }
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  width: fit-content;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  z-index: 20;
}

.notification.success {
  background-color: #005700;
}

.notification.error {
  background-color: #8d0000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
