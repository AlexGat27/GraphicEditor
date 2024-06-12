<template>
  <div class="editorfield">
    <div class="counterItem" v-if="activeContour">
      <div v-for="(container, index) in activeContour.containers" :key="index" class="containerItem">
        <CaseContainer :containerID="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import CaseContainer from './CaseContainer.vue';
import { useMainStore } from '@/store';
import { FileCreator } from '@/services/fileCreator';

export default {
  components: {
    CaseContainer
  },
  data() {
    return {
      store: null
    };
  },
  created(){
    this.store = useMainStore();
  },
  computed: {
    activeContour(){
      return this.store.currentModel.contours.find(contour => contour.selected);
    },
  }
}
</script>

<style scoped>
.editorfield {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  background-color: var(--background-editorfield);
}
.counterItem{
  margin: 15px;
  width: calc(100% - 30px);
  height: fit-content;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.containerItem{
  overflow: hidden;
  min-height: 150px;
  width: calc(100% - 4px);
  margin-bottom: 30px;
  border-radius: 10px;
  border: 2px solid var(--background-container)
}
</style>