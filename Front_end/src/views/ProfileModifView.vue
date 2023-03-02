<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    
    const router = useRouter();
    const store = useStore();
    //let image = store.getters.getAvatar;
    let login = store.getters.getLogin;
    let msgError = '';

    function getStatusCode(){
        return store.getters.getStatusCode;
    }

    function getAvatar(){
        return store.getters.getAvatar;
    }
    const fileUpload = async (event: any) => {
        store.commit('setStatusCode', false); 
        let avatar = URL.createObjectURL(event.target.files[0]);
        if (store.getters.getAvatar != avatar)
        {
            try {
                const response = await axios.post('http://c1r2s3:3000/profile/modify/avatar', {headers: {"Authorization": `Bearer ${store.getters.getToken}`}, avatar: avatar})
                if (response.status == 201)
                {
                    store.commit('setAvatar', avatar);
                }
            } catch (error: any) {
                if (error.response.status != 201)
                {
                    msgError = error.response.data.message ;
                    store.commit('setStatusCode', true);
                }
            }
        }
    }
    const loginUpload = async () => {
        store.commit('setStatusCode', false); 
        if (store.getters.getLogin != login){
            try {
                const response = await axios.post('http://c1r2s3:3000/profile/modify/login', {headers: {"Authorization": `Bearer ${store.getters.getToken}`}, login: login})
                if (response.status == 201)
                {
                    store.commit('setLogin', login);
                }
            } catch (error: any) {
                if (error.response.status != 201)
                {
                    msgError = error.response.data.message;
                    store.commit('setStatusCode', true);
                }
            }
        }
    }
</script>

<template>
    <div>
        <form @submit.prevent="loginUpload">
            <label class="file-select">
                <div class="select-button">
                    <img :src="getAvatar()" v-if="getAvatar()"/>
                </div>
                <input accept="image/.jpeg,image/.png" type="file" ref="file" @change="fileUpload($event)"/>
            </label>
            <input type="text" name="login" placeholder="Login" autocomplete="off" required v-model="login">
            <button>
                submit
            </button>
        </form>
        <div id="statuscode" v-if="getStatusCode()">
          <p> {{ msgError }} </p>
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
  }
  .file-select > input {
    display: none;
  }
</style>