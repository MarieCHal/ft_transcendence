<script setup lang="ts">
    import Login42 from '@/components/loginComponents/login42.vue';
    import loginCode from '@/components/loginComponents/loginCode.vue';
    import axios from 'axios';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from "vuex";
    
    const router = useRouter();
    const store = useStore();
    onMounted(() => {
      checkCode()
    });
    const checkCode = async () => {
      await router.isReady();
      const code = router.currentRoute.value.query.code;
      if (code)
      {
        const response = await axios.post('http://c1r2s3:3000/wellcome', {code: code});
        if (response.data.doubleAuth == false)
        {
            console.log(response.data);
            store.commit('setAuthenticated', true);
            store.commit('setDoubleAuth', false);
            store.commit('setAvatar', response.data.user.avatar);
            store.commit('setLogin', response.data.user.login);
            store.commit('setToken', response.data.accessToken);
            router.push('/');
        }
        else
        {
            store.commit('setDoubleAuth', true);
        }
      }
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
</template>

<style scoped lang="scss">

</style>