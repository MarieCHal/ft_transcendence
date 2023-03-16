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
            store.commit('setChans', response.data);
        } catch (error: any) {
            if (error.response.status != 200)
            {
            msgError = error.response.data.message ;
            store.commit('setStatusCode', true);
            }
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

    const  clickChan = async (chan: any) =>{
        try {
            const headers = {"Authorization": `Bearer ${Cookies.get('auth_token')}`};
            const response = await axios.get(`http://c1r2s3:3000/chat/join/${chan.chanel_chat_id}`, {headers});//faire requete get pour recuperer info (isProtected, if banned, is mute)
            store.commit('setChanContext', chan);
            store.commit('setUserContext', response.data);
            console.log('user context = ', response.data);
            const UserContext = store.getters.getUserContext;
            if (UserContext.banned){
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
            
        }
    }

    const quitChan = async (chan :any) =>{
        const headers = {"Authorization": `Bearer ${Cookies.get('auth_token')}`};
        const data = {
            chanelId: chan.chanel_chat_id,
        }
        const response = await axios.post(`http://c1r2s3:3000/chat/quit`, data, {headers});
    }

    function createMsg(){
        router.push('/CreateChan');//a faire
    }

    function createPrivMsg(){
        router.push('/Users');//a faire
    }

    function getStatusCode(){
    return store.getters.getStatusCode;

  }
</script>

<template>
    <div class="main-dashboard">
        <h1>CHANNEL</h1>
        <div class="create-msg">
            <button class="create-msg-button" @click="createMsg()">
                +
            </button>
        </div>
        <div class="liste-chan-pub" v-for="(chanPublicJoined, index) in getChansJoined()" :key="index">
            <button @click="clickChan(chanPublicJoined)">
                {{ chanPublicJoined.chanel_name }}
            </button>
            <button id="quitchan" @click="quitChan(chanPublicJoined)">
                -
            </button>
        </div>
        <h1>other chanel</h1>
        <div class="liste-chan-pub" v-for="(chanPublicNotJoined, index) in getChansPublic()" :key="index">
            <button @click="clickChan(chanPublicNotJoined)">
                {{ chanPublicNotJoined.chanel_name }}
            </button>
        </div>
        <h1>PrivMsg</h1>
        <div class="create-msg">
            <button class="create-msg-button" @click="createPrivMsg()">
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

#quitchan{
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    overflow: auto;
}
.main-dashboard{
    display: flex;
    flex-direction: column;
    background-color: aqua;
    color: black;
}
</style>