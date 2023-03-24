<script setup lang="ts">
    import router from '@/router'
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex"

    const store = useStore();

    const socket = store.getters.getWebSocket;

    /*onMounted(async () => {
    socket.on("notif", (message: string) => {
        store.commit("setInvitePlay", message)
        alert(message);
    });
  });*/

    function click(){
        router.push('/');
    }
</script>

<template>
    <button class="navButton" id="navLoginButton" @click="click">
        <span>
            LOGo
        </span>
    </button>
</template>

<style scoped lang="scss">
#navLoginButton{
    background-color: #007bff;
}
.navButton{
    width: auto;
    height: 3em;
}
</style>