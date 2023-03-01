<script setup lang="ts">
    import axios from 'axios';
    import { useStore } from "vuex";
    import router from '@/router';
    import { useRoute } from 'vue-router'
    import { computed, watch } from 'vue';

    const store = useStore();
    const route = useRoute();
    const name = 'login42';
    const code = route.query.code;

    async function click(){
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }



        const redirectUri = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1efc18e2af44e4362df56b7995925e5e7f0a1407f1a30048e6a4516faff25622&redirect_uri=http%3A%2F%2Fc1r2s1%3A5173%2FLogin&response_type=code&state=${result}`;
        window.open(redirectUri);
        //const response1 = await axios.get(redirectUri);
        console.log(result, "   ", code);
        const response2 = await axios.post('http://c1r2s3:3000/wellcome', {state: result, code: code});
        /*const response2 = await axios.post('http://c1r2s3:3000/auth/token', {result: result});
        store.commit('setAuthenticated', true);
        store.commit('setAvatar', response2.data.avatar);
        store.commit('setLogin', response2.data.login);
        store.commit('setToken', response2.data.token);*/
        router.push('/Chat');
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