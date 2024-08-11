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
      <img src="@/assets/icons/download-yellow.png" style="margin: 0; margin-right: 20px; height: 30px; cursor: pointer;"
           @click="downloadScenarioTXT">
    </div>
  </div>
  <Sidenav v-if="isSidebarOpen" @close="toggleSidebar"/>
  <Notification :message="notificationMessage" :type="notificationType"
                @hide="notificationMessage = ''; notificationType = ''"/>
</template>

<script>
import {ContainerModel} from '@/models/compileModel';
import {useMainStore} from '@/stores/modelStore';
import Sidenav from '../shared/Sidenav.vue';
import {useAuthStore} from '@/stores/authStore';
import {scenarioApi} from '@/services/api';
import {ActionParams} from '@/models/attributeEnums';
import Notification from "@/components/shared/Notification.vue";

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
    this.store = useMainStore();
    this.authStore = useAuthStore();
  },
  mounted() {
    // Compute initial width when component is mounted
    this.calculateScenarioBarMinWidth();
    // Watch for changes in refs
    this.$refs.leftPart.addEventListener('resize', this.calculateScenarioBarMinWidth);
    this.$refs.rightPart.addEventListener('resize', this.calculateScenarioBarMinWidth);
  },
  beforeDestroy() {
    // Clean up event listeners
    if (this.$refs.leftPart) {
      this.$refs.leftPart.removeEventListener('resize', this.calculateScenarioBarMinWidth);
    }
    if (this.$refs.rightPart) {
      this.$refs.rightPart.removeEventListener('resize', this.calculateScenarioBarMinWidth);
    }
  },
  computed: {
    currentModel: {
      get() {
        return this.store.currentModel;
      },
      set(value) {
        this.store.setCurrentModel(value);
      }
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    addContainer() {
      const currentModel = this.currentModel;
      const potentialContour = currentModel.contours.find(contour => contour.selected && contour.name !== '');
      if (potentialContour && potentialContour.containers.length < 5) {
        potentialContour.containers.push(new ContainerModel());
      }
      this.currentModel = currentModel;
    },
    async downloadScenarioTXT() {
      try {
        const response = await scenarioApi.downloadScenario(this.store.selectedScenarioId);
        if (response.data.status === "error") {
          console.error('Возникла ошибка при выгрузке сценария: ', response.data.message);
          this.notificationMessage = 'Ошибка выгрузки. Сценарий не сохранен';
          this.notificationType = 'error';
          return;
        }

        const hexData = response.data["hexData"];
        const binaryData = hexData.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
        const byteArray = new Uint8Array(binaryData);
        const blob = new Blob([byteArray], {type: 'text/plain'});

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'scenario.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.notificationMessage = 'Успешная выгрузка сценария';
        this.notificationType = 'success';
      } catch (error) {
        console.error('There has been a problem with your download operation:', error);
        this.notificationMessage = 'Возникла ошибка при выгрузке сценария';
        this.notificationType = 'error';
      }
    },
    async saveScenario() {
      let isNullValues = false;
      const compileModel = this.store.getFormattedCurrentModel();
      compileModel.countContainers = 0;
      compileModel.contours.forEach(contour => {
        contour.containers.forEach(container => {
          container.conditionCases.forEach(attr => {
            if (attr.condition === '' || attr.value === '' || attr.countSignals === '' ||
                attr.delay.type === '' || attr.delay.value === '') {
              isNullValues = true;
              return;
            }
          })
          container.actionCases.forEach(attr => {
            if (attr.action === ActionParams.EMPTY || attr.power === '' || (attr.action === ActionParams.BLINK && (attr.interruption === '' || attr.workingPeriod === ''))) {
              isNullValues = true;
              return;
            }
          })
          if (isNullValues) return;
        });
        compileModel.countContainers += contour.containers.length;
        if (isNullValues) return;
      });
      if (isNullValues) {
        this.notificationMessage = 'Не все поля заполнены';
        this.notificationType = 'error';
        return;
      }
      const requestData = {jsonData: compileModel};
      const response = await scenarioApi.updateScenario(compileModel.scenario_id, requestData);
      if (response.status === 200) {
        this.notificationMessage = 'Успешное сохранение сценария';
        this.notificationType = 'success';
      } else {
        this.notificationMessage = 'Произошла непредвиденная ошибка при сохранении сценария';
        this.notificationType = 'error';
      }
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
