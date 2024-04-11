<template>
    <BaseBlock :containerID="containerID" :blockType="blockType" :attributes="params"/>
  </template>
  
  <script>
  import BaseBlock from '../BaseBlock.vue'; 
  
  export default {
    components: {BaseBlock},
    data() {
      return {
        blockType: "Параметры",
        params: ['10%', '25%', '50%', '100%'] 
      };
    },
    props: {
      containerID:{
        type: Number,
        required: true
      },
      // model:{
      //   type: String,
      //   required: true
      // }
    }
  }
  </script>