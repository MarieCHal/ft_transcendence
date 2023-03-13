<script setup lang="ts">
    import router from '@/router'
    
    function click(){
        router.push('/Users');
    }
</script>

<template>
    <button class="navButton" @click="click">
        <span>
            Users
        </span>
    </button>
</template>

<style scoped lang="scss">

</style>