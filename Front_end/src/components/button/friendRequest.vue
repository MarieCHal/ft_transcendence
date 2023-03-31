<script setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;

    const friendRequest = async () => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = {id: user.user_user_id};
        const response = await axios.post('/users/friend-request', data, {headers})
        .then(response => {
            alert(response.data)
            console.log('Demande d\'amis envoyée avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la demande d\'amis', error);
        });
    }
</script>

<template>
    <button class="navButton" @click="friendRequest()">
        Friends request
    </button>
</template>

<style scoped lang="scss">

</style>