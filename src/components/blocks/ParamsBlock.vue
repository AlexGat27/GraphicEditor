<template>
    <BaseBlock :containerID="containerID" :blockType="blockType" :attributes="params"/>
  </template>
  
  <script>
  import BaseBlock from './BaseBlock.vue'; 
  
  export default {
    components: {BaseBlock},
    data() {
      return {
        blockType: "Параметры",
      };
    },
    props: {
      containerID:{
        type: Number,
        required: true
      },
      params:{
        type: Array,
        required: true
      }
    }
  }
  </script>