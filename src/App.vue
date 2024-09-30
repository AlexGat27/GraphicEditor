<template>
    <router-view></router-view>
</template>

<script>
import ModelService from "@/services/modelService.js";

export default {
  name: 'App',
  provide() {
    return {
      modelService: ModelService
    };
  },
}
</script>

<style scoped>
  
</style>
