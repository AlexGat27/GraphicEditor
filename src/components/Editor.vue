<template>
  <div class="editorfield">
    <div class="counterItem" v-if="activeContour && activeContour.containers.length > 0">
      <CaseContainer v-for="(container, index) in activeContour.containers" :key="index" :containerID="index"/>
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
  width: calc(100% - 20px);
  height: fit-content;
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

</style>