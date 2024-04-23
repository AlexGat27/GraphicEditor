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
    }
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
  .block{
    min-width: 150px;
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    background-color: white;

  }
  p{
    margin:0;
    text-align: center;
  }
</style>