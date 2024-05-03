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
  .block{
    min-width: 150px;
    height: 60%;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding: 10px;
    margin: 5px;
    background-color: white;
  }
  p{
    margin:0;
    text-align: center;
  }
</style>