<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    
    const router = useRouter();
    const store = useStore();

    function getAvatar(){
        return store.getters.getAvatar;
    }
</script>

<template>
    <h1>capsul !</h1>
    <div>
        <div>
            <img :src="getAvatar()" alt="">
        </div>
    </div>
</template>

<style scoped lang="scss">
    
</style>