<script setup lang="ts">
    import navButtonLogin from "../components/button/navButtonLogin.vue"
    import formLoginCode from '../components/form/formLoginCode.vue';
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import getAvatar from '../getAvatar'

    const router = useRouter();
    const store = useStore();
    let code: any = null;

    onMounted(() => {
        checkCode();
    });

    const welcome = async (code: any) => {
        try {
            const response = await axios.post('/wellcome', {code: code});
            if (response.data.doubleAuth == true) {
                store.commit('setDoubleAuth', true);
                store.commit('setCode',  true);
                store.commit('setNickname', response.data.nickname);
            }
            else {
                store.commit('setDoubleAuth',  false);
                store.commit('setId', response.data.user.user_id);
                store.commit('setNickname', response.data.user.nickname);
                store.commit('setToken',  response.data.accessToken);
                let url = await getAvatar(store, response.data.user.user_id);
                store.commit('setAvatar', url);
                store.dispatch('initWebSocket');
                router.push('/');
            }

        } catch (error: any) {
            console.log(error);
            //alert(error);
            /*setTimeout(() => {
                window.location.reload();
            }, 1000);*/
        }
    }

    const checkCode = async () => {
        await router.isReady();
        code = router.currentRoute.value.query.code;
        if (code) {
            welcome(code);
        }
    }

    async function clicklogin(){
        window.location.href = ('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1efc18e2af44e4362df56b7995925e5e7f0a1407f1a30048e6a4516faff25622&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregister&response_type=code')
    }

    function getToken() {
        const token = store.getters.getToken;
        if (token)
        return token;
    }
</script>

<template>
    <div>
        <h1>
            Bienvenue sur ft_trantran
        </h1>
        <navButtonLogin v-if="!getToken()" @click="clicklogin()"/>
        <formLoginCode  v-if="store.getters.getCode == true"/>
    </div>
</template>

<style scoped lang="scss">
div{
    display: flex;
    flex-direction: column;
    align-items:center ;
}
h1{
    width: auto;
    height: auto;
}

</style>