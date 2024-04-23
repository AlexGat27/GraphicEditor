<template>
    <div class="toolbox">
      <ChangeModel @model="updateModel($event)" id="changeModel"/>
    </div>
</template>

<script>
import ChangeModel from './ChangeModel.vue';

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
.toolbox {
  height: 95%;
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>