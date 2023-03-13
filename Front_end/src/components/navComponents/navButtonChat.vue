<script setup lang="ts">
    import router from '@/router'
    
    function click(){
        router.push('/DashBoardChan');
    }
</script>

<template>
    <button class="navButton" @click="click">
        <span>
            Chat
        </span>
    </button>
</template>

<style scoped lang="scss">

</style>