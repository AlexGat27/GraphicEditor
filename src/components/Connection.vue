<template>
    <svg>
      <line :x1="startX" :y1="startY" :x2="endX" :y2="endY" />
    </svg>
  </template>
  
  <script>
  export default {
    props: {
      startX: Number,
      startY: Number,
      endX: Number,
      endY: Number
    }
  };
  </script>
  
  <style scoped>
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
  </style>
  