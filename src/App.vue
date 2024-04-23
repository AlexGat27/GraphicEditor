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
  <Toolbox @model="model = $event"/>
  <div class="editor"><Editor :model="model"/></div>
</template>

<style>
  .editor{
    width:85%;
    height: 95%;
  }
</style>
