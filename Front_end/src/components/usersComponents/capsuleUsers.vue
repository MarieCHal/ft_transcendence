<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import invitFriends from '@/components/usersComponents/invitFriends.vue';
    import invitPlay from '@/components/usersComponents/invitPlay.vue';
    import sendMsg from '@/components/usersComponents/sendMsg.vue'
    import pong from "@/components/playComponents/pong.vue"

    const router = useRouter();
    const store = useStore();
    store.commit("setBool", false)
    const socket = store.getters.getWebSocket;

    function getUsers(){
        let allUser = store.getters.getUsers;
    return allUser.allUsers
    }

    const sendFriendRequest = async (userId: any) => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const data = {id: userId};
        const response = await axios.post('http://c1r2s3:3000/users/friend-request', data, {headers})
        .then(response => {
            console.log('Demande d\'amis envoyée avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la demande d\'amis', error);
        });
    }

    const InvitePlay = async(user: any) =>{
        store.commit("setBool", true)
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const data = {otherId: user.user_user_id}
        const response = await axios.post('http://c1r2s3:3000/users/invitePlay', data, {headers})
        //socket.emit("notif", user.user_user_id, store.getters.getInvitePlay)
    }

    const SendMsg = async(user: any) =>{
        try{
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            const data = {private: true, name: "", otherId: user.user_user_id}
            const response = await axios.post('http://c1r2s3:3000/chat/create', data,  {headers})
            store.commit("setChanContext", user);
            router.push('/chat');
        }catch{
            console.log("Erreur chatUsers")
        }
        // avant de commit il faut faire une requete 
    }
</script>

<template>
    ALL
        <div id="capsule" v-for="(user, index) in getUsers()" :key="index">
            <div class="dataUser">
                <div class="nicknameStatus">
                    <div class="status-indicator" :class="{ 'status-online': user.user_isActive, 'status-offline': !user.users_isActive }"></div>
                    <div id="nickname">
                        {{ user.user_nickname }}
                    </div>
                </div>
                <div class="elementCaps">
                    <div id="nbParties">
                        nb parties: {{ user.nbParties }}
                    </div>
                    <div id="nbVictory">
                        nb victory: {{ user.nbVictory }}
                    </div>
                    <div id="nbDefeat">
                        nb defeat: {{ user.nbDefeat }}
                    </div>
                </div>
            </div>
            <div class="buttonUser">
                <sendMsg @click="SendMsg(user)"/>
                <invitPlay @click="InvitePlay(user.user_user_id)"/>
                <div v-if="store.getters.getBool">
                    <pong />
                </div>
                <invitFriends @click="sendFriendRequest(user.user_user_id)"/>
            </div>
        </div>
</template>

<style scoped lang="scss">

#capsule{
    width: 15em;
    max-height: 5em;
    margin: 30px;
    //background-color: aquamarine;
}
#nickname{
    padding-left: 10px;
}
.dataUser{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: aqua;
}
.buttonUser{
    display: flex;
    justify-content: flex-end;
    //margin-left: 10px;
    color: lightgrey;
    //background-color: burlywood;
}
.elementCaps{
    margin: 5px;
    align-items: center;
  }
.nicknameStatus{
    display: flex;
    padding-left: 5px;
}
.status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: auto;
}

.status-online {
    background-color: green;
}

.status-offline {
    background-color: red;
}
</style>

function getUsers(){
    let allUser = store.getters.getUsers;
    return allUser.allUsers
}