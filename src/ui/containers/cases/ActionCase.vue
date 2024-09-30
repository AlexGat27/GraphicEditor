<template>
  <div>
    <div class="divider" v-if="caseID > 0"></div>
    <div class="actionCase">
      <SelectBlock :blockTitle="title1" :attributes="mapActions" 
      @attribute="updateAttribute('action', $event)" :current="currentAction.action"/>
      <SelectBlock :blockTitle="title3" :attributes="filterAction.interruptions" :unit="' ms'"
      @attribute="updateAttribute('interruption', $event)" :current="currentAction.interruption"/>
      <div class="block">
        <label for="workingPeriodInput">{{title4}}</label>
        <input type="number" id="workingPeriodInput" :value="currentAction.workingPeriod"
               @blur="updateAttribute('workingPeriod', $event.target.value)">
      </div>
      <!-- <SelectBlock :blockTitle="title4" :attributes="filterAction.workingPeriod" :unit="workingPeriodUnit"
      @attribute="updateAttribute('workingPeriod', $event)" :current="currentAction.workingPeriod"/> -->
      <SelectBlock :blockTitle="title5" @attribute="updateAttribute('power', $event)" :current="currentAction.power"
      :attributes="modelData.powers" :unit="'%'"/>
    </div>
    <Notification :message="notificationMessage" :type="notificationType" @hide="hideNotification"/>
  </div>
</template>

<script>
import SelectBlock from "../../components/blocks/DropdownBlock.vue";
import ConfirmModal from "../../components/alerts/ConfirmModal.vue";
import { modelData } from "@/models/modelAttributes.js";
import Notification from "@/ui/components/alerts/Notification.vue";

export default {
  components: {Notification, SelectBlock, ConfirmModal },
  data() {
    return {
      title1: 'Действие',
      title2: 'Тип',
      title3: "Прерывание",
      title4: "Период работы (sec)",
      title5: "Мощность контура",
      showConfirmModal: false,
      modelData: null,
      notificationMessage: '',
      notificationType: ''
    }
  },
  created() {
    this.modelData = modelData;
  },
  computed: {
    currentAction() {
      return this.$modelService.getCurrentModel().contours.find(contour => contour.selected).containers[this.containerID].actionCases[this.caseID];
    },
    actionAttributes() {
      return modelData.actionAttributes;
    },
    filterAction(){
      return this.actionAttributes.find(act => act.action === this.currentAction.action);
    },
    mapActions(){
      return this.actionAttributes.map(act => act.action);
    },
  },
  props: {
    caseID: {
      type: Number,
      required: true
    },
    containerID: {
      type: Number,
      required: true
    }
  },
  methods: {
    updateAttribute(type, event) {
      this.$modelService.updateAction(this.containerID, this.caseID, type, event);
    },
    hideNotification(){
      this.notificationMessage = '';
      this.notificationType = '';
    }
  }
}
</script>

<style scoped>
.block {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
label {
  margin: 0;
  font-size: 10px;
}
input{
  border: 1px solid var(--contour-elements);
  height: 28.4px;
  padding: 0 10px 0 10px;
  margin: 0 0 1px 0;
  width: 75px;
  border-radius: 5px;
  background-color: inherit;
  color: var(--contour-elements);
  text-align: center;
}
.block input::-webkit-outer-spin-button,
.block input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.divider {
  height: 0.5px; /* Высота разделителя */
  background-color: var(--contour-elements); /* Цвет разделителя */
  margin-top: 20px; /* Отступ сверху для разделителя */
  margin-bottom: 10px;
}

.actionCase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47px;
  width: 100%;
  margin: 0;
  background-color: var(--background-cases);
}

.closeIcon {
  width: 28.4px; /* Ширина квадрата */
  height: 28.4px; /* Высота квадрата */
  background-color: transparent;
  border: 1px solid var(--contour-elements); /* Цвет рамки */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translateY(7px);
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
