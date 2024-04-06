<template>
    <Block :id="id">
      <p>Отправка сообщения {{ numberMessageBlock }}</p>
      <div v-if="condition">{{ sendMessage() }}</div>
    </Block>
  </template>
  
<script>
  import Block from '../Block.vue';
  
  export default {
    components: {Block},
    props: {
      condition: Boolean,
      id: Number
    },
    data(){
      return {
        message: "Сообщение отправлено",
      }
    },
    computed: {
      numberMessageBlock(){
        return this.id > -1 ? this.id : null; 
      }
    },
    methods: {
      sendMessage(){
        console.log(`${this.message} из блока ${this.id}`);
      }
    }
  }
</script>
  
<style>
  .action-block {

}
</style>
  