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
    width:85%;
    height: 95%;
  }
  .toolbox{
    width:14%;
    height: 95%;
  }
</style>
