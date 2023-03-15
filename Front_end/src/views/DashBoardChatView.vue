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
            console.log('axios/chat/all = ', response.data);
            store.commit('setChans', response.data);
        } catch (error: any) {
            if (error.response.status != 200)
            {
            msgError = error.response.data.message ;
            store.commit('setStatusCode', true);
            }
        }
    }

    const  clickChan = async (chan: any) =>{
        try {
            const headers = {"Authorization": `Bearer ${Cookies.get('auth_token')}`};
            const response = await axios.get(`http://c1r2s3:3000/chat/join/${chan.chanel_chat_id}`, {headers});//faire requete get pour recuperer info (isProtected, if banned, is mute)
            console.log('axios/chat/join = ', response.data);//autorisation de l'utilisateur(si bloquer, si mute, si owner, si admin)
            store.commit('setChanContext', chan);
            store.commit('setUserContext', response.data);
            const userContext = store.getters.getUserContext;
            if (userContext.banned){
                alert("YOU ARE BANNED");
                return ;
            }
            if(chan.chanel_isProtected){
                router.push('/codeChat')
            }
            else{
                router.push("/chat");
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    function getChansPublic(){
        const chansPublic = store.getters.getChans;
        if (chansPublic && chansPublic.chanels){
            return chansPublic.chanels;
        }
        else{
            return [];
        }
    }

    function getChansJoined(){
        const chansPublicJoined = store.getters.getChans;
        if (chansPublicJoined && chansPublicJoined.chanels){
            return chansPublicJoined.Mychanels;
        }
        else{
            return [];
        }
    }
    
    function getChansPrivate(){
        const chansPrivate = store.getters.getChans;
        if (chansPrivate && chansPrivate.privMsg){
            return chansPrivate.privMsg;
        }
        else{
            return [];
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
        <h1>Channel</h1>
        <div class="create-chan">
            <button class="create-chan-button" @click="createChan()">
                +
            </button>
        </div>
        <h3>myChannel</h3>
        <div class="liste-chan-pub" v-for="(chanPublicJoined, index) in getChansJoined()" :key="index">
            sasa
            <button @click="clickChan(chanPublicJoined)">
                {{ chanPublicJoined.chanel_name }}
            </button>
        </div>
        <h3>other channel</h3>
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
                {{ chanPrivate.users_nickname }}
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