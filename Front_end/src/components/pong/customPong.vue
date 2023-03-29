<script setup lang="ts">
    import pong from "@/components/pong/pong.vue";
    import axios from "axios";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;

</script>

<template>
    <div >
        <div>
            custom option
        </div>
        <div>
            visualisation pong static
        </div>
        <button >
            play
        </button>
    </div>
</template>

<style scoped lang="scss">

</style>