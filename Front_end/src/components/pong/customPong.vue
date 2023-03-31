<script setup lang="ts">
    import pong from "@/components/pong/pong.vue";
    import axios from "axios";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;

    //store.getters.getColorRect1//
    //store.getters.getColorRect2//
    //store.getters.getColorBall//
    //store.getters.getColorBackGround
    //store.getters.getColorNet//
    //store.getters.getColorText//
    //faire un booleen dans le store "isStartPlay" pour afficher le pong dans la vue playStart
    //pas oublier de remettre a false une fois le pong fini (onUnmounted de pong componsant)

    function selectColor(optionColor: string){
        switch (optionColor) {
            case 'pink':
                store.commit('setColorRect1', '#7d4ffe');
                store.commit('setColorRect2', '#7d4ffe');
                store.commit('setColorBall', '#7d4ffe');
                store.commit('setColorBackGround', '#ff5efa');
                store.commit('setColorNet', '#7d4ffe');
                store.commit('setColorText', '#7d4ffe');
                store.commit('setPlayStart', true);
                break;
            case 'green':
                store.commit('setColorRect1', '#fcfe19');
                store.commit('setColorRect2', '#fcfe19');
                store.commit('setColorBall', '#fcfe19');
                store.commit('setColorBackGround', '#87ff00');
                store.commit('setColorNet', '#fcfe19');
                store.commit('setColorText', '#fcfe19');
                store.commit('setPlayStart', true);
                break;
            case 'normal':
                store.commit('setColorRect1', '#ffffff');
                store.commit('setColorRect2', '#ffffff');
                store.commit('setColorBall', '#ffffff');
                store.commit('setColorBackGround','#000000');
                store.commit('setColorNet', '#ffffff');
                store.commit('setColorText', '#ffffff');
                store.commit('setPlayStart', true);
                break;
            default:
                break;
        }
    }
</script>

<template>
    <div >
        <legend>Select custom option:</legend>
        <div>   
            <button @click="selectColor('pink')">
                pink
            </button>
            <button @click="selectColor('green')">
                green
            </button>
            <button @click="selectColor('normal')">
                normal
            </button>
        </div>
        <div>
            visualisation pong static
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>