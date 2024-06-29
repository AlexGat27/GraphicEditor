<template>
    <div class="block">
      <label for="compose">{{blockTitle}}</label>
      <div class="select-container" id="compose">
        <DropdownBlock :attributes="attributes" @attribute="updateDropdown" :current="currentAttribute.type"/>
        <input type="number" v-model="currentAttribute.value" @input="updateInput" class="fira-sans-regular" style="font-size: 12px;">
      </div>
    </div>
  </template>
  
  <script>
import DropdownBlock from './DropdownBlock.vue';
  
  export default {
    components: {DropdownBlock},
    props: {
      blockTitle: {
        type: String,
        required: false
      },
      attributes: {
        type: Array,
        required: true
      },
      current: {
        type: Object,
        required: true
      }
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
      updateDropdown(value) {
        this.currentAttribute.type = value.toString();
        this.$emit('attribute', this.currentAttribute);
      },
      updateInput(value){
        // this.currentAttribute.value = value;
        this.$emit('attribute', this.currentAttribute);
      }
    },
  }
  </script>
  
  <style scoped>
  .block {
    height: 100%;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    background-color: none;
  }
  
  label {
    margin: 0;
    font-size: 10px;
  }
  .select-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding: 0;
  }
  
  .block input {
    border: 1px solid var(--contour-elements);
    height: 28.4px;
    padding: 0 10px 0 10px;
    margin:0;
    width: 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: inherit;
    color: var(--contour-elements);
    text-align: center;
  }
  .block input::-webkit-outer-spin-button,
  .block input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  </style>
  