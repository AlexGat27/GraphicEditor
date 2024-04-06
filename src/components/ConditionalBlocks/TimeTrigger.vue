<template>
    <Block>
      <p>Условие</p>
      <button @click="toggleCondition()">Выполнить</button>
    </Block>
  </template>
  
  <script>
  import Block from '../Block.vue';
  
  export default {
    components: {Block},
    data(){
      return {
        conditional: false
      }
    },
    methods: {
      toggleCondition() {
        this.conditional = !this.conditional;
        this.$emit('toggleCondition', this.conditional);
      }
    }
  }
  </script>
  
  <style>
  .conditional-block {
    /* Специфичные стили для блока условия */
  }
  </style>
  