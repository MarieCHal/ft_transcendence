<script setup lang="ts">
    import pong from "@/components/pong/pong.vue";
    import customPong from "@/components/pong/customPong.vue";
    import axios from "axios";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;
    
</script>

<template>
    <customPong v-if="!store.getters.getPlayStart"/>
    <pong v-else/>
</template>

<style scoped lang="scss">

</style>