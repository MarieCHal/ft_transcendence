<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"

    const router = useRouter();
    const store = useStore();

    let newChanel = '';
    let TabUserId: {[Key: number]: number} = {};
    const submmit = async () => {
        console.log('tabUserID', TabUserId);
        try {
            let tab = Object.values(TabUserId);
            console.log('tab', tab);
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {protected: false, private: true, name: newChanel, tabUsersId: tab};
            const response = await axios.post('/chat/create', data,  {headers});
            store.commit("setChanContext", response.data);
            const response1 = await axios.get(`/chat/join/${response.data.chanel_chat_id}`, {headers});
            store.commit('setUserContext', response1.data);
            router.push('/chat');
            }
        catch (error: any) {
                 console.log(error);
        }
    }

    function selectUser(userId: number, index: number){
        TabUserId[index] = userId;
    }
</script>

<template>
       <form class="disp" @submit.prevent="submmit">
                <label for="nameChat"></label>
                <input class="navButton" type="text" name="codeChat" autocomplete="off"
                    placeholder="Name channel" v-model="newChanel" required>
                <h1>Select users for invite on this room</h1>
                <div class="user" v-for="(user, index) in store.getters.getAllUsers.allUsers" :key="index">
                    <div class="navButton" @click="selectUser(user.user_user_id, index)">
                        {{ user.user_nickname }}
                    </div>
                </div>
            <button class="navButton">
                submit
            </button>
       </form>
</template>

<style scoped lang="scss">
.disp{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
}
.user{
    display: flex;
    flex-direction: column;
    align-items: center;
}
button{
    margin-top: 1rem;
    border-radius: 1px;
    width: auto;
    background-color:aquamarine ;
}
input{
    width: auto;
    text-align: center;
}
h1{
    margin: 1rem;
    text-align: center;
}
</style>