<template>
  <div class="actionCase">
    <SelectBlock :blockTitle="title1" :attributes="actionAttributes.action" 
    @attribute="updateAttribute('action', $event)" :current="currentAction.action"/>
    <SelectBlock :blockTitle="title2" :attributes="actionAttributes.actionType" 
    @attribute="updateAttribute('actionType', $event)" :current="currentAction.actionType"/>
    <InputBlock :blockTitle="title3" @attribute="updateAttribute('interrupedTime', $event)" :current="currentAction.interrupedTime" 
    :defaultValue="defaultValue"/>
    <InputBlock :blockTitle="title4" @attribute="updateAttribute('cyclePeriod', $event)" :current="currentAction.cyclePeriod"/>
    <InputBlock :blockTitle="title5" @attribute="updateAttribute('power', $event)" :current="currentAction.power"/>
  </div>
</template>
  
<script>
  import SelectBlock from "./SelectBlock.vue";
  import InputBlock from "./InputBlock.vue";

  export default {
    components: {SelectBlock, InputBlock},
    data(){
      return {
        title1: 'Действие',
        title2: 'Тип',
        title3: "Прерывание (ms)",
        title4: "Период цикла (сек)",
        title5: "Мощность контура (%)",
        title6: "Остановка после завершения",
      }
    },
    computed: {
      currentAction(){
        return this.current
      },
      defaultValue(){
        return this.currentAction.actionType === "Без мерцания" ? 0 : null
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
        if (type == 'power'){
          this.currentAction[type] = event >= 0 && event <= 100 ? event : 0;
          console.log(this.currentAction[type])
          this.$emit("attribute", this.currentAction);
        }else {
          this.currentAction[type] = event;
          this.$emit("attribute", this.currentAction);
        }
      },
    }
  }
</script>

<style scoped>
  .actionCase{
    display: flex;
    align-items: center;
    height: 80%;
    width: 100%;
    background-color: rgb(236, 252, 255);
  }
</style>