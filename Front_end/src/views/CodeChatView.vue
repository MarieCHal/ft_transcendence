<script setup lang="ts">
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();
    let codeChan = '';
    let msgError = '';

    function getStatusCode(){
    return store.getters.getStatusCode;
  }

  const checkCodeChan = async () => {
        if (codeChan.length == 4)
        {
            store.commit('setStatusCode', false);
            try {
                const response = await axios.post("http://c1r2s3:3000/chat/code", {codeChan: codeChan});
                router.push("/chat");

            } catch (error: any) {
                if (error.response.status != 201)
                {
                msgError = error.response.data.message ;
                store.commit('setStatusCode', true);
                }
            }
        }
    }
</script>

<template>
  <div>
    <form>
      <input type="text" name="codeChat" autocomplete="off"
        minlength="4" placeholder="code"
        v-model="codeChan" @keyup="checkCodeChan">
    </form>
    <div id="statuscode" v-if="getStatusCode()">
      <p> {{ msgError }} </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
    
</style>