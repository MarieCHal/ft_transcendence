<script  setup lang="ts">
    import { useStore } from "vuex"
    import router from '@/router'

    const store = useStore();

    async function click(){
        await router.push('/Profile');
    }

    function getAvatar(){
        return store.getters.getAvatar;
    }
</script>

<template>
    <button  id="navProfileButton" @click="click">
        <img :src="getAvatar()" v-if="getAvatar()"/>
    </button>
    <div>
        {{ store.getters.getNickname }}
    </div>
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