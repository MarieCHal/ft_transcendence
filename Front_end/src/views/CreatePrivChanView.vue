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
    <div class="card"> 
       <form @submit.prevent="submmit">
        <div class="disp">
            <div class="chatButton">
                    <label for="nameChat"></label>
                    <input class="chatInput" type="text" name="codeChat" autocomplete="off"
                    placeholder="Name channel" v-model="newChanel" required>
                </div>
            </div>
            <div>
                <div class="disp">
                    <div class="Friends">
                        <h1>Select users for invite on this room</h1>
                        <div v-for="(user, index) in store.getters.getAllUsers.allUsers" :key="index">
                            <div class="chatButton" @click="selectUser(user.user_user_id, index)">
                                {{ user.user_nickname }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="disp">
                <button class="chatButton">
                    submit
                </button>
            </div>
       </form>
    </div>
</template>

<style scoped lang="scss">

.card {
    //position: static;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 20px;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    width: 40%;
    max-width: 450px;
    min-width: 340px;
    max-height: 450px;
    overflow: auto;
    scrollbar-width: none;
}
.card:hover {
    opacity: 1;
}
.card::-webkit-scrollbar {
  display: none;
}
.disp{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
}

.chatButton{
    text-align: center;
    margin-top: 10px;
    height: 30px;
	border: none;
	color: rgb(122, 122, 122);
	background: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
	cursor: pointer;

}

.chatButton:hover {
	color: #e6e6e6;
  }

  .chatInput{
    max-width: 100px;
    text-align: center;
	border: none;
	color: rgb(122, 122, 122);
	background: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
  }
.Friends{
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    overflow-y: auto;
    }
</style>