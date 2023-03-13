<script setup lang="ts">
    import { useStore } from "vuex"
    import axios from 'axios'
    import Cookies from 'js-cookie';

    const store = useStore();
    
    const removeCapsule = (pending: any) => {
        const capsule = document.getElementById(`capsule-${pending.id}`);
        if (capsule) {
            capsule.remove();
        }
    }
    const friendsValidate = async (userId: number, decision: boolean) => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const data = {
            id: userId,
            decision: decision
        };
        const response = await axios.post('http://c1r2s3:3000/users/friend-accept', data, {headers})
        .then(response => {
            console.log('Demande d\'amis acceptee avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la acceptation d\'amis', error);
        });
    }

    function getMyFriends(){
        const me = store.getters.getItIsMe;
        if (me && me.pending) {
            return me.pending;
        }
        else {
            return [];
        }
    }
</script>

<template>
    <div v-for="(pending, index) in getMyFriends()" :key="index" :id="`capsule-${pending.id}`">
        <div>
            {{ pending.friend_one.nickname}} vous demande en amis<!--trouver le tableau de friends-request?-->
        </div>
        <button @click="friendsValidate(pending.friend_one.user_id, true); removeCapsule(pending)">
            oui je le veux
        </button>
        <button @click="friendsValidate(pending.friend_one.user_id, false); removeCapsule(pending)">
            non je ne le veux pas
        </button>
    </div>
</template>

<style scoped lang="scss">
    
</style>