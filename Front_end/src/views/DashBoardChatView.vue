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
            store.commit('setChans', response.data)
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

    function getChansPrivate(){
        const chansPrivate = store.getters.getChans;
        if (chansPrivate && chansPrivate.privMsg){
            return chansPrivate.privMsg;
        }
        else{
            return [];
        }
    }

    function clickChan(chan: any){
        store.commit('setChanContext', chan);
        //faire requete get pour recuperer info (isProtected, if banned, is mute)
        console.log(chan);
        if(chan.chanel_isProtected){
            router.push('/codeChat')
        }
        else{
            router.push("/chat");
        }
    }

    function createMsg(){
        router.push('/createMsg');//a faire
    }

    function getStatusCode(){
    return store.getters.getStatusCode;
  }
</script>

<template>
    <div class="main-dashboard">
        <div class="create-msg">
            <button class="create-msg-button" @click="createMsg()">
                +
            </button>
        </div>
        <div class="liste-chan-pub" v-for="(chanPublic, index) in getChansPublic()" :key="index">
            <button @click="clickChan(chanPublic)">
                {{ chanPublic.chanel_name }}
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