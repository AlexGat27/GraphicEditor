<template>
  <BaseBlock :containerID="containerID" :blockType="blockType" :attributes="conditions"/>
</template>

<script>
import BaseBlock from './BaseBlock.vue';

export default {
  components: {BaseBlock},
  data() {
    return {
      blockType: "Условие",
      conditions: ['День', 'Ночь', 'Ближний свет', '12В', "Нет питания"] 
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
  