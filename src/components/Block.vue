<template>
  <div class="block" draggable="true">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      required: true
    }
  },
}
</script>

<style>
  .block{
    width: 100px;
    height: 50px;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    overflow: hidden;
  }
  p{
    margin:0;
    text-align: center;
  }
</style>