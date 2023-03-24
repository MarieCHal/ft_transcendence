<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"

    const router = useRouter();
    const store = useStore();

    function logout() {
        const socket = store.getters.getWebSocket;
        if (socket){
            socket.disconnect();
            console.log('socket is disconnect');
        }
        localStorage.clear();
        store.replaceState({});
        store.commit('setDoubleAuth', {isDoubleAuth: false});
        router.push('/');
    }
</script>

<template>
    <button class="navButton" @click="logout()">
        logout
    </button>
</template>

<style scoped lang="scss">
    button{
        background-color: red;
    }
</style>