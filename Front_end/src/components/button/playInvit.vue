<script setup lang="ts">
    import router from "@/router";
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;  
    const socket = store.getters.getWebSocket;

    const play = async () =>{
        socket.emit('notif', store.getters.getOneUser.user_user_id, true);
    }
</script>

<template>
    <button class="navButton" @click="play()">
        play
    </button>
</template>

<style scoped lang="scss">

</style>