<template>
    <Block :id="id">
      <p>Условие {{ numberTriggerBlock }}</p>
      <input class="input" v-model="containerIdsString" @blur="updateConnection" placeholder="Action ID"/>
      <button @click="toggleCondition()">Выполнить</button>
    </Block>
  </template>
  
  <script>
  import Block from '../Block.vue';
  
  export default {
    components: {Block},
    props:{
      id: Number
    },
    data(){
      return {
        conditional: false,
        containerIDs: [],
        containerIdsString: ""
      }
    },
    computed: {
      numberTriggerBlock(){
        return this.id > -1 ? this.id : null; 
      }
    },
    methods: {
      toggleCondition() {
        this.conditional = !this.conditional;
        if (this.conditional) console.log(`Условие ${this.id} выполнено`);
        this.$emit('toggleCondition', this.conditional);
      },
      updateConnection() {
        this.containerIds = this.containerIdsString.split(" ")
        .map(numStr => parseInt(numStr.trim()))
        .filter(num => !isNaN(num));
        this.$emit('updateConnection', this.containerIds);
      }
    }
  }
  </script>
  
  <style>
  .conditional-block {
    .input{
      margin-top: 10%;
      margin-bottom: 10%;
    }
  }
  </style>
  