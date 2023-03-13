<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import axios from 'axios'
    import Cookies from 'js-cookie';
    
    const router = useRouter();
    const store = useStore();
    let doubleAuthStore = store.getters.getDoubleAuth
    const doubleAuth = async () => {
        if(doubleAuthStore == true){
            doubleAuthStore = false;
        }
        else{
            doubleAuthStore = true
        }
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const data = {doubleAuth: doubleAuthStore};
        const response = await axios.post('http://c1r2s3:3000/users/doubleAuth', data, {headers})
        .then(response => {
            console.log('Demande de doubleAuth envoyée avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la demande de doubleAuth ', error);
        });
    }
</script>

<template>
    <div>
        <button @click="doubleAuth()">
            doubleAuth
        </button>
        <div v-if="doubleAuthStore == true">
            cliquer pour desactiver
        </div>
        <div v-else>
            cliquer pour activer
        </div>
    </div>
</template>

<style scoped lang="scss">
    button{
        background-color: rgb(28, 248, 101);
    }
</style>