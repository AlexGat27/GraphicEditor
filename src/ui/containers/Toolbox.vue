<template>
    <div class="bar"><ScenarioBar/></div>
    <div class="bar"><ContourBar/></div>
</template>

<script>
import ContourBar from '@/ui/containers/bars/ContourBar.vue';
import ScenarioBar from '@/ui/containers/bars/ScenarioBar.vue';

export default {
  components: {
    ContourBar,
    ScenarioBar,
  }
}
</script>

<style scoped>
.bar{
  height: 50%;
  width: 100%;
  overflow-x: auto;
}
.bar::-webkit-scrollbar{
  display: none;
}
</style>