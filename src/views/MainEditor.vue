<script>
  import Toolbox from '@/components/Toolbox.vue';
  import Editor from '@/components/Editor.vue';

  export default {
    name: 'MainEditor',
    components: {
      Toolbox,
      Editor
    },
  }
</script>

<template>
  <div class="toolbox"><Toolbox/></div>
  <div class="editor-scroller">
    <div class="editor"><Editor/></div>
  </div>
</template>

<style scoped>
  .editor{
    position: absolute;
    top: 20px;
    left: 20px;
    bottom: 0;
    right: 20px;
    display: flex;
    align-items: start;
    justify-content: start;
    min-width: 1536px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .editor::-webkit-scrollbar {
    display: none; /* Для Chrome, Safari и других браузеров WebKit */
  }
  .editor-scroller{
    overflow: hidden; width: 100%; height: 100%; position: relative; overflow-x: auto;
  }
  .editor-scroller::-webkit-scrollbar{
    display: none;
  }

  .toolbox{
    width:100%;
    height: 100px;
    padding: 0;
  }
</style>
