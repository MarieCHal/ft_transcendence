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
    <div>
       <form @submit.prevent="submmit">
        <div class="disp">
            <input class="chatButton" type="text" name="codeChat" autocomplete="off"
            placeholder="Name channel" v-model="newChanel" required>
        </div>
        <div class="disp">
            <input class="chatButton" type="text" name="code" autocomplete="off"
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
    border-right: 2px dotted red;
	border-radius: 10px;
	color: rgb(122, 122, 122);
	background: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
	cursor: pointer;

}
</style>