<template>
  <div class="actionCase">
    <SelectBlock :blockTitle="title1" :attributes="filterActionAttributes.action" 
    @attribute="updateAttribute('action', $event)" :current="currentAction.action"/>
    <SelectBlock :blockTitle="title3" :attributes="filterActionAttributes.interrupedTime"
    @attribute="updateAttribute('interrupedTime', $event)" :current="currentAction.interrupedTime"/>
    <SelectBlock :blockTitle="title4" :attributes="filterActionAttributes.cyclePeriod"
    @attribute="updateAttribute('cyclePeriod', $event)" :current="currentAction.cyclePeriod"/>
    <InputBlock :blockTitle="title5" @attribute="updateAttribute('power', $event)" :current="currentAction.power"/>
  </div>
</template>
  
<script>
  import SelectBlock from "../blocks/DropdownBlock.vue";
  import InputBlock from "../blocks/InputBlock.vue";

  export default {
    components: {SelectBlock, InputBlock},
    data(){
      return {
        title1: 'Действие',
        title2: 'Тип',
        title3: "Прерывание (ms)",
        title4: "Период цикла (сек)",
        title5: "Мощность контура (%)",
      }
    },
    computed: {
      currentAction(){
        return this.current
      },
      filterActionAttributes(){
        if (this.currentAction.action === "Включить" || this.currentAction.action === ''){
          return {action: this.actionAttributes.action, interrupedTime: [], cyclePeriod: []} 
        }
        return this.actionAttributes;
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
    background-color: var(--background-cases);
  }
</style>