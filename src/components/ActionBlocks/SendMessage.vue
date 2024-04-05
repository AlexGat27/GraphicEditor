<template>
    <Block>
      <p>Отправка сообщения</p>
      <div v-if="condition">{{ sendMessage() }}</div>
    </Block>
  </template>
  
<script>
  import Block from '../Block.vue';
  
  export default {
    components: {Block},
    props: {
      condition: Boolean
    },
    data(){
      return {
        message: "default message",
      }
    },
    methods: {
      sendMessage(){
        console.log(this.message);
      }
    }
  }
</script>
  
<style>
  .action-block {

}
</style>
  