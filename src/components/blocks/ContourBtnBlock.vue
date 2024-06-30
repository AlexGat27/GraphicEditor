<template>
  <div class="block" @click="handleClick">
    <!-- <label v-if="blockTitle">{{ blockTitle }}</label> -->
    <!-- <button ref="button" class="fira-sans-regular">{{ blockTitle }}</button> -->
    <input type="text" 
           v-model="reactiveCurrent" 
           :readonly="!isEditable"
           :class="{ selected: isSelected, editable: isEditable }"
           @blur="isEditable = false"
           @input="updateCurrentAttribute"
           @dblclick="handleDoubleClick"
           maxlength="50"
           ref="input">
  </div>
</template>

<script>
export default {
  props: {
    // blockTitle: {
    //   type: String,
    //   required: false
    // },
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
      this.$nextTick(() => {
        this.$refs.input.focus(); // Установить фокус на input после его превращения в редактируемый
      });
    },
    adjustWidth() {
      const input = this.$refs.input;
      if (input) {
        const minWidth = 100;
        input.style.width = '100px';
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
    border: 1px solid var(--contour-elements);
    height: 100%;
    padding: 0 5px 0 5px;
    margin: 0;
    border-radius: 5px;
    cursor: pointer;
    background-color: inherit;
    color: var(--contour-elements);
    text-align: center;
  }
  /* button{
    border: 1px solid var(--contour-elements);
    height: 100%;
    margin: 0;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: inherit;
    color: var(--contour-elements);
    text-align: center;
    font-size: 12px;
  } */
  .block {
    min-width: 50px;
    height: 30px;
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
    color: white;
  }
  label {
    margin: 0;
    color: var(--blocks-contours);
  }
</style>
