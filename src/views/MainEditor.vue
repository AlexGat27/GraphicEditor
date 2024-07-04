<script>
  import Toolbox from '@/components/Toolbox.vue';
  import Editor from '@/components/Editor.vue';
import { useAuthStore } from '@/stores/authStore';

  export default {
    name: 'MainEditor',
    created(){
      this.authStore = useAuthStore();
    },
    computed: {
      isAuthenticated(){
        return this.authStore.isAuthenticated;
      }
    },
    components: {
      Toolbox,
      Editor
    },
  }
</script>

<template>
  <div style="width:100%; height: 100%;">
    <div class="toolbox"><Toolbox/></div>
    <div class="editor-scroller">
      <div class="editor"><Editor/></div>
    </div>
    <div v-if="!isAuthenticated" class="authPlug"></div>
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
  .authPlug{
    position: fixed;
    left:0; right: 0; top: 50px; bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
  }
</style>
