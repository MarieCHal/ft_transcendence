<script setup lang="ts">
    import router from '@/router'
    
    function click(){
        router.push('/Play');
    }
</script>

<template>
    <button class="navButton"  @click="click">
        <span>
            Play
        </span>
    </button>
</template>

<style scoped lang="scss">

</style>