<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();

    //let image = store.getters.getAvatar;
    let nickname = store.getters.getNickname;
    let msgError = '';

    function getStatusCode(){
        return store.getters.getStatusCode;
    }

    function getAvatar(){
        return store.getters.getAvatar;
    }
    const fileUpload = async (event: any) => {
        store.commit('setStatusCode', false); 
        const file = event.target.files[0];
        const avatar = URL.createObjectURL(file);
        
        if (store.getters.getAvatar != avatar)
        {
            try {
                const formData = new FormData();
                formData.append("avatar", file);
                const headers = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Cookies.get('auth_token')}`
                };
                const response = await axios.post('http://c1r2s3:3000/profile/modify/avatar',
                formData,
                { headers }
                );
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
    const nicknameUpload = async () => {
        store.commit('setStatusCode', false); 
        if (store.getters.getNickname != nickname){
            try {
                const headers = {"Authorization": `Bearer ${Cookies.get('auth_token')}`};
                const data = {nickname: nickname};
                const response = await axios.post('http://c1r2s3:3000/profile/modify/nickname', data, {headers})
                if (response.status == 201)
                {
                    store.commit('setNickname', nickname);
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
        <form @submit.prevent="nicknameUpload">
            <label class="file-select">
                <div class="select-button">
                    <img :src="getAvatar()" v-if="getAvatar()"/>
                </div>
                <input accept="image/.jpeg,image/.png" type="file" ref="file" @change="fileUpload($event)"/>
            </label>
            <input type="text" name="Nickname" placeholder="Nickname" autocomplete="off" required v-model="nickname">
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