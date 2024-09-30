<template>
    <router-view></router-view>
</template>

<script>
import ModelService from "@/services/model-service.js";

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
