<script setup lang="ts">
    import pong from "@/components/pong/pong.vue";
    import axios from "axios";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;
    const selectedOption = '';

    store.getters.getColorRect1
    store.getters.getColorRect2
    store.getters.getColorBall
    store.getters.getColorBackGround
    store.getters.getColorNet
    store.getters.getColorText
    //faire un booleen dans le store "isStartPlay" pour afficher le pong dans la vue playStart
    //pas oublier de remettre a false une fois le pong fini (onUnmounted de pong componsant)
    function clickPlay(){
        console.log('Selected option:', selectedOption)
        //store.commit('setPlayStart', true);
    }

    function selectColor(optionColor: string){
        switch (optionColor) {
            case 'pink':
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                break;
            case 'green':
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');

                break;
            case 'normal':
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
                store.commit('');
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

            </button>
            <button @click="selectColor('green')">

            </button>
            <button @click="selectColor('normal')">

            </button>
        </div>
        <div>
            visualisation pong static
        </div>
        <button @click="clickPlay()">  
            play
        </button>
    </div>
</template>

<style scoped lang="scss">

</style>