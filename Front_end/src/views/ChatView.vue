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
    let bool = ref(false);
    const userBlocked = store.getters.getUserBlocked;
    store.commit("setBool", false)
    const chatContainerRef = ref<HTMLElement | null>(null);

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
          let i = 0
            for (i ; i < userBlocked.length;)
            {
              if (userBlocked[i].blocked_user_id != message.sender_user_id)
                i++;
              else
                break;
            }
            if (i == userBlocked.length){
              chatMessages.value.push(message);
            }
        });

        socket.on('notifChat', async (msg: string)  => {
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
      store.commit('setUserContext', []);
    });

    const forceRender = () => {
      componentKey.value += 1;
    }

//v-if="store.getters.getWhat === 'UsersInChan'"
/*<button class="boubou" @click="ShowUsers()">
  <div v-if="store.getters.getBool">
      <oneUserButton :key="componentKey" v-if="store.getters.getWhat === 'UsersInChan'"/>
  </div>
  </button>*/
</script>

<template>
  <div class="chat">
    <div class="button">
      <div class="SeaUsers">
        <h1> users </h1>
        <oneUserButton :key="componentKey" v-if="store.getters.getWhat === 'UsersInChan'"/>
      </div>
      <h1> channel {{ store.getters.getChanContext.chanel_name}} </h1>
      <div v-if="store.getters.getUserContext.owner">
        <formChangePwdChat />
      </div>
      </div>
      <div>
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
        </div>
        <div id="prompt-container">
          <chatPrompt />
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.SeaUsers{
  overflow: auto;
  max-height: 100px;
}
.SeaUsers::-webkit-scrollbar{
  display: none;
}

.chat{
  display: flex;
  flex-direction: column;
}
.button{
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.chat-container {
  margin: 3% auto; 
  align-items: center;
  justify-content: center;
  background-color: rgba(123, 211, 211, 0.098);
  box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
  bottom: -65px;
  padding: 2%;
  height: 400px;
  border-radius: 10px;
  transition: opacity 0.2s ease-in-out;
  opacity: 0.8;
  width: 30%;
  max-width: 450px;
  min-width: 350px;
  max-height: 400px;
  overflow: auto;
}
.chat-container:hover {
    opacity: 1;
}
.chat-container::-webkit-scrollbar{
  display: none;
}

.chat-messages {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    width: 60%;
    margin: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    overflow: auto;
}

#name{
    font-size:smaller;
    color: darkcyan;
}
#corp{
    display: flex;
    flex-direction: row;
    margin-top: 0.3rem;
}
#msg{
    word-wrap: break-word;
    overflow: hidden;
}
#date{
    height: 0.7rem;
    width: 2.5rem;
    background-color: darkcyan;
    font-size: x-small;
    color: rgb(150, 147, 147);
}

#prompt-container {
  position: relative;
  left: 50%; /* Déplace le bloc de 50% vers la droite */
  transform: translateX(-50%) translateY(-1%); /* Déplace le bloc de moitié de sa largeur vers la gauche et de 40 pixels vers le haut pour le centrer et le remonter */
  width: 300px;
  background-color: none;
  border-top: 1px solid #ccc;
}
@media screen and (max-width: 500px) {
    .chat-container {
      height: 300px;
      margin-top: 10px;
  }
}

</style>