<template>
    <div class="contourBar">
        <h3 style="margin-left: 45px; margin-right: 45px;">Контуры</h3>
        <ul class="contours">
            <li v-for="(contour, index) in currentModel.contours" :key="index">
                <InputBlock :current="contour.name" :isSelected="contour.selected" @attribute="updateModelName($event, index)" 
                @selected="updateActiveContour($event, index)"/>
            </li>
        </ul>
    </div>
</template>

<script>
import InputBlock from '../blocks/InputBlock.vue';
import {useMainStore} from '../../store';

export default {
    components:{
        InputBlock
    },
    data(){
        return {
            store: null
        }
    },
    created(){
        this.store = useMainStore();
    },
    computed:{
        currentModel: {
            get(){
                return this.store.currentModel;
            },
            set(value){
                this.store.setCurrentModel(value);
            }
        }
    },
    methods: {
        updateModelName(value, index){
            const currentModel = this.currentModel;
            currentModel.contours[index].name = value;
            this.currentModel = currentModel;
        },
        updateActiveContour(value, index){
            const currentModel = this.currentModel;
            currentModel.contours.forEach(contour => {
                contour.selected = false;
            });
            currentModel.contours[index].selected = value;
            this.currentModel = currentModel;
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
        color: var(--blocks-contours);
        overflow: hidden;
    }
    .contours{
        display: flex;
        width: fit-content;
        align-items: center;
        height: 80%;
        overflow: hidden;
        overflow-x: auto;
        list-style-type: none;
    }
    .contours li{
        margin-right: 15px;
    }
    ::-webkit-scrollbar {
        display: none;
    }
</style>