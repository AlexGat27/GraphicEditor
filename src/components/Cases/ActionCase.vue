<template>
  <div class="actionCase">
    <SelectBlock :blockTitle="title1" :attributes="filterActionAttributes.actions" 
    @attribute="updateAttribute('action', $event)" :current="currentAction.action"/>
    <SelectBlock :blockTitle="title3" :attributes="filterActionAttributes.interruptions"
    @attribute="updateAttribute('interruption', $event)" :current="currentAction.interruption"/>
    <SelectBlock :blockTitle="title4" :attributes="filterActionAttributes.workingPeriod.types"
    @attribute="updateAttribute('workingPeriod', $event)" :current="currentAction.workingPeriod"/>
    <SelectBlock :blockTitle="title5" @attribute="updateAttribute('power', $event)" :current="currentAction.power"
    :attributes="filterActionAttributes.powers"/>
    <div class="closeIcon"></div>
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
        title3: "Прерывание",
        title4: "Период работы",
        title5: "Мощность контура",
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
          return {actions: this.actionAttributes.actions, interruptions: [], workingPeriods: [], powers: this.actionAttributes.powers} 
        }
        console.log(this.actionAttributes);
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
    justify-content: space-between;
    height: 60px;
    width: 100%;
    margin: 0;
    background-color: var(--background-cases);
  }

  .closeIcon {
    width: 30px; /* Ширина квадрата */
    height: 30px; /* Высота квадрата */
    background-color: transparent;
    border: 1px solid var(--contour-elements); /* Цвет рамки */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translateY(10px);
    border-radius: 5px;
  }

.closeIcon::before,
.closeIcon::after {
  content: '';
  position: absolute;
  width: 20px; /* Ширина палочек крестика */
  height: 1px; /* Высота палочек крестика */
  background-color: var(--contour-elements); /* Цвет палочек крестика */
}

  .closeIcon::before {
    transform: rotate(45deg); /* Первая палочка крестика */
  }

  .closeIcon::after {
    transform: rotate(-45deg); /* Вторая палочка крестика */
  }
</style>