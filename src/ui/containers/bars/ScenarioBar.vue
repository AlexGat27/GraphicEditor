<template>
  <div class="scenarioBar" :style="{ minWidth: scenarioBarMinWidth + 'px' }">
    <div class="leftPart" ref="leftPart">
      <span @click="toggleSidebar">&equiv;</span>
      <h3 class="fira-sans-medium">MotoCan</h3>
      <div>{{ currentModel ? currentModel.scenario : "Не выбран сценарий" }}</div>
    </div>
    <div class="rightPart fira-sans-regular" ref="rightPart">
      <button :disabled="!isAuthenticated" class="fira-sans-regular" @click="addContainer">Добавить правило</button>
      <button :disabled="!isAuthenticated" class="fira-sans-regular" @click="saveScenario">Выгрузить сценарий</button>
      <img src="../../../assets/icons/download-yellow.png" style="margin: 0; margin-right: 20px; height: 30px; cursor: pointer;">
    </div>
  </div>
  <Sidenav v-if="isSidebarOpen" @close="toggleSidebar"/>
  <Notification :message="notificationMessage" :type="notificationType"
                @hide="notificationMessage = ''; notificationType = ''"/>
</template>

<script>
import {ContainerModel} from '@/models/compileModel.js';
import {useMainStore} from '@/stores/modelStore.js';
import Sidenav from '../../components/nav/Sidenav.vue';
import {useAuthStore} from '@/stores/authStore.js';
import {scenarioApi} from '@/services/api/index.js';
import {ActionParams} from '@/models/attributeEnums.js';
import Notification from "@/ui/components/alerts/Notification.vue";

export default {
  components: {
    Notification,
    Sidenav
  },
  data() {
    return {
      isSidebarOpen: false,
      scenarioBarMinWidth: 0,
      notificationMessage: '',
      notificationType: ''
    };
  },
  created() {
    this.authStore = useAuthStore();
  },
  mounted() {
    this.calculateScenarioBarMinWidth();
    this.$refs.leftPart.addEventListener('resize', this.calculateScenarioBarMinWidth);
    this.$refs.rightPart.addEventListener('resize', this.calculateScenarioBarMinWidth);
  },
  beforeDestroy() {
    if (this.$refs.leftPart) {
      this.$refs.leftPart.removeEventListener('resize', this.calculateScenarioBarMinWidth);
    }
    if (this.$refs.rightPart) {
      this.$refs.rightPart.removeEventListener('resize', this.calculateScenarioBarMinWidth);
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    currentModel(){
      return this.$modelService.getCurrentModel();
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    addContainer() {
      this.$modelService.addContainer();
    },
    async saveScenario() {
      const result = await this.$scenarioService.saveScenario();
      this.notificationMessage = result.message;
      this.notificationType = result.status === 'success' ? 'success' : 'error';
    },
    async downloadScenarioTXT() {
      const result = await this.$scenarioService.downloadScenarioTXT();
      this.notificationMessage = result.message;
      this.notificationType = result.status === 'success' ? 'success' : 'error';
    },
    calculateScenarioBarMinWidth() {
      const leftPartWidth = this.$refs.leftPart ? this.$refs.leftPart.clientWidth : 0;
      const rightPartWidth = this.$refs.rightPart ? this.$refs.rightPart.clientWidth : 0;
      this.scenarioBarMinWidth = leftPartWidth + rightPartWidth + 25;
    }
  }
}
</script>

<style scoped>
.scenarioBar {
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-toolbox-scenario);
}

.leftPart {
  display: inherit;
  align-items: center;
  position: relative;
  white-space: nowrap; /* Prevent text from wrapping */
}

.leftPart span {
  margin: 0;
  margin-left: 15px;
  font-size: 32px;
  color: var(--yellow-text);
  font-weight: bold;
  cursor: pointer;
}

.leftPart h3 {
  margin: 0 25px 0 25px;
  color: var(--yellow-text);
  font-size: 28px;
}

.rightPart {
  justify-content: end;
  display: inherit;
  align-items: center;
  font-size: 12px;
}

.rightPart button {
  background-color: #d9d9d9;
  color: black;
  margin-right: 20px;
  border-radius: 5px;
  height: 30px;
  width: 150px;
  cursor: pointer;
}
</style>
