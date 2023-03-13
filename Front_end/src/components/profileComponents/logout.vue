<script setup lang="ts">
    import Cookies from 'js-cookie';
import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    
    const router = useRouter();
    const store = useStore();

    function logout() {
        const socket = store.getters.getWebSocket;
        if (socket){
            socket.disconnect();
        }
        store.replaceState({});
        localStorage.clear();
        Cookies.remove('auth_token')
        store.commit('setDoubleAuth', false);
        localStorage.clear();
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