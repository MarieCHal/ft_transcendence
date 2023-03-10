<script setup lang="ts">
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { useStore } from "vuex"
  import fetchAvatar from '../../avatar';
  import Cookies from 'js-cookie';
  
  const router = useRouter();
  const store = useStore();
  let codeMail = '';
  let msgError = '';

  const checkCodeMail = async () => {
    if (codeMail.length == 4)
    {
      store.commit('setStatusCode', false);
      try {
        let nickname = store.getters.getNickname;
        const response = await axios.post("http://c1r2s3:3000/auth/code", {codeMail: codeMail, nickname: nickname});
        if (response.status == 201){
          store.commit('setAuthenticated', true);
          store.commit('setId', response.data.user.user_id);
          store.commit('setNickname', response.data.user.nickname);
          Cookies.set('auth_token', response.data.accessToken, {secure: false});
          fetchAvatar(store);
          router.push("/");
        }
      } catch (error: any) {
        if (error.response.status != 201)
        {
          msgError = error.response.data.message ;
          store.commit('setStatusCode', true);
        }
      }
    }
  }

  function getStatusCode(){
    return store.getters.getStatusCode;
  }
  
</script>

<template>
  <div>
    <form>
      <input type="text" name="codeMail" autocomplete="off"
        minlength="4" placeholder="code"
        v-model="codeMail" @keyup="checkCodeMail">
    </form>
    <div id="statuscode" v-if="getStatusCode()">
      <p> {{ msgError }} </p>
    </div>
  </div>
</template>