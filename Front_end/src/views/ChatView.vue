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
        console.log("componentKey Muted =",  componentKey.value)

        const chatHistory = await axios.get(`/chat/history/${store.getters.getChanContext.chanel_chat_id}`,  {headers});
        store.commit("setChatHistory", chatHistory.data.history);

        socket.on('join', (message: any) => {
            chatMessages.value.push(message);
        });
        socket.emit('join', `${store.getters.getChanContext.chanel_chat_id}`, true);
        socket.on('chat', (message: any) => {
          //  console.log('message = ', message);
          //  console.log('userBlocked = ', store.getters.userBlocked);
          /*for (let index = 0; index < store.getters.userBlocked.length; index++) {  
            if (store.getters.userBlocked[index] == message.sender_user_id){
              
            }  
          }*/
          //console.log("userBlocked: ", userBlocked)
          //console.log("sender id: ", message.sender_user_id)
          //console.log("user blocked length: ", userBlocked.length)
          let i = 0
            for (i ; i < userBlocked.length;)
            {
              //console.log('userBlocked id: ', userBlocked[i].blocked_user_id)
              if (userBlocked[i].blocked_user_id != message.sender_user_id)
                i++;
              else
                break;
            }
            if (i == userBlocked.length)
                chatMessages.value.push(message);
        });

        socket.on('notifChat', async (msg: string)  => {
          //console.log("msg =", msg)
          if (msg == 'users'){
            console.log("je suis la dans users")
            const response = await axios.get(`/chat/users/${store.getters.getChanContext.chanel_chat_id}`, {headers});
            store.commit('setWhat', 'UsersInChan');
            store.commit("setUsers", response.data.users);
            
            forceRender();
          }
          else if (msg == 'userContext'){
            console.log("je suis la dans userContext")
            const response1 = await axios.get(`/chat/update/${store.getters.getChanContext.chanel_chat_id}`, {headers});

           // console.log("response =", response1.data);
            store.commit('setUserContext', response1.data.userContext);
            //console.log("setusercontexxt =", store.getters.getUserContext)
            store.commit('setWhat', 'UsersInChan');
            store.commit("setUsers", response1.data.users);
            if (response1.data.isKicked == true || response1.data.userContext.banned == true){
           ////   socket.off('join');
            ///  socket.off('chat');
             //////// socket.off('notifChat')
              alert("YOU ARE A NOOB");
              router.push('dashBoardChat')
              return ;
            }
            forceRender();
            /*
            else if(store.getters.getUserContext.kick){
              alert("YOU ARE KICK");
              router.push('dashBoardChat')
            }
            else if(store.getters.getUserContext.admin){

            }
            else if(store.getters.getUserContext.ower){

            }*/
          }
          
        })
    });

    onUnmounted(async () => {
      socket.emit('join', `${store.getters.getChanContext.chanel_chat_id}`, false);
      socket.off('join');
      socket.off('chat');
      socket.off('notifChat')
      store.commit('setUserContext', []);
    });

    const forceRender = () => {
      componentKey.value += 1;
    }

//v-if="store.getters.getWhat === 'UsersInChan'"
</script>

<template>
  <div>
    <h1> users </h1>
    <div>
      <oneUserButton :key="componentKey" v-if="store.getters.getWhat === 'UsersInChan'"/>
    </div>
  </div>
  <div v-if="store.getters.getUserContext.owner">
    <formChangePwdChat />
  </div>
    <h1> {{ store.getters.getChanContext.chanel_name}} </h1>
    <div class="chat-container">
      <div class="chat-history">
        <chatHistory />
      </div>
      <div class="chat-currentMsg" v-for="(msg, index) in chatMessages" :key="index">
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
      <div id="prompt-container">
        <chatPrompt />
      </div>
    </div>
</template>

<style scoped lang="scss">
.chat-container {
  position: fixed;
  max-width: 500px;
  margin: 40px;
  bottom: 0;
  //width: 50%;
  height: 50%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  overflow: auto;
}

.chat-messages {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    overflow: auto;
}
.chat-myMsg{
    background-color: brown;
}
.chat-hisMsg{
    background-color: rgb(232, 160, 15);
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
    word-wrap: break-word;
    overflow: hidden;
    background-color: darkkhaki;
}
#date{
    height: 0.7rem;
    width: 2.5rem;
    background-color: darkcyan;
    font-size: x-small;
    color: rgb(150, 147, 147);
}

#prompt-container {
  position: absolute;
  bottom: 0;
  left: 0;
  //width: auto;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  //display: flex;
  //justify-content: center;
  //align-items: center;
}


</style>