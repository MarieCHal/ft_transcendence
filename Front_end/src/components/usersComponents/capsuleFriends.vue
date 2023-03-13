<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import Cookies from 'js-cookie';
    import axios from 'axios';
    import invitFriends from '@/components/usersComponents/invitFriends.vue';
    import invitPlay from '@/components/usersComponents/invitPlay.vue';
    import sendMsg from '@/components/usersComponents/sendMsg.vue'
    
    const router = useRouter();
    const store = useStore();

    function getMyFriends(){
        return store.getters.getMyFriends;
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

    const SendMsg = async(Myfriends: any) =>{
        store.commit("setChanContext", Myfriends)
        router.push('/chat')
        // avant de commit il faut faire une requete 
    }
</script>


<template>
    <div id="capsule" v-for="(Myfriends, index) in getMyFriends()" :key="index">
        FRIENDS
        <div class="dataUser">
            <div class="nicknameStatus">
                <div class="status-indicator" :class="{ 'status-online': Myfriends.user_isActive, 'status-offline': !Myfriends.user_isActive }"></div>
                <div id="nickname">
                    {{ Myfriends.user_nickname }}
                </div>
            </div>
            <div class="elementCaps">
                <div id="nbParties">
                    nb parties: {{ Myfriends.nbParties }}
                </div>
                <div id="nbVictory">
                    nb victory: {{ Myfriends.nbVictory }}
                </div>
                <div id="nbDefeat">
                    nb defeat: {{ Myfriends.nbDefeat }}
                </div>
            </div>
        </div>
        <div class="buttonUser">
            <sendMsg @click="SendMsg(Myfriends)"/>
            <invitPlay />
            <invitFriends @click="sendFriendRequest(Myfriends.user_user_id)"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

#capsule{
    width: 15em;
    max-height: 5em;
    //background-color: aquamarine;
}
#nickname{
    padding-left: 10px;
}
.dataUser{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    background-color: aqua;
}
.buttonUser{
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
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