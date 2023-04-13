<script setup lang="ts">
    import oneUserButton from "../components/button/oneUserButton.vue"
    import formChangePwdChat from '../components/form/formChangePwdChat.vue'
    import chatPrompt from "@/components/chat/chatPrompt.vue";
    import chatHistory from "@/components/chat/chatHistory.vue"
    import { onMounted, ref, onUnmounted } from 'vue';
    import { useStore } from "vuex"
    import axios from 'axios';
import router from "@/router";

    const store = useStore();
    const chatMessages = ref<any[]>([]);
    const socket = store.getters.getWebSocket;
    const componentKey = ref(0);
    const userBlocked = store.getters.getUserBlocked;
    store.commit("setBool", false)

    onMounted(async () => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}`};
        const response = await axios.get(`/chat/users/${store.getters.getChanContext.chanel_chat_id}`, {headers});
        store.commit('setWhat', 'UsersInChan');
        store.commit("setUsers", response.data.users);
        
        const chatHistory = await axios.get(`/chat/history/${store.getters.getChanContext.chanel_chat_id}`,  {headers});
        store.commit("setChatHistory", chatHistory.data.history);
        
        console.log("owner",  store.getters.getUserContext.owner)

        socket.on('join', (message: any) => {
            chatMessages.value.push(message);
        });
        socket.emit('join', `${store.getters.getChanContext.chanel_chat_id}`, true);
        socket.on('chat', (message: any) => {
          let i = 0
            for (i ; i < userBlocked.length;)
            {
              if (userBlocked[i].blocked_user_id != message.sender_user_id)
                i++;
              else
                break;
            }
            if (i == userBlocked.length)
                chatMessages.value.push(message);
        });
        socket.on('notifChat', async (msg: string)  => {
          if (msg == 'users'){
            const response = await axios.get(`/chat/users/${store.getters.getChanContext.chanel_chat_id}`, {headers});
            store.commit('setWhat', 'UsersInChan');
            store.commit("setUsers", response.data.users);
            forceRender();
          }
          else if (msg == 'userContext'){
            const response1 = await axios.get(`/chat/update/${store.getters.getChanContext.chanel_chat_id}`, {headers});
            store.commit('setUserContext', response1.data.userContext);
            store.commit('setWhat', 'UsersInChan');
            store.commit("setUsers", response1.data.users);
            if (response1.data.isKicked == true || response1.data.userContext.banned == true){
              alert("YOU ARE A NOOB");
              router.push('dashBoardChat')
              return ;
            }
            forceRender();
          }
          
        })
    });

    onUnmounted(async () => {
      socket.emit('join', `${store.getters.getChanContext.chanel_chat_id}`, false);
      socket.off('join');
      socket.off('chat');
      socket.off('notifChat')
      //store.commit('setUserContext', []);
    });

    const forceRender = () => {
      componentKey.value += 1;
    }
//v-if="store.getters.getUserContext.owner"
</script>

<template>
  <div class="chatView">
    <div class="title">
      <div class="tilte-tilte">
        <h1> {{ store.getters.getChanContext.chanel_name}} </h1>
        <formChangePwdChat v-if="store.getters.getUserContext.owner"/>
      </div>
      <div class="userButton">
        <oneUserButton :key="componentKey" v-if="store.getters.getWhat === 'UsersInChan'"/>
      </div>
    </div>
  
    <div class="chat-container">
      <div class="chat-history">
        <chatHistory />
        <div class="msg" v-for="(msg, index) in chatMessages" :key="index">
          <div v-if="typeof msg === 'object' && msg.messages_text" class="chat-messages" :class="{ 'chat-myMsg': msg.sender_user_id === store.getters.getId, 'chat-hisMsg': msg.sender_user_id != store.getters.getId}">
            <div id="name">
              {{ msg.sender_nickname }}
            </div>
            <div id="corp">
              <div id="msg">
                {{ msg.messages_text }}
              </div>
              <div id="date">
                {{ msg.messages_createdAtTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="prompt-container">
        <chatPrompt />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chatView{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chat-history{
  margin-top: auto;
  overflow: auto;
  scroll-behavior: reverse;
  max-height: 500px;
}
.chat-history::-webkit-scrollbar{
  display: none;
}
.chat-container {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: rgba(123, 211, 211, 0.098);
  box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
  border-radius: 10px;
  overflow-y: auto;
  height: 500px;
  max-height: 500px;
  min-width: 360px;
  max-width: 400px;
}
.chat-container:hover {
  opacity: 1;
}

#prompt-container {
  border-top: 1px solid rgba(79, 200, 209, 0.94);
  padding-top: 5px;
  min-height: 3rem;
}
.chat-messages {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  margin: 2px;
  height: 3rem;
}
.chat-myMsg{
  width: auto;
  max-width: 360px;
  float: right;
}
.chat-hisMsg{
  width: auto;
  max-width: 360px;
  float: left;
}
#name{
  text-decoration: underline;
  font-size:smaller;
  color: rgb(225, 117, 22);
}
#corp{
  display: flex;
  flex-direction: row;
  margin-top: 0.3rem;
}
#msg{
  width: auto;
  max-width: 360px;
  word-wrap: break-word;
  overflow: hidden;

}
#date{
  height: 0.7rem;
  width: 2.5rem;
  font-size: x-small;
  color: rgb(150, 147, 147);
}

@media screen and (max-width: 500px) {
  .chat-container {
    height: 350px;
    max-height: 500px;
    min-width: 350px;
    max-width: 350px;
  }
}
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.tilte-tilte{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: auto;
}
.userButton{
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-width: 11rem;
  height: 8rem;
}
h1{
  font-size: xx-large;
  min-height: 2rem;
}
.userButton::-webkit-scrollbar{
  display: none;
}

</style>