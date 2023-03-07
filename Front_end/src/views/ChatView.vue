<template>
    <div>
      <h1>Chat en temps réel</h1>
      <div>
        <ul>
          <li v-for="message in messages">{{ message }}</li>
        </ul>
        <form @submit.prevent="sendMessage">
          <input v-model="newMessage">
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  </template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useStore } from "vuex"

    const store = useStore();
    const messages = ref([]);
    const newMessage = ref('');
    const socket = store.getters.getWebSocket;
    console.log('coucou ', socket);
    onMounted(() => {
        socket.on('chat message', (message: any) => {
            message.push(message);
        });
    });

    const sendMessage = () => {
        socket.emit('chat message', newMessage.value);
        newMessage.value = '';
    }

</script>

<style scoped lang="scss">

</style>