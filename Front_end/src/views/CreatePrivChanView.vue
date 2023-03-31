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
    <div>
       <form @submit.prevent="submmit">
            <div class="navButton">
                <label for="nameChat"></label>
                <input class="navButton" type="text" name="codeChat" autocomplete="off"
                placeholder="Name channel" v-model="newChanel" required>
            </div>
            <div>
                <h1>Select users for invite on this room</h1>
                <div v-for="(user, index) in store.getters.getAllUsers.allUsers" :key="index">
                    <div class="navButton" @click="selectUser(user.user_user_id, index)">
                        {{ user.user_nickname }}
                    </div>
                </div>
            </div>
            <button class="navButton">
                submit
            </button>
       </form>
    </div>
</template>

<style scoped lang="scss">
    
</style>