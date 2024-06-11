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
      <button style="background-color: white; color: black; margin-left: auto;">SaveScenario</button>
    </div>
</template>

<script>
import ContourBar from './bars/'

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
  color: var(--blocks-contours);
}
.titleBar{
  background-color: var(--background-toolbox-titlebar);
  color: yellow;
}
h3{
  margin: 0;
}

.contourBar button{
  height: 90%;
  width: 100px;
  margin: 0;
  margin-left: 1%;
  font-size: 12px;
  color: var(--blocks-contours);
  background-color: var(--background-toolbox-contourbar);
  border: 1px solid var(--blocks-contours);
  border-radius: 5px;
}


.dashes3, .dots3{
  color: yellow;
}
.dashes3::after{
  content: '\2014\2014\2014';
}
.dots3::after{
  content: '\2026';
}
</style>