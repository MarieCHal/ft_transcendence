<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex"
    import axios from 'axios'
    import Cookies from 'js-cookie';

    const store = useStore();
    const chatMessages = ref<string[]>([]);
    const newMessage = ref('');
    const socket = store.getters.getWebSocket;
    const chanContext = store.getters.getChanContext;
    const userContext = store.getters.getUserContext;
    console.log('chanContext dans chatView',chanContext);
    console.log('userContext dans chatView',userContext);
    onMounted(async () => {
      //const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
      //const response = await axios.get(`http://c1r2s3:3000/chat/history/${chan.chanel_chat_id}`, {headers});
      //const thisChatContext = response.data;
      if (socket){
        socket.on('chat', (message: string) => {
        chatMessages.value.push(message);
        });
      }
      else {
        store.dispatch('initWebSocket');
      }
    });

    const sendMessage = () => {
      if (socket){
        socket.emit('chat', newMessage.value);
        newMessage.value = '';
      }
      else{
        store.dispatch('initWebSocket');
      }
    }
</script>

<template>
  <div>
    <h1>Chat en temps réel</h1>
    <div>
      <ul>
        <li v-for="(message, index) in chatMessages" :key="index">{{ message }}</li>
      </ul>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage">
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>