<script setup lang="ts">
    import router from '@/router'
    import getAvatar from '../../getAvatar'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import axios from 'axios';

    const store = useStore();
    
    const userContext = store.getters.getUserContext;
    const chanContext = store.getters.getChanContext;
    
    onMounted(async () => {
        await fetchData();
        console.log('repalle');
    });

    function click(data: any){
        store.commit('setOneUser', data);
        router.push('/Profile/user');
    }

    async function fetchData(){
        if(store.getters.getWhat === 'all'){
            const user = store.getters.getAllUsers.allUsers;
            const length = user.length;
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
            store.commit('setUsers', store.getters.getAllUsers.allUsers);
        }
        else if(store.getters.getWhat === 'friends'){
            const user = store.getters.getAllUsers.myFriends;
            const length = user.length;
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
            store.commit('setUsers', store.getters.getAllUsers.myFriends);
        }
        else if (store.getters.getWhat === 'UsersInChan'){
            const user = store.getters.getUsers;
            const length = user.length;
            for (let index = 0; index < length; index++) {
                await pushAvatarUrl(user[index].user_user_id)
            }
        }
    }

    async function pushAvatarUrl(userId: any){
        try {
            const url = await getAvatar(store, userId);
            store.commit('setArrayAvatar', { item: url, index: userId});
        } 
        catch (error) {
            console.error(error);
        }
    }

    const muted = async (userId: number) =>{
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = {
            otherId: userId,
            chanelId: chanContext.chanel_chat_id,
        }
        const response = await axios.post(`/chat/mute`, data,  {headers})
        if (response.data.muted == false){
            router.push('/chat')
            alert(response.data.message);
        }
        else{
            router.push('/chat')
            alert(response.data.message);
        }
    }

    const banned = async (userId: number) =>{
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = {
            otherId: userId,
            chanelId: chanContext.chanel_chat_id,
        }
        const response = await axios.post(`/chat/bann`, data,  {headers})
        if (response.data.ban == false){
            router.push('/chat')
            alert(response.data.message);
        }
        else{
            router.push('/chat')
            alert(response.data.message);
        }
    }
        
    const kick = async (userId: number) =>{
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const data = {
            otherId: userId,
            chanelId: chanContext.chanel_chat_id,
        }
        const response = await axios.post(`/chat/kick`, data,  {headers})
        if (response.data.kick == false){
            router.push('/chat')
            alert(response.data.message);
        }
        else{
            router.push('/chat')
            alert(response.data.message);
        }
    } 

    const admin = async (userId: number) =>{
        if (!userContext.owner || !userContext.admin){
            alert("YOU ARE NOT OWNER OR ADMIN")
            return ;
        }
        else{
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {
                otherId: userId,
                chanelId: chanContext.chanel_chat_id,
            }
           const response = await axios.post(`/chat/admin`, data,  {headers})
            if (response.data.admin == false){
                router.push('/chat')
                alert(response.data.message);
            }
            else{
                router.push('/chat')
                alert(response.data.message);
            }
        }
    }

</script>

<template>
    <div class="avatarButton" v-for="(data ,index) in store.getters.getUsers" :key="index" >
        <button 
            class="img"
            @click="click(data)"
            v-if="store.getters.getArrayAvatar(data.user_user_id)"
            :style="{ 'background-image': 'url(' + store.getters.getArrayAvatar(data.user_user_id) + ')'}">
            <img :src="store.getters.getArrayAvatar(data.user_user_id)" />
        </button>
        {{ data.user_nickname }}
        <div class="ownerButton" v-if="userContext.owner || userContext.admin">
            <button class="navButton" @click="kick(data.user_user_id)">
                kick
            </button>
            <button class="navButton" @click="muted(data.user_user_id)">
                mute
            </button>
            <button class="navButton" @click="banned(data.user_user_id)">
                ban
            </button>
            <button class="navButton" @click="admin(data.user_user_id)">
                admin
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.img{
  max-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: none;
  margin: 5px;
}
img{
  display: none;
}
.avatarButton{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
}
.ownerButton{
    display: flex;
    justify-content: center;
}

</style>