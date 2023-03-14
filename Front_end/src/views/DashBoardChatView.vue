<script setup lang="ts">
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();
    let codeChan = '';
    let msgError = '';

    onMounted(() => {
        getDashboard();
    });

    const getDashboard = async () => {
        try {
            const headers = {"Authorization": `Bearer ${Cookies.get('auth_token')}`};
            const response = await axios.get('http://c1r2s3:3000/chat/all', {headers});//recuperation des channel
            store.commit('setChansPublic', response.data.chanels);
            store.commit('setChansPrivate', response.data.privMsg);
        } catch (error: any) {
            if (error.response.status != 200)
            {
            msgError = error.response.data.message ;
            store.commit('setStatusCode', true);
            }
        }
    }

    function getChansPublic(){
        const chansPublic = store.getters.getChansPublic;
        if (chansPublic){
            return chansPublic;
        }
        else{
            return [];
        }
    }

    function getChansPrivate(){
        const chansPrivate = store.getters.getChansPrivate;
        if (chansPrivate){
            return chansPrivate;
        }
        else{
            return [];
        }
    }

    const  clickChan = async (chan: any) =>{
        try {
            const headers = {"Authorization": `Bearer ${Cookies.get('auth_token')}`};
            const response = await axios.get(`http://c1r2s3:3000/chat/join/${chan.chanel_chat_id}`, {headers});//faire requete get pour recuperer info (isProtected, if banned, is mute)
            store.commit('setChanContext', chan);
            
            if(chan.chanel_isProtected){
                router.push('/codeChat')
            }
            else{
                router.push("/chat");
            }
        } catch (error: any) {
            
        }
    }

    function createChan(){
        router.push('/createChan');
    }

    function createPrivMsg(){
        router.push('/Users');
    }

    function getStatusCode(){
    return store.getters.getStatusCode;
  }
</script>

<template>
    <div class="main-dashboard">
        <h1>CHANNEL</h1>
        <div class="create-chan">
            <button class="create-chan-button" @click="createChan()">
                +
            </button>
        </div>
        <div class="liste-chan-pub" v-for="(chanPublic, index) in getChansPublic()" :key="index">
            <button @click="clickChan(chanPublic)">
                {{ chanPublic.chanel_name }}
            </button>
        </div>
        <h1>PrivMsg</h1>
        <div class="create-chan">
            <button class="create-chan-button" @click="createPrivMsg()">
                +
            </button>
        </div>
        <div class="liste-privMsg" v-for="(chanPrivate, index) in getChansPrivate()" :key="index">
            <button @click="clickChan(chanPrivate)">
                {{ chanPrivate.chanel_name }}
            </button>
        </div>
        <div id="statuscode" v-if="getStatusCode()">
            <p> {{ msgError }} </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.liste-chan-pub{

}
.liste-privMsg{

}
.main-dashboard{
    display: flex;
    flex-direction: column;
    background-color: aqua;
    color: black;
}
</style>