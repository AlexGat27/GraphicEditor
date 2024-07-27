<template>
  <div>
    <div class="divider" v-if="caseID > 0"></div>
    <div class="actionCase">
      <SelectBlock :blockTitle="title1" :attributes="mapActions" 
      @attribute="updateAttribute('action', $event)" :current="currentAction.action"/>
      <SelectBlock :blockTitle="title3" :attributes="filterAction.interruptions"
      @attribute="updateAttribute('interruption', $event)" :current="currentAction.interruption"/>
      <SelectBlock :blockTitle="title4" :attributes="filterAction.workingPeriod"
      @attribute="updateAttribute('workingPeriod', $event)" :current="currentAction.workingPeriod"/>
      <SelectBlock :blockTitle="title5" @attribute="updateAttribute('power', $event)" :current="currentAction.power"
      :attributes="modelData.powers"/>
      <!-- <div class="closeIcon" @click="setShowConfirm()"></div> -->
    </div>
    <ConfirmModal :message="'Точно хотите удалить действие?'" :isVisible="showConfirmModal" 
    @confirm="removeCase" @cancel="showConfirmModal = false" />
  </div>
</template>

<script>
import SelectBlock from "../blocks/DropdownBlock.vue";
import ConfirmModal from "../shared/ConfirmModal.vue";
import { useMainStore } from "@/stores/modelStore";
import { ActionParams } from "@/models/attributeEnums";
import { modelData } from "@/models/modelAttributes";

export default {
  components: { SelectBlock, ConfirmModal },
  data() {
    return {
      title1: 'Действие',
      title2: 'Тип',
      title3: "Прерывание",
      title4: "Период работы",
      title5: "Мощность контура",
      store: null,
      showConfirmModal: false
    }
  },
  created() {
    this.store = useMainStore();
  },
  computed: {
    currentModel: {
      get() {
          return this.store.currentModel;
      },
      set(value) {
        this.store.setCurrentModel(value);
      }
    },
    currentAction() {
      return this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases[this.caseID];
    },
    actionAttributes() {
      return modelData.actionAttributes;
    },
    filterAction(){
      return this.actionAttributes.find(act => act.action == this.currentAction.action);
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
      const currentModel = this.currentModel;
      const currentAction = currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases[this.caseID];
      if (type === 'power') {
        currentAction[type] = event >= 0 && event <= 100 ? event : 0;
      } else {
        currentAction[type] = event;
      }
      this.currentModel = currentModel;
    },
    setShowConfirm(){
      const actionCases = this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases;
      if (actionCases.length > 1) {
        this.showConfirmModal = true;
      }
    },
    removeCase() {
      const actionCases = this.currentModel.contours.find(contour => contour.selected).containers[this.containerID].actionCases;
      actionCases.splice(this.caseID, 1);
      this.showConfirmModal = false;
    }
  }
}
</script>

<style scoped>
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
