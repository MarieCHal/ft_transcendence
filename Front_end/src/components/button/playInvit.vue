<script setup lang="ts">
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;  

    const play = async () =>{
        console.log("a faire")
    }
</script>

<template>
    <button class="navButton" @click="play()">
        play
    </button>
</template>

<style scoped lang="scss">

</style>