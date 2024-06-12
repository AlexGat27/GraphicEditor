<template>
  <div class="block" @click="handleClick" @dblclick="handleDoubleClick">
    <label v-if="blockTitle">{{ blockTitle }}</label>
    <input type="text" 
           v-model="reactiveCurrent" 
           :readonly="!isEditable"
           :class="{ selected: isSelected, editable: isEditable }"
           @blur="isEditable = false"
           @input="updateCurrentAttribute"
           ref="input">
  </div>
</template>

<script>
export default {
  props: {
    blockTitle: {
      type: String,
      required: false
    },
    current: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      reactiveCurrent: this.current,
      isEditable: false // Управляет режимом редактирования input
    };
  },
  methods: {
    updateCurrentAttribute() {
      this.$emit('attribute', this.reactiveCurrent);
      this.adjustWidth();
    },
    handleClick() {
      if (!this.isSelected) {
        this.$emit('selected', true); 
        this.$refs.input.classList.add('selected');
      }
    },
    handleDoubleClick() {
      this.isEditable = true;
    },
    adjustWidth() {
      const input = this.$refs.input;
      if (input) {
        const minWidth = 50; // Минимальная ширина в пикселях
        input.style.width = 'auto';
        input.style.width = `${Math.max(input.scrollWidth, minWidth)}px`;
      }
    },
  },
  watch: {
    reactiveCurrent() {
      this.adjustWidth();
    },
    isSelected(newValue, oldValue) {
      if (!newValue) {
        this.$refs.input.classList.remove('selected');
      }
    }
  },
  mounted() {
    this.adjustWidth();
  },
};
</script>

<style scoped>
  .block input {
    border: 1px solid var(--blocks-contours);
    border-radius: 5px;
    cursor: pointer;
    background-color: inherit;
    color: var(--blocks-contours);
    text-align: center;
  }
  .block {
    min-width: 50px;
    height: 100%;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: inherit;
  }
  .block input.editable {
    cursor: text;
  }
  .block input.selected {
    background-color: var(--selected-block);
  }
  label {
    margin: 0;
    color: var(--blocks-contours);
  }
</style>
