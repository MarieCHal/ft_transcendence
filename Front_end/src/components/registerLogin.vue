<script setup lang="ts">
    import { assert } from '@vue/compiler-core';
    import axios from 'axios';
import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    onMounted(() => {
      click()
    });
    const click = async () => {
      await router.isReady()
      let code = router.currentRoute.value.query.code
      if (code)
      {
        const response = await axios.post('http://c1r2s3:3000/wellcome', {
        code: code})
        if (response.data.doubleAuth == false)
        {
          console.log(response.data)
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('login', response.data.user.login);
          localStorage.setItem('avatar', response.data.user.avatar);
          router.push('/main')
        }
        else
        {
          console.log('dashdjash;kfhdklDFJHakjdhlkaSHDLa')
        }
      }
    }
          /*console.log(response.data.user.login)
          window.location.href = 'http://localhost:5173/main'*/
  
</script>


<template>
    <button class="glow-button" v-on:click="clicklogin"> 
      <div class="gradient"></div>
      <span class="span">
        Login 
      </span>
    </button>
  </template>
  
<script lang="ts">
  export default{
      data(){
          return{
          }
        },
        methods:{ 
          async clicklogin(){
            let state = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 10; i++) {
              state += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            let code = this.$route.query.code
            window.location.href = (`https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-1efc18e2af44e4362df56b7995925e5e7f0a1407f1a30048e6a4516faff25622&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregister&response_type=code&state=${state}`)
          },
        }
      }
    </script>