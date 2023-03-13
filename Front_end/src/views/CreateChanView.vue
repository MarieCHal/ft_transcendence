<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();

    let newChanel = '';
    let Pwd = '';
    let code = false;

    const submmit = async () => {
        try {
            const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
            console.log(newChanel);
            const data = {protected: code, private: false, name: newChanel, pwd: Pwd}
            const response = await axios.post('http://c1r2s3:3000/chat/create', data,  {headers})
            if (store.getters.getStatusCode == false)
            {
                router.push('/chat')
            }
        } catch (error: any) {
            if (error.response.status != 201)
            {
               code = false;
            }
        }
    }

</script>

<template>
    <div>
       <form @submit.prevent="submmit">
        <div>
            <input type="text" name="codeChat" autocomplete="off"
            placeholder="Name channel" v-model="newChanel">
            obligatoire
        </div>
        <div>
            <input type="checkbox" id="subscribe" name="subscribe" value="subscribe" v-model="code">
            <label for="subscribe"> mot de passe ?</label>
        </div>
        <div>
            <input type="text" name="code" autocomplete="off"
            placeholder="PWD" minlength="4" maxlength="4" v-model="Pwd">
            obsessionnel code min 4 and max 4
        </div>
        <button>
            submit
        </button>
       </form>
    </div>
</template>

<style scoped lang="scss">
    
</style>