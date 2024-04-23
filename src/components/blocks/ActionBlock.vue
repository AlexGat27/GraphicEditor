<template>
  <div class="case">
    <SelectBlock :blockTitle="title1" :attributes="actionAttributes.action" 
    @attribute="updateAttribute('action', $event)" :current="current.action"/>
    <SelectBlock :blockTitle="title2" :attributes="actionAttributes.actionType" 
    @attribute="updateAttribute('actionType', $event)" :current="current.actionType"/>
  </div>
</template>
  
<script>
  import SelectBlock from "./SelectBlock.vue";

  export default {
    components: {SelectBlock},
    data(){
      return {
        title1: 'Действие',
        title2: 'Тип',
      }
    },
    computed: {
      currentAction(){
      return this.current
    }
    },
    props: {
      actionAttributes:{
        type: Object,
        required: true
      },
      current: {
        type: Object,
        required: true,
      }
    },
    methods: {
      updateAttribute(type, event){
        this.currentAction[type] = event;
        this.$emit("attribute", this.currentAction);
      }
    }
  }
</script>

<style scoped>
  .case{
    display: flex;
    align-items: center;
    background-color: rgb(236, 252, 255);
  }
</style>