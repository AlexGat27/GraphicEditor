<template>
    <div class="block">
      <label for="compose">{{blockTitle}}</label>
      <div class="select-container" id="compose">
        <DropdownBlock :attributes="attributes" @attribute="updateDropdown" :current="currentAttribute.type"/>
        <input type="number" v-model="currentAttribute.value" @input="updateInput">
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    width: 100%;
    padding: 0;
  }
  
  .block input {
    border: 1px solid var(--contour-elements);
    height: 100%;
    padding: 0;
    margin-right: 3px;
    width: 50px;
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
  