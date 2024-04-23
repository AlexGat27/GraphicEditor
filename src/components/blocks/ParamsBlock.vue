<template>
  <div class="case">
    <InputBlock :blockTitle="title1" @attribute="updateConditionParams('interrupedTime', $event)" :current="currentParam.interrupedTime"/>
    <InputBlock :blockTitle="title2" @attribute="updateConditionParams('cyclePeriod', $event)" :current="currentParam.cyclePeriod"/>
    <InputBlock :blockTitle="title3" @attribute="updateConditionParams('power', $event)" :current="currentParam.power"/>
    <SelectBlock :blockTitle="title4" :attributes="actionsAfterCycle" 
    @attribute="updateConditionParams('actionAfterCycle', $event)" 
    :current="currentParam.actionAfterCycle"/>
  </div>
</template>
  
  <script>
import InputBlock from './InputBlock.vue';
import SelectBlock from './SelectBlock.vue';

  export default {
    components: {InputBlock, SelectBlock},
    props:{
      current: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        title1: "Прерывание (ms)",
        title2: "Период цикла (сек)",
        title3: "Мощность контура (%)",
        title4: "Остановка после завершения",
        actionsAfterCycle: ["Ничего", "Зациклить", "Отключить", "Не отключать контур"],
      };
    },
    computed: {
      currentParam(){
        return this.current
      }
    },
    methods: {
      updateConditionParams(type, event){
        if (type == 'power'){
          this.currentParam[type] = event >= 0 && event <= 100 ? event : 0;
        }else {this.currentParam[type] = event;}
        this.$emit("attribute", this.currentParam);
      }
    }
  }
  </script>

<style scoped>
  .case{
    display: flex;
    align-items: center;
    border-left: 2px dashed rgb(52, 52, 52);
    background-color: rgb(253, 255, 240);
  }
</style>