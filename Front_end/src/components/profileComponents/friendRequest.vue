<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import axios from 'axios'

    const router = useRouter();
    const store = useStore();

    function getMe(){//getMyFriends?
        return store.getters.getItIsMe;// trouver le tableau de friends-request?
    }

    const yesMyFriends = async (userId: any) => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = {id: userId};
        const response = await axios.post('http://c1r2s3:3000/users/friend-request/accept', data, {headers})
        .then(response => {
            console.log('Demande d\'amis acceptee avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la acceptation d\'amis', error);
        });
    }

    const noMyFriends = async (userId: any) => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = {id: userId};
        const response = await axios.post('http://c1r2s3:3000/users/friend-request/refuse', data, {headers})
        .then(response => {
            console.log('Demande d\'amis refusee avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du refus d\'amis', error);
        });
    }
</script>

<template>
    <div id="capsule" v-for="(me, index) in getMe()" :key="index">
        <div>
            {{ me.friend-request.nickname }} vous demande en amis<!--trouver le tableau de friends-request?-->
        </div>
        <button @click="yesMyFriends(me.user_id)">
            oui je le veux
        </button>
        <button @click="noMyFriends(me.user_id)">
            non je ne le veux pas
        </button>
    </div>
</template>

<style scoped lang="scss">
    
</style>