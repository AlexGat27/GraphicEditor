<template>
  <div class="block">
    <label>{{ blockTitle }}</label>
    <select v-model="currentAttribute" @change="updateAttribute">
      <option v-for="attribute in attributes" :value="attribute">{{ attribute }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    blockTitle: {
      type: String,
      required: true
    },
    attributes:{
      type: Array,
      required: true
    },
    current: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentAttribute: {
      get(){
        return this.current;
      },
      set(value){
        this.$emit('attribute', value.toString());
      }
    }
  },
  methods: {
    updateAttribute() {
      this.$emit('attribute', this.currentAttribute.toString());
    }
  }
}
</script>

<style scoped>
  .block select{
      border: 1px solid var(--blocks-contours);
      border-radius: 10px;
      cursor: pointer;
      background-color: black;
      color: var(--blocks-contours);
    }
    .block{
      width: 80%;
      height: 50px;
      margin: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      background-color: none;
    }
  label{
    margin-bottom:5%;
    color: var(--blocks-contours);
  }
</style>