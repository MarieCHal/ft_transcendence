<script setup lang="ts">
    import Login42 from '@/components/loginComponents/login42.vue'
    import loginCode from '@/components/loginComponents/loginCode.vue'
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    
    const router = useRouter();
    const store = useStore();
    let msgError = '';
    
    onMounted(() => {
        checkCode();
    });

    const checkCode = async () => {
        await router.isReady();
        store.commit('setStatusCode', false);
        const code = router.currentRoute.value.query.code;
        if (code)
        {
            try {
                const response = await axios.post('http://c1r2s3:3000/wellcome', {code: code});
                if (response.data.doubleAuth == false)
                {
                    console.log(response.data);
                    store.commit('setAuthenticated', true);
                    store.commit('setDoubleAuth', false);
                    store.commit('setId', response.data.user.id);
                    console.log(store.getters.getId, 'coucou')
                    store.commit('setNickname', response.data.user.nickname);
                    store.commit('setToken', response.data.accessToken);
                    router.push('/');
                }
                else
                {
                    store.commit('setNickname', response.data.nickname);
                    store.commit('setId', response.data.id);
                    console.log(store.getters.getId, 'coucou2')
                    store.commit('setDoubleAuth', true);
                    router.push('/');
                }
            } catch (error: any) {
                if (error.response.status != 201)
                {
                    msgError = error.response.data.message ;
                    store.commit('setStatusCode', true);
                }
            }
            const response = await fetch(`http://c1r2s3:3000/users/avatar/${store.getters.getId}`);
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            store.commit('setAvatar', url);
            store.dispatch('initWebSocket');
            console.log(store.getters.getWebSocket)
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