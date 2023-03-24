<script setup lang="ts">
    import router from '@/router'
    
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

</style>