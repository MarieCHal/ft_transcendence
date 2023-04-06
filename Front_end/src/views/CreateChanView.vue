<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"

    const router = useRouter();
    const store = useStore();

    let newChanel = '';
    let Pwd = '';
    let statuscode = false;

    const submmit = async () => {
        try {
            if (Pwd){
                statuscode = true;
            } 
            else{
                statuscode = false;
            }
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const data = {protected: statuscode, private: false, name: newChanel, pwd: Pwd}
            const response = await axios.post('/chat/create', data,  {headers})
            console.log('contextchan', response.data)
            store.commit("setChanContext", response.data);
            const response1 = await axios.get(`/chat/join/${response.data.chanel_chat_id}`, {headers});
            store.commit('setUserContext', response1.data);
            console.log('userContext in creatMsg', response1.data);
            router.push('/chat');
            }
        catch (error: any) {
                 console.log(error);
        }
    }

</script>


<template>
    <div class="card">
       <form @submit.prevent="submmit">
        <div class="disp">
            <input class="chatInput" type="text" name="codeChat" autocomplete="off"
            placeholder="Name channel" v-model="newChanel" required>
        </div>
        <div class="disp">
            <input class="chatInput" type="text" name="code" autocomplete="off"
            placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
        </div>
        <div class="disp">
            <button class="chatButton">
                submit
            </button>
        </div>
       </form>
    </div>
</template>

<style scoped lang="scss">

.card {
    position: static;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 20px;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    width: 40%;
    max-width: 450px;
    min-width: 340px;
}
.card:hover {
    opacity: 1;
}
.disp{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
}

.chatButton{
    max-width: 100px;
    text-align: center;
    margin: 5px;
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
    margin: 5px;
    height: 30px;
	border: none;
	color: rgb(122, 122, 122);
	background: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
  }

</style>