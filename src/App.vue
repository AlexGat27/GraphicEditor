<script>
  import Editor from './components/Editor.vue';
  import Toolbox from './components/Toolbox.vue';
  export default {
    components: {
      // Регистрируем компоненты
      Toolbox,
      Editor
    }
  }
</script>

<template>
  <div class="appview">
    <Toolbox />
    <Editor />
  </div>
</template>

<style>
  .appview{
    width: 90%;
    height: 90%;
    display: flex;
  }
</style>
