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
    };
  },
  props: {
    containerID:{
      type: Number,
      required: true
    },
    events:{
      type: Array,
      required: true
    }
  }
}
</script>