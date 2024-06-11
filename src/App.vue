<script>
  import { modelAttributes } from './models/objects/modelsAttributes';
  import defaultModel from './models/objects/defaultModel';
  import Toolbox from './components/Toolbox.vue'; // Явный импорт компонента Toolbox
  import Editor from './components/Editor.vue'; 

  export default {
    name: 'App',
    components: {
      Toolbox,
      Editor
    },
    // Предоставление текущей модели в приложении
    provide() {
      return {
        currentModel: defaultModel,
        modelAttributes: modelAttributes,
        activeContourID: 0
      };
    }
  }
</script>

<template>
  <div class="toolbox"><Toolbox/></div>
  <div class="editor"><Editor/></div>
</template>

<style scoped>
  .editor{
    width:95%;
    height: 80%;
    padding: 0;
    margin-top: 1%;
  }
  .toolbox{
    width:100%;
    height: 20%;
    padding: 0;
  }
</style>
