<template>
  <div class="block">
    <label>{{ blockTitle }}</label>
    <input type="text" @keyup="emitInt($event.target.value)" v-model="currentAttribute">
  </div>
</template>

<script>
export default {
  props: {
    blockTitle: {
      type: String,
      required: true
    },
    current: {
      type: Number,
      required: true,
    }
  },
  computed: {
    currentAttribute: {
      get(){
        return this.current;
      },
      set(value){
        let intValue = parseInt(value);
        if (intValue) this.$emit('attribute', intValue);
      }
    }
  },
  methods: {
    emitInt(value){
      let intValue = parseInt(value);
      if (intValue) this.$emit('attribute', intValue);
    }
  }
}
</script>

<style scoped>
  .block{
    min-width: 150px;
    height: 60%;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding: 10px;
    margin: 5px;
    background-color: white;
  }
  p{
    margin:0;
    text-align: center;
  }
</style>