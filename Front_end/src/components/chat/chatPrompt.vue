<script setup lang="ts">
    import { useStore } from "vuex"
    import { ref } from 'vue';

    const store = useStore();
    const socket = store.getters.getWebSocket;
    const newMessage = ref('');

    const sendMessage = () => {
      if (store.getters.getUserContext.muted){
        alert("YOU ARE MUTED")
        return ;
      }
      if (socket){
        socket.emit('chat', newMessage.value, `${store.getters.getChanContext.chanel_chat_id}`);
        newMessage.value = '';
      }
      else{
        store.dispatch('initWebSocket');
      }
    }
</script>

<template>
    <form id="prompt" @submit.prevent="sendMessage">
        <input v-model="newMessage" placeholder="Votre message">
        <button type="submit">Envoyer</button>
    </form>
</template>

<style scoped lang="scss">
#prompt{
  display: flex;
  padding-right: 11px;
  height: 37px;
}
#prompt input{
  flex: 1;
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color:#0e0f0f ;
  border: 1px solid #ccc;
  color: #fff;
}

#prompt button {
  color: #fff;
  border-radius: 5px;
  width: auto;
  background-color: #007bff;
  border: none;
  cursor: pointer;
}
</style>