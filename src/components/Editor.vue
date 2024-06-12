<template>
  <div style="width: 100%; height: 100%;">
    <div class="editorfield">
      <div class="counterItem" v-if="activeContour">
        <div v-for="(container, index) in activeContour.containers" :key="index" class="containerItem">
          <CaseContainer :containerID="index"/>
        </div>
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
  border: 2px dashed #848484; /* Границы области редактирования */
  width: 100%;
  height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.counterItem{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.containerItem{
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  min-height: 150px;
  max-height: 300px;
  width: 100%;
}
.containerButtons{
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: center;
}
.containerButtons button{
  font-size: 30px;
  text-align: center;
  padding: 0px;
  min-width: 50px;
  min-height: 50px;
  margin: 1%;
  border-radius: 50%;
  border: none;
  background-color: rgb(212, 212, 255);
}

.contoursButtons{
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 10%;
  width: 100%;
}
.contoursButtons button, .contoursButtons div{
  margin: 2%;
}
.contoursButtons p{
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn{
  width: 30px;
  height: 30px;
}
.arrow-back::after{
  content: '\2190';
}
.arrow-forward::after{
  content: '\2192';
}

.digitalPin{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 15%;
}
.digitalPin select{
  margin-top: 5%;
  width: 90%;
}
</style>