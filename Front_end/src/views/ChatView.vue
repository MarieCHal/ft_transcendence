<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex"
    import Cookies from 'js-cookie';
    import axios from 'axios';

    const store = useStore();
    const chatMessages = ref<string[]>([]);
    const newMessage = ref('');
    const socket = store.getters.getWebSocket;
    const chanContext = store.getters.getChanContext;
    const userContext = store.getters.getUserContext;

    onMounted(async () => {
      //const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}`};
      //const response = await axios.get(`http://c1r2s3:3000/chat/history/${chan.chanel_chat_id}`, {headers});
      socket.on('chat', (message: string) => {
          chatMessages.value.push(message);
      });
    });

    const sendMessage = () => {
      //if (userContext.muted){
      //  alert("YOU ARE MUTED")
       // return ;
      //}
      if (socket){
        socket.emit('chat' ,newMessage.value);
        newMessage.value = '';
      }
      else{
        store.dispatch('initWebSocket');
      }
    }
    function getUsers(){
        let allUser = store.getters.getUsers;
    return allUser.allUsers
}
</script>

<template>
  <div>
    <h1>users</h1>
    <div id="capsule" v-for="(user, index) in getUsers()" :key="index">
            <div class="dataUser">
                <div class="nicknameStatus">
                    <div class="status-indicator" :class="{ 'status-online': user.users_isActive, 'status-offline': !user.users_isActive }"></div>
                    <button id="nickname">
                        {{ user.users_nickname }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <h1>Chat en temps réel</h1>
    <div class="chat-container">
        <ul class="chat-messages" style="display: flex; flex-direction: column-reverse;">
          <li v-for="(message, index) in chatMessages.slice().reverse()" :key="index" style="display: flex; flex-direction: column-reverse;">{{ message }}</li>
        </ul>
        <div id="prompt-container">
          <form id="prompt" @submit.prevent="sendMessage">
            <input v-model="newMessage" placeholder="Votre message">
            <button type="submit">Envoyer</button>
          </form>
        </div>
    </div>
</template>

<style scoped lang="scss">

.chat-container {
  position: fixed;
  max-width: 500px;
  margin: 40px;
  bottom: 0;
  width: 50%;
  height: 50%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  overflow: auto;
}

.chat-messages {
  list-style: none;
  margin: auto;
  padding: 0;
  color: rgb(6, 1, 1);
  display: flex;
  flex-direction: column-reverse;
}

#prompt-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

#prompt input{
  flex: 1;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

#prompt button {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  overflow: auto;
}
</style>