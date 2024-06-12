<script>
  import Toolbox from './components/Toolbox.vue'; // Явный импорт компонента Toolbox
  import Editor from './components/Editor.vue'; 

  export default {
    name: 'App',
    components: {
      Toolbox,
      Editor
    },
  }
</script>

<template>
  <div class="toolbox"><Toolbox/></div>
  <div class="editor"><Editor/></div>
</template>

<style scoped>
  .editor{
    width:calc(100vw - 40px);
    height: calc(100vh - 100px);
    display: flex;
    align-items: end;
    justify-content: center;
    padding: 20px;
  }
  .toolbox{
    width:100%;
    height: 100px;
    padding: 0;
  }
</style>
