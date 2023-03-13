<script setup lang="ts">
    import Login42 from '@/components/loginComponents/login42.vue'
    import loginCode from '@/components/loginComponents/loginCode.vue'
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import fetchAvatar from '../avatar';
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();
    let msgError = '';
    let code: any = null;

    onMounted(() => {
        checkCode();
    });

    const welcome = async (code: any) => {
        try {
            const response = await axios.post('http://c1r2s3:3000/wellcome', {code: code});
            if (response.data.doubleAuth == true) {
                store.commit('setDoubleAuth', true);
                router.push('/register');
            }
            else {
                store.commit('setAuthenticated', true);
                store.commit('setDoubleAuth', false);
                store.commit('setId', response.data.user.user_id);
                store.commit('setNickname', response.data.user.nickname);
                Cookies.set('auth_token', response.data.accessToken, {secure: false});
                fetchAvatar(store);
                router.push('/');
            }

        } catch (error: any) {
            msgError = error.response.data.message ;
            store.commit('setStatusCode', true);
        }
    }

    const checkCode = async () => {
        await router.isReady();
        store.commit('setStatusCode', false);
        code = router.currentRoute.value.query.code;
        if (code) {
            welcome(code);
        }
    }


    function getStatusCode(){
        return store.getters.getStatusCode;
    }
    async function clicklogin(){
        window.location.href = ('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1efc18e2af44e4362df56b7995925e5e7f0a1407f1a30048e6a4516faff25622&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregister&response_type=code&%60')
    }
    
    function getDoubleAuth(){
        return store.getters.getDoubleAuth;
    }

</script>

<template>
    <div v-if="getDoubleAuth() == false">
        <Login42 @click="clicklogin"/> 
    </div>
    <div v-else>
        <loginCode />
    </div>
    <div id="statuscode" v-if="getStatusCode()">
      <p> {{ msgError }} </p>
    </div>
</template>

<style scoped lang="scss">

</style>