<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <p>{{ message }}</p>
        <button @click="confirm">Да</button>
        <button @click="cancel">Нет</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: 'Вы уверены, что хотите удалить?'
      },
      deletedIndex: {
        type: Number,
        required: false
      }
    },
    methods: {
      confirm() {
        if (this.deletedIndex){
          this.$emit('confirm', this.deletedIndex);
        }else{
          this.$emit('confirm');
        }
      },
      cancel() {
        this.$emit('cancel');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1005;
  }
  
  .modal-content {
    background: var(--background-editorfield);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .modal-content button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    background-color: var(--selected-block);
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  