<script setup lang="ts">
    import { useStore } from "vuex"
    import { useRouter } from 'vue-router'
    import axios from 'axios';

    const store = useStore();
    const router = useRouter();
    const userContext = store.getters.getUserContext;
    const chanContext = store.getters.getChanContext;
    let Pwd = '';

    const deleteChan = async () => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.delete(`/chat/del/${chanContext.chanel_chat_id}`,  {headers})
            router.push('/dashBoardChat')
            }catch (error: any) {
            if (error.response.status != 201){
                console.log("Error serveur");
            }
            }
    }

    const submmit = async () => {
    if (!userContext.owner){
        alert("YOU ARE NOT A OWNER")
        return ;
    }
    try {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = { chanelId: chanContext.chanel_chat_id, pwd: Pwd};
        const response = await axios.post('/chat/pwd', data,  {headers})
        if(response.status == 201){
          store.commit("setBool", false)
        }
        }catch (error: any) {
          if (error.response.status != 201){
            console.log("Error serveur");
          }
        }
  }

  function getBool(){
      store.commit("setBool", true)
      return store.getters.getBool;
  }
</script>

<template>
    <form @submit.prevent="submmit" v-if="userContext.isProtected === true">
      <button  @click.prevent="getBool">
        changePWD
      </button>
        <div v-if="store.getters.getBool">
          <input type="text" name="code" autocomplete="off"
          placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
          <button type="submit">
            submit
          </button>
        </div>
    </form>
    <button @click="deleteChan()">
      deleteChan
    </button>
</template>

<style scoped lang="scss">

</style>