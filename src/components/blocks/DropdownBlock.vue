<template>
  <div class="block">
    <label>{{ blockTitle }}</label>
    <div class="select-container">
      <select ref="selectElement" v-model="currentAttribute" @change="updateAttribute" :style="{ width: selectWidth }">
        <option v-for="attribute in attributes" :key="attribute" :value="attribute">{{ attribute }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blockTitle: {
      type: String,
      required: true
    },
    attributes: {
      type: Array,
      required: true
    },
    current: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectWidth: 'auto'
    };
  },
  computed: {
    currentAttribute: {
      get() {
        return this.current;
      },
      set(value) {
        this.$emit('attribute', value.toString());
      }
    }
  },
  methods: {
    updateAttribute() {
      this.$emit('attribute', this.currentAttribute.toString());
    },
    updateSelectWidth() {
      if (this.attributes && this.attributes.length > 0) {
        const selectElement = this.$refs.selectElement;
        const options = Array.from(selectElement.options);
        const longestOption = options.reduce((a, b) => (a.text.length > b.text.length ? a : b), { text: '' });
        const dummyElement = document.createElement('div');
        dummyElement.style.position = 'absolute';
        dummyElement.style.visibility = 'hidden';
        dummyElement.style.whiteSpace = 'nowrap';
        dummyElement.innerText = longestOption.text;
        document.body.appendChild(dummyElement);
        const width = dummyElement.offsetWidth;
        document.body.removeChild(dummyElement);
        this.selectWidth = `${width + 30 + 10}px`; // добавляем немного дополнительного пространства
      } else {
        this.selectWidth = '60px'; // Устанавливаем ширину по умолчанию, если нет атрибутов
      }
    }
  },
  mounted() {
    this.updateSelectWidth();
  },
  updated() {
    this.updateSelectWidth();
  }
}
</script>

<style scoped>
.block {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background-color: none;
}

label {
  margin-bottom: 5%;
  font-size: 15px;
}

.select-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-container select {
  width: calc(100% - 30px); /* Уменьшаем ширину на padding-right для размещения стрелки */
  padding: 0 30px 0 15px; /* Устанавливаем padding-left для текста */
  border: 1px solid var(--contour-elements);
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--background-editorfield);
  color: var(--contour-elements);
  height: 30px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%237f7f7f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center; /* Позиционирование стрелки */
  background-size: 20px; /* Увеличиваем размер стрелки */
}
</style>
