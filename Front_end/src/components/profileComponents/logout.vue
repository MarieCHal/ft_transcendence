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
        store.replaceState({});
        localStorage.clear();
        store.commit('setDoubleAuth', false);
        router.push('/');
    }
</script>

<template>
    <button @click="logout()">
        logout
    </button>
</template>

<style scoped lang="scss">
    button{
        background-color: red;
    }
</style>