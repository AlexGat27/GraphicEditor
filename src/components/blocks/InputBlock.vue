<template>
  <div class="block">
    <label>{{ blockTitle }}</label>
    <input type="number" @change="updateCurrentAttribute()" v-model="reactiveCurrent">
  </div>
</template>

<script>
export default {
  props: {
    blockTitle: {
      type: String,
      required: true
    },
    current: {
      type: Number,
      required: true,
    },
    defaultValue: {
      required: false
    }
  },
  data(){
    return {
      reactiveCurrent: this.current // Создаем реактивное свойство на основе пропса
    }
  },
  methods:{
    async updateCurrentAttribute() {
      if (this.defaultValue !== null && this.defaultValue !== undefined){
        await this.$emit('attribute', this.defaultValue);
        this.reactiveCurrent = this.defaultValue;
      }
      else {
        let intValue = parseInt(this.reactiveCurrent);
        await this.$emit('attribute', intValue >= 0 && !isNaN(intValue) ? intValue : 0);
        this.reactiveCurrent = this.current;
      }
    }
  }
}
</script>

<style scoped>
  .block input{
      border: 1px solid var(--blocks-contours);
      border-radius: 10px;
      cursor: pointer;
      background-color: none;
      color: var(--blocks-contours);
    }
    .block{
      width: 80%;
      height: 50px;
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      background-color: none;
    }
  label{
    margin-bottom:5%;
    color: var(--blocks-contours);
  }
</style>