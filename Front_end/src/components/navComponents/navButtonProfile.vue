<script  setup lang="ts">
    import { useStore } from "vuex";
    import router from '@/router';

    const store = useStore();
    var image = store.getters.getAvatar;
    async function click(){

        router.push('/Profile')
    }
</script>

<template>
    <button  id="navProfileButton" @click="click">
        <img :src="image" v-if="image"/>
    </button>
</template>

<style scoped lang="scss">
#navProfileButton{
    width: 100px;
    height: 100px;
    border-radius: 50px;
}

img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
</style>