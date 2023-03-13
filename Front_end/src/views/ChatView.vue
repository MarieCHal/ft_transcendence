<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex"

    const store = useStore();
    const chatMessages = ref<string[]>([]);
    const newMessage = ref('');
    const socket = store.getters.getWebSocket;
    onMounted(() => {
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