<template>
  <BaseBlock :containerID="containerID" :blockType="blockType" :attributes="events"/>
</template>

<script>
import BaseBlock from './BaseBlock.vue';

export default {
  components: {BaseBlock},
  data() {
    return {
      blockType: "Событие",
      events: ['Мокрый контакт 1', 'Мокрый контакт 2'] 
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