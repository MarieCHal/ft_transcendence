<script setup lang="ts">
    import capsule from '@/components/usersComponents/capsule.vue';
    import blockUser from '@/components/usersComponents/blockUser.vue';
    import invitFriends from '@/components/usersComponents/invitFriends.vue';
    import invitPlay from '@/components/usersComponents/invitPlay.vue';
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();
    
    onMounted(async () => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const response = await axios.get("http://c1r2s3:3000/users/all", {headers});//FAIRE TRY CATCH
        //const response = await axios.get("http://localhost:3000/users");
        store.commit('setUsers', response.data.allUsers);
    });
    
    function getUsers(){
        return store.getters.getUsers;
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
</script>

<template>
    <div id="mainUsers" >
        <div id="capsule" v-for="(user, index) in getUsers()" :key="index">
            <div class="dataUser">
                <div class="nicknameStatus">
                    <div class="status-indicator" :class="{ 'status-online': user.users_isActive, 'status-offline': !user.users_isActive }"></div>
                    <div id="nickname">
                        {{ user.users_nickname }}
                    </div>
                </div>
                <div class="elementCaps">
                    <div id="nbParties">
                        nb parties: {{ user.stats_games }}
                    </div>
                    <div id="nbVictory">
                        nb victory: {{ user.stats_victories }}
                    </div>
                    <div id="nbDefeat">
                        nb defeat: {{ user.stats_defeats }}
                    </div>
                </div>
            </div>
            <div class="buttonUser">
                <invitPlay />
                <invitFriends @click="sendFriendRequest(user.users_user_id)"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#mainUsers{
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    color: black;
}
img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
  }
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