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
        console.log("token =", store.getters.getToken);
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
    <div class="display">
        <div class="button">
            <div class="card_button">
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
        </div>
        <div class="channel">
            <div class="card">
                <div class="dashboard__section">
                    <h1>My channel</h1>
                <div v-for="(chanPublicJoined, index) in store.getters.getChans.Mychanels" :key="index">
                    <button class="quitchan" @click="clickChan(chanPublicJoined)">
                        {{ chanPublicJoined.chanel_name }}
                    </button>
                    <button class="chatButton" @click="quitChan(chanPublicJoined)">
                        quit room
                    </button>
                </div>
            </div>
            </div>
            <div class="card">
                <h1>Other channel</h1>
                <div v-for="(chanPublicNotJoined, index) in store.getters.getChans.chanels" :key="index">
                    <button class="quitchan" @click="clickChan(chanPublicNotJoined)">
                        {{ chanPublicNotJoined.chanel_name }}
                    </button>
                    <formChanCode v-if="store.getters.getUserContext.pwd == true && store.getters.getChanId == chanPublicNotJoined.chanel_chat_id" />
                </div>
            </div>
            <div class="card">
                <h1>PrivMsg</h1>
                <div v-for="(chanPrivate, index) in store.getters.getChans.privMsg" :key="index">
                    <button class="navButton" @click="clickChan(chanPrivate)">
                        {{ chanPrivate.users_nickname }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.display{
    flex-direction: column;
}
.button{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 200px;
}
.channel{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 120px;
    min-width: 300px;
}
.card_button{
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 20px;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 150px;
    max-height: 450px;
}
.card_button:hover {
    opacity: 1;
}
.card {
    margin: 4%;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 20px;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    max-width: 200px;
    max-height: 350px;
    overflow: auto;
    scrollbar-width: none;
    text-align: center;
}
.card:hover {
    opacity: 1;
}
.card::-webkit-scrollbar {
  display: none;
}

h1{
    color: rgb(94, 95, 95);
}

.chatButton{
    margin: 10px;
	border: none;
    max-width: 100px;
	color: rgb(122, 122, 122);
	background: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
	cursor: pointer;
}

.chatButton:hover {
	color: #e6e6e6;
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
    color: black;
}

.dashboard {
    &__section {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;

        &--column {
            flex-direction: column;
            align-items: center;
        }
    }
}

@media screen and (max-width: 700px) {
    .display {
    flex-direction: row;
    margin-top: 80%;
}
.channel {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    min-width: 300px;
}
.card {
    min-height: 120px;
    min-width: 300px;
    margin: 1%;
    }
}
</style>