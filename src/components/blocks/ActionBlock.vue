<template>
    <BaseBlock :containerID="containerID" :blockType="blockType" :attributes="actions"/>
</template>
  
<script>
  import BaseBlock from './BaseBlock.vue';
  
  export default {
    components: {BaseBlock},
    data() {
      return {
        blockType: "Действие",
        actions: ['Включить', 'Выключить'] 
      };
    },
    props: {
      containerID:{
        type: Number,
        required: true
      }
    }
  }
</script>