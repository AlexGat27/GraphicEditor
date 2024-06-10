<script>
  import Editor from './components/Editor.vue';
  import Toolbox from './components/Toolbox.vue';
  export default {
    components: {
      Toolbox,
      Editor
    },
    data(){
      return {
        model: {},
      }
    },

  }
</script>

<template>
  <div class="toolbox"><Toolbox @model="model = $event"/></div>
  <div class="editor"><Editor :model="model"/></div>
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
