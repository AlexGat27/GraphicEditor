<template>
    <div class="contourBar">
        <h3 class="fira-sans-regular">Контуры</h3>
        <ul v-if="isShowContours" class="contours">
            <li v-for="(contour, index) in currentModel.contours" :key="index">
                <ContourBtnBlock :isSelected="contour.selected" @attribute="updateModelName($event, index)" 
                @selected="updateActiveContour($event, index)" :current="contour.name"/>
            </li>
        </ul>
    </div>
</template>

<script>
import ContourBtnBlock from '../../components/blocks/ContourBtnBlock.vue';
import { useAuthStore } from '@/stores/authStore.js';

export default {
    components:{
        ContourBtnBlock
    },
    created(){
        this.authStore = useAuthStore();
    },
    computed:{
        isShowContours(){
            return this.$modelService.getCurrentModel() !== null && this.authStore.isAuthenticated;
        },
      currentModel(){ return this.$modelService.getCurrentModel(); },
    },
    methods: {
        updateModelName(value, index){
            this.$modelService.updateModelName(value, index);
        },
        updateActiveContour(value, index){
            this.$modelService.updateActiveContour(value, index);
        }
    }
}
</script>

<style scoped>
    .contourBar{
        height: 100%;
        width: 100%;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: start;
        background-color: var(--background-toolbox-contourbar);
        overflow: hidden;
    }
    .contourBar h3{
      margin: 0 25px 0 60px; font-size: 16px;
    }
    .contours{
        display: flex;
        width: fit-content;
        align-items: center;
        height: 100%;
        overflow: hidden;
        overflow-x: auto;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .contours li{
        margin-right: 14px;
        margin-left: 1px;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>