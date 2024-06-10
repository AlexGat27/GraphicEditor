<template>
    <div class="titleBar">
      <h3>MotoCan</h3>
      <!-- <ChangeModel @model="updateModel($event)" id="changeModel"/> -->
    </div>
    <div class="contourBar">
      <h3>Контуры</h3>
      <button>Фара левая</button>
      <button>Фара правая</button>
      <button>Желтый левый</button>
      <button>Желтый правый</button>
      <button>Гудок</button>
      <button>Подогрев сидения</button>
    </div>
</template>

<script>
import ChangeModel from './blocks/ChangeModelBlock.vue';

export default {
  components: {
    ChangeModel
  },
  data(){
    return {
      model: {}
    }
  },
  methods: {
    updateModel(event){
      this.model = event;
      this.$emit("model", this.model);
    }
  }
}
</script>

<style scoped>
.titleBar, .contourBar{
  height: 50%;
  width: 80%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: start;
}
.contourBar{
  background-color: var(--background-toolbox-contourbar);
}
.titleBar{
  background-color: var(--background-toolbox-titlebar);
}
h3{
  margin: 0;
}

.contourBar button{
  height: 90%;
  width: 150px;
  margin: 0;
  margin-left: 1%;
  font-family: ;
  color: var(--blocks-contours);
  background-color: var(--background-toolbox-contourbar);
  border: 1px solid var(--blocks-contours);
  border-radius: 5px;
}
</style>