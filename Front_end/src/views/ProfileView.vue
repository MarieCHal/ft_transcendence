<script setup lang="ts">
    import modifProfileButton from '../components/profileComponents/modifProfileButton.vue'
    import { useRouter } from 'vue-router';
    import { useStore } from "vuex";
    
    const router = useRouter();
    const store = useStore();
    function click(){
        router.push('/Profile/modif')
    }
</script>

<template>

    <div>
        <Span>avatar</Span>
        <br>
        <Span>login</Span>
        <br>
        <Span>stats</Span>
        <modifProfileButton @click="click()"/>
    </div> 
</template>

<style scoped lang="scss">

</style>