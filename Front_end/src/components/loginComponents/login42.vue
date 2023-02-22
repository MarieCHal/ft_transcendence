<script setup lang="ts">
    import axios from 'axios';
    import { useStore } from "vuex";
    import router from '@/router';

    const store = useStore();
    async function click(){
        //await axios.get('http://c1r2s3:3000/getCode');
        //const response = await axios.get('http://c1r2s3:3000/test');
        store.commit('setAuthenticated', true);
        //store.commit('setAvatar', response.data.avatar);
        //store.commit('setLogin', response.data.login);
        router.push('/Play')
    }
</script>

<template>
    <div>
        <button class="navButton" id="navLoginButton" @click="click">
        <span>
            LOGIN 42
        </span>
    </button>
    </div>
</template>

<style scoped lang="scss">
#navLoginButton{
    background-color: rgb(0, 252, 38);
}
.navButton{
    width: auto;
    height: 3em;
}
</style>