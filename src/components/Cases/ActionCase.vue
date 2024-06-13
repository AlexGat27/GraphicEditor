<template>
  <div class="actionCase">
    <SelectBlock :blockTitle="title1" :attributes="filterActionAttributes.action" 
    @attribute="updateAttribute('action', $event)" :current="currentAction.action"/>
    <SelectBlock :blockTitle="title3" :attributes="filterActionAttributes.interruption"
    @attribute="updateAttribute('interruption', $event)" :current="currentAction.interruption"/>
    <SelectBlock :blockTitle="title4" :attributes="filterActionAttributes.workingPeriod"
    @attribute="updateAttribute('workingPeriod', $event)" :current="currentAction.workingPeriod"/>
    <SelectBlock :blockTitle="title5" @attribute="updateAttribute('power', $event)" :current="currentAction.power"
    :attributes="filterActionAttributes.power"/>
  </div>
</template>
  
<script>
  import SelectBlock from "../blocks/DropdownBlock.vue";
  import InputBlock from "../blocks/InputBlock.vue";
  import { useMainStore } from "@/store";

  export default {
    components: {SelectBlock, InputBlock},
    data(){
      return {
        title1: 'Действие',
        title2: 'Тип',
        title3: "Прерывание (ms)",
        title4: "Период цикла (сек)",
        title5: "Мощность контура (%)",
        store: null
      }
    },
    created(){ this.store = useMainStore(); },
    computed: {
      currentModel: {
        get(){
            return this.store.currentModel;
        },
        set(value){
            this.store.setCurrentModel(value);
        }
      },
      currentAction(){
        return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases[this.caseID];
      },
      actionAttributes(){
        return this.store.modelAttributes[0].actionAttributes;
      },
      filterActionAttributes(){
        if (this.currentAction.action === "Включить" || this.currentAction.action === ''){
          return {action: this.actionAttributes.action, interruption: [], workingPeriod: [], power: this.actionAttributes.power} 
        }
        return this.actionAttributes;
      }
    },
    props: {
      caseID:{
        type: Number,
        required: true
      },
      containerID:{
        type: Number,
        required: true
      }
    },
    methods: {
      updateAttribute(type, event){
        const currentModel = this.currentModel;
        const currentAction = currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases[this.caseID];
        if (type == 'power'){
          currentAction[type] = event >= 0 && event <= 100 ? event : 0;
        }else {
          currentAction[type] = event;
        }
        this.currentModel = currentModel;
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