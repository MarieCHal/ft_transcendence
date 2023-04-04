<script setup lang="ts">
    import formChanCode from "@/components/form/formChanCode.vue"
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    
    const router = useRouter();
    const store = useStore();
    
    onMounted(() => {
        getDashboard();
    });
    
    const getDashboard = async () => {
        try {
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const response1 = await axios.get("/users/all", {headers});
            store.commit('setAllUsers', response1.data);
            const response = await axios.get('/chat/all', {headers});
            console.log('chan', response.data)
            store.commit('setChans', response.data);
            store.commit('setChanId', 0);
        } catch (error: any) {
            console.log(error)
        }
    }

    const  clickChan = async (chan: any) =>{
        try {
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const response = await axios.get(`/chat/join/${chan.chanel_chat_id}`, {headers});
            store.commit('setChanContext', chan);
            store.commit('setUserContext', response.data);
            console.log("usercontext =", store.getters.getUserContext);
            const UserContext = store.getters.getUserContext;
            if (UserContext.banned){
                alert("YOU ARE BANNED");
                return ;
            }
            if(UserContext.pwd == true){
                store.commit('setChanId', chan.chanel_chat_id);
            }
            else{
                router.push("/chat");
            }
        } catch (error: any) {
            console.log(error)
            
        }
    }
    
    const quitChan = async (chan :any) =>{
        try {            
            const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
            const data = {
                chanelId: chan.chanel_chat_id,
            }
            const response = await axios.post(`/chat/quit`, data, {headers});
            //store.commit('setUserContext', response.data.owner)
            store.commit('setChans', response.data);
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    function createChan(){
        router.push('/CreateChan');
    }

    function createPrivChan(){
        router.push('CreatePrivChan')
    }
    
    function createPrivMsg(){
        router.push('/users');
    }
</script>

<template>
    <div id="main-dashboard" class="dashboard">
        <div class="dashboard__section dashboard__section--column">
                <button class="chatButton" @click="createChan()">
                    create room
                </button>
                <button class="chatButton" @click="createPrivChan()">
                    creat private room
                </button>
                <button class="chatButton chatButton--create" @click="createPrivMsg()">
                    creat private message
                </button>
        </div>
        <div class="dashboard__section">
            <div class="display">
                <h1>My channel</h1>
                <div class="create-Chan"></div>
                <div class="liste-chan-pub" v-for="(chanPublicJoined, index) in store.getters.getChans.Mychanels" :key="index">
                    <button class="quitchan" @click="clickChan(chanPublicJoined)">
                        {{ chanPublicJoined.chanel_name }}
                    </button>
                    <button class="chatButton" @click="quitChan(chanPublicJoined)">
                        quit room
                    </button>
                </div>
            </div>
            <div class="display">
                <h1>Other channel</h1>
                <div class="liste-chan-pub" v-for="(chanPublicNotJoined, index) in store.getters.getChans.chanels" :key="index">
                    <button class="quitchan" @click="clickChan(chanPublicNotJoined)">
                        {{ chanPublicNotJoined.chanel_name }}
                    </button>
                    <formChanCode v-if="store.getters.getUserContext.pwd == true && store.getters.getChanId == chanPublicNotJoined.chanel_chat_id" />
                </div>
            </div>
            <div class="display">
                <h1>PrivMsg</h1>
            </div>
            <div class="liste-privMsg" v-for="(chanPrivate, index) in store.getters.getChans.privMsg" :key="index">
                <button class="navButton" @click="clickChan(chanPrivate)">
                    {{ chanPrivate.users_nickname }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.display{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2%;
}

h1{
    color: rgb(94, 95, 95);
}

.chatButton{
    margin: 10px;
	border: none;
    border-right: 2px dotted red;
    max-width: 100px;
	border-radius: 10px;
	color: rgb(122, 122, 122);
	background: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
	cursor: pointer;

}

#plus{
    margin: 5px;
    border-radius: 9px;
}

.quitchan{
    padding: 4px 8px;
    margin: 5px;
    width: auto;
    border-radius: 5px;
    background-color: #02d1ff29;
    color: #fff;
    border: none;
    cursor: pointer;
}
#main-dashboard{
    display: flex;
    flex-direction: column;
    margin: 10vh;
    color: black;
}

.dashboard {
    &__section {
        display: flex;
        justify-content: center;
        align-content: center;

        &--column {
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>