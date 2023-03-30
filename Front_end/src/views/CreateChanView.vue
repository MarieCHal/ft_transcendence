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
        <div class="navButton">
            <input class="navButton" type="text" name="codeChat" autocomplete="off"
            placeholder="Name channel" v-model="newChanel">
            obligatoire
        </div>
        <div class="navButton">
            <input class="navButton" type="text" name="code" autocomplete="off"
            placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
        </div>
        <button class="navButton">
            submit
        </button>
       </form>
    </div>
</template>

<style scoped lang="scss">
    
</style>