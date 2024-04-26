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

<style>
  .editor{
    width:83%;
    height: 98%;
    padding: 1%;
  }
  .toolbox{
    width:13%;
    height: 98%;
    padding: 1%;
  }
</style>
