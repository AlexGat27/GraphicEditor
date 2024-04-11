<template>
  <div class="block">
    <label>{{ blockType }}</label>
    <select v-model="currentAttribute" @change="updateAttribute">
      <option v-for="attribute in attributes" :value="attribute">{{ attribute }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    blockType: {
      type: String,
      required: true
    },
    containerID: {
      type: Number,
      required: true
    },
    attributes:{
      type: Array,
      required: true
    },
  },
  data(){
    return {
      currentAttribute: ''
    }
  },
  methods: {
    updateAttribute() {
      this.$emit('attribute', this.currentAttribute);
    }
  }
}
</script>

<style>
  .block{
    width: 80%;
    height: 50px;
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: space-center;
    justify-content: center;
    overflow: hidden;
    padding: 10px;
  }
  p{
    margin:0;
    text-align: center;
  }
</style>