<script setup lang="ts">
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { useStore } from "vuex"
  import getAvatar from '../../getAvatar'

  const router = useRouter();
  const store = useStore();
  let codeMail = '';

  const checkCodeMail = async () => {
    if (codeMail.length == 4)
    {
      try {
        let nickname = store.getters.getNickname;
        const response = await axios.post("/auth/code", {codeMail: codeMail, nickname: nickname});
        if (response.status == 201){
          store.commit('setId', response.data.user.user_id);
          store.commit('setNickname', response.data.user.nickname);
          store.commit('setToken',  response.data.accessToken);
          let url = await getAvatar(store, response.data.user.user_id);
          store.commit('setAvatar', url);
          store.commit('setCode',  false);
          store.dispatch('initWebSocket');
          router.push("/");
        }
      } catch (error: any) {
        if (error.response.status != 201)
        {
            console.log(error);
            //alert(error);
        }
      }
    }
  }

</script>

<template>
    <form class="navButton">
        <input class="navButton" type="text" name="codeMail" autocomplete="off"
        minlength="4" placeholder="code"
        v-model="codeMail" @keyup="checkCodeMail">
    </form>
</template>

<style scoped lang="scss">

</style>