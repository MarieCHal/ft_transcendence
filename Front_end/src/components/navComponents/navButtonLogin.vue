<script setup lang="ts">
    import router from '@/router'
    
    function click(){
        router.push('/register');
    }
</script>

<template>
    <button class="navButton" id="navLoginButton" @click="click">
        <span>
            LOGIN
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