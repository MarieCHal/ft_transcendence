<script setup lang="ts">
    import router from '@/router'
    
    function click(){
        router.push('/');
    }
</script>

<template>
        <button id="logo" class="navButton" @click="click">
        </button>
</template>

<style scoped lang="scss">

#logo{
    background-image: url('../../assets/42.png'), radial-gradient(ellipse at center, rgba(10, 197, 244, 0.2) 0%, rgba(17, 245, 234, 0.8) 350%, rgba(0, 0, 0, 1) 100%);
    height: 50px;
    width: 100px;
    background-size: cover;
    background-position: center;
    margin: 10px;
    max-width: 55px;
    max-height: 40px;
    min-width: 55px;
    min-height: 40px;
    box-shadow: 0 0 20px  #06FFFF;
}
</style>