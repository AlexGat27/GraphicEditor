<template>
  <div class="overlay">
    <div class="create-panel">
      <h2>{{ action }} модель</h2>
      <form @submit.prevent="createModel">
        <input type="text" v-model="name" required placeholder="Название" />
        <h3>Аттрибуты модели</h3>

        <div style="display: flex; width: 100%;">
          <!-- Condition Attributes -->
          <div class="condition-group">
            <h4>Аттрибуты условий</h4>
            <div class="scrollable">
              <div v-for="(condition, index) in conditionAttributes" :key="index">
                <input type="text" v-model="condition.condition" required placeholder="Условие" />
                <input type="text" v-model="condition.values" placeholder="Значения" />
                <input type="text" v-model="condition.countSignals" placeholder="Сигналы" />
                <button v-if="conditionAttributes.length > 1" type="button" @click="removeCondition(index)" style="width: 50%;">Удалить условие</button>
              </div>
            </div>
            <button type="button" @click="addCondition" style="width: 50%;">Добавить условие</button>
          </div>

          <!-- Action Attributes -->
          <div class="action-group">
            <h4>Аттрибуты для мигания контуром</h4>
            <input type="text" v-model="actionAttributes.interruptions" placeholder="Прерывания" />
            <input type="text" v-model="actionAttributes.workingPeriod" placeholder="Рабочий период" />
          </div>
        </div>

        <button class="fira-sans-regular" type="submit">Сохранить</button>
        <button class="fira-sans-regular" type="button" @click="$emit('close')">Отменить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ModelAttributes, ActionAttribute, ConditionAttribute } from '@/models/interfaces/modelAttributes';

export default {
  props: {
    action: {
      type: String,
      required: true
    },
    brand_id: {
      type: Number,
      required: true
    },
    modelAttributes:{
      type: ModelAttributes,
      required: true
    }
  },
  data(){
    return {
      name: '',
      conditionAttributes: [],
      actionAttributes: null
    }
  },
  created(){
    this.name = this.modelAttributes.scenario;
    this.modelAttributes.conditionAttributes.forEach(attribute => {
      this.conditionAttributes.push(new ConditionAttribute(
        attribute.condition,
        attribute.values ? attribute.values.join(' ') : attribute.values,
        attribute.countSignals ? attribute.countSignals.join(' ') : attribute.countSignals,
        attribute.delayTypes
      ))
    })
    this.actionAttributes = new ActionAttribute(
      this.modelAttributes.actionAttributes.actions,
      this.modelAttributes.actionAttributes.interruptions ? this.modelAttributes.actionAttributes.interruptions.join(' ') : this.modelAttributes.actionAttributes.interruptions,
      this.modelAttributes.actionAttributes.workingPeriod ? this.modelAttributes.actionAttributes.workingPeriod.join(' ') : this.modelAttributes.actionAttributes.workingPeriod,
      this.modelAttributes.actionAttributes.powers
    )
  },
  methods: {
    createModel() {
      this.conditionAttributes.forEach((attribute, index) => {
        attribute.condition = attribute.condition;
        attribute.values = attribute.values.split();
        attribute.countSignals = attribute.countSignals.split();
      });
      this.actionAttributes.interruptions = this.actionAttributes.interruptions.split();
      this.actionAttributes.workingPeriod = this.actionAttributes.workingPeriod.split();

      const newModel = {
        brand_id: this.brand_id,
        name: this.name,
        data: JSON.stringify(new ModelAttributes(this.name, this.conditionAttributes, this.actionAttributes))
      };
      this.$emit('create', newModel);
    },
    addCondition() {
      console.log(this.conditionAttributes)
      this.conditionAttributes.push(new ConditionAttribute());
    },
    removeCondition(index) {
      this.conditionAttributes.splice(index, 1);
    },
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-panel {
  background: var(--background-editorfield);
  padding: 20px 40px 20px 40px;
  border-radius: 5px;
  width: 70%;
  height: 80%;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

h2, h3, h4{
  margin-top: 0; margin-bottom: 15px;
}

input,
select {
  border: 1px solid var(--contour-elements);
  height: 30px;
  margin: 0;
  width: calc(100% - 20px);
  border-radius: 5px;
  cursor: pointer;
  background-color: inherit;
  color: var(--contour-elements);
  padding: 0 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

button {
  background-color: #d9d9d9;
  color: black;
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 5px;
}

.condition-group, .action-group {
  flex: 1;
  margin-right: 10px;
}

.scrollable {
  max-height: 300px; /* Adjust as needed */
  overflow-y: auto;
  padding-right: 10px;
}

.scrollable::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.scrollable {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollable::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.condition-group input, .action-group input {
  width: 90%;
}
</style>
