<script setup lang="ts">
    import modifProfileButton from '../components/profileComponents/modifProfileButton.vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import stats from '../components/profileComponents/stats.vue'
    import doubleAuth from '../components/profileComponents/doubleAuthButton.vue'
    import friendRequest from '../components/profileComponents/friendRequest.vue'
    import logout from '../components/profileComponents/logout.vue'
    import Cookies from 'js-cookie';
    import ButtonFriendsUsers from '@/components/usersComponents/buttonFriendsUsers.vue'

    const router = useRouter();
    const store = useStore();
    let UserAvatar = '';
    const userContext = store.getters.getUserContext;
    const userProfileContext = store.getters.getUserProfile;
    const chanContext = store.getters.getChanContext;
    onMounted(async () => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const response = await axios.get(`http://c1r2s3:3000/users/profile/${store.getters.getUserId}`, {headers});//FAIRE TRY CATCH
        store.commit('setUserProfile', response.data)
    });
    
    const getAvatar = async () =>{
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const response = await fetch(`http://c1r2s3:3000/users/avatar/${store.getters.getUserId}`, {headers});
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        store.commit("setUserAvatar", url);
    }
    getAvatar();

    const bloquer = async () =>{
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const data = {
            otherId: store.getters.getUserId,
            chanelId: chanContext.chanel_chat_id,
        }
        await axios.post(`http://c1r2s3:3000/chat/block`, data, {headers})
    }

    const muted = async () =>{
        if (!userContext.owner || !userContext.admin){
            alert("YOU ARE NOT OWNER OR ADMIN")
            return ;
        }
        else{
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            const data = {
                otherId: store.getters.getUserId,
                chanelId: chanContext.chanel_chat_id,
            }
            await axios.post(`http://c1r2s3:3000/chat/kick`, data,  {headers})
        }
    }

    const banned = async () =>{
        if (!userContext.owner || !userContext.admin){
            alert("YOU ARE NOT OWNER OR ADMIN")
            return ;
        }
        else{
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            const data = {
                otherId: store.getters.getUserId,
                chanelId: chanContext.chanel_chat_id,
            }
            await axios.post(`http://c1r2s3:3000/chat/bann`, data,  {headers})
        }
    }

    const kick = async () =>{
        console.log("owner =", userContext.owner)
        console.log("admin =", userContext.admin)
        if (!userContext.owner && !userContext.admin){
            alert("YOU ARE NOT OWNER OR ADMIN")
            return ;
        }
        else{
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            const data = {
                otherId: store.getters.getUserId,
                chanelId: chanContext.chanel_chat_id,
            }
            await axios.post(`http://c1r2s3:3000/chat/kick`, data,  {headers})
        }
    }

    const admin = async () =>{
        if (!userContext.owner || !userContext.admin){
            alert("YOU ARE NOT OWNER OR ADMIN")
            return ;
        }
        else{
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            const data = {
                otherId: store.getters.getUserId,
                chanelId: chanContext.chanel_chat_id,
            }
            await axios.post(`http://c1r2s3:3000/chat/admin`, data,  {headers})
        }
    }
    
    const play = async () =>{
        console.log("a faire")
    }

    const SendMsg = async(user: any) =>{
        try{
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            const data = {private: true, name: "", otherId: user.users_user_id}
            const response = await axios.post('http://c1r2s3:3000/chat/create', data,  {headers})
            store.commit("setChanContext", user);
            router.push('/chat');
        }catch{
            console.log("Erreur chatUsers")
        }
        // avant de commit il faut faire une requete 
    }

    const sendFriendRequest = async (userId: any) => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const data = {id: userId};
        const response = await axios.post('http://c1r2s3:3000/users/friend-request', data, {headers})
        .then(response => {
            alert(response.data)
            console.log('Demande d\'amis envoyée avec succès');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la demande d\'amis', error);
        });
    }
</script>

<template>
    <div>
        <div >
            <img :src="store.getters.getUserAvatar"/>
        </div>
        <div id="nickname">
          {{ store.getters.getUserProfile.user_nickname }} 
        </div>
        <div id="stat">
            <stats />
        </div>
        <button id="button" @click="bloquer()">
            bloquer
        </button>
        <button id="button" @click="kick()">
            kick
        </button>
        <button id="button" @click="muted()">
            mute
        </button>
        <button id="button" @click="banned()">
            ban
        </button>
        <button id="button" @click="admin()">
            admin
        </button>
        <div>
            <button id="button" @click="play()">
                play
            </button>
            <button id="button" @click="sendFriendRequest(store.getters.getUserProfile.user_user_id)">
                Friends
            </button>
            <button id="button" @click="SendMsg(userProfileContext)">
                sendMsg
            </button>
        </div>
    </div> 
</template>

<style scoped lang="scss">
  img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
    background-color: #ffff00;
  }

#button{
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    overflow: auto;
}

#stat, #nickname{
    padding: 5px 10px;
    margin: 5px;
    color: rgb(250, 3, 3);

}

</style>