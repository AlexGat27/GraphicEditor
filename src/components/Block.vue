<template>
  <div class="blockContainer">
    <div class="connector input" draggable="true"></div>
    <div class="block" draggable="true">
      <slot :id="id"></slot>
    </div>
    <div class="connector output" draggable="true"></div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
}
</script>

<style>
  .blockContainer{
    position: absolute;
    width: 120px;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    transform: translateX(-50%) translateY(-50%);
  }
  .block{
    /* width: 120px;
    height: 50px;
    border: 1px solid black;
    position: absolute;
    border-radius: 10px; */
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: space-center;
    justify-content: center;
    overflow: hidden;
  }
  p{
    margin:0;
    text-align: center;
  }
  .connector{
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 15px;
    height: 15px;
    background-color:rgb(255, 255, 255); /* Цвет круглого элемента */
    border: 1px solid black;
    border-radius: 50%; /* Делаем круглый */
  }
  .input{
    left: 0; /* Расположение круглого элемента справа от блока */
  }
  .output{
    right: -15px; /* Расположение круглого элемента справа от блока */
  }
</style>