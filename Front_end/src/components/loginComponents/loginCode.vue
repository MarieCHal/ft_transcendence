<script setup lang="ts">
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useStore } from "vuex";
  
  const router = useRouter();
  const store = useStore();
  const codeMail = '';
  let statusCode = false;
  let msgError = '';

  const checkCodeMail = async () => {
    try {
      console.log(codeMail);
        const response = await axios.post("http://c1r2s3:3000/auth/code", {codeMail: codeMail});
        if (response.status == 201){
          store.commit('setAuthenticated', true);
          store.commit('setAvatar', response.data.user.avatar);
          store.commit('setLogin', response.data.user.login);
          store.commit('setToken', response.data.accessToken);
          router.push("/main");
      }
    } catch (error: any) {
      if (error.response.status != 201)
      {
        msgError = error.response.data.message ;
        statusCode = true;
      }
    }
  }
    

</script>

<template>
    <div>
      <form>
        <input type="text" name="code" autocomplete="off"
          minlength="4" placeholder="code"
          v-model="codeMail" @keyup="checkCodeMail">
      </form>
      <div id="statuscode" v-if="statusCode">
        <p> {{ msgError }} </p>
      </div>
    </div>
  </template>