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
  <div style="overflow: hidden; width: 100%; height: 100%; position: relative;">
    <div class="editor"><Editor/></div>
  </div>
</template>

<style scoped>
  .editor{
    position: absolute;
    top: 20px;
    left: 20px;
    bottom: 0;
    right: -17px;
    display: flex;
    align-items: start;
    justify-content: start;
    overflow-y: scroll;
  }
  .toolbox{
    width:100%;
    height: 100px;
    padding: 0;
  }
</style>
