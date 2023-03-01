<script setup lang="ts">
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { useStore } from "vuex";
    
    const router = useRouter();
    const store = useStore();
    //let image = store.getters.getAvatar;
    let login = store.getters.getLogin;
    //store.commit('setStatusCode', false); 
    let msgError = '';

    function getStatusCode(){
        return store.getters.getStatusCode;
    }

    function getAvatar(){
        return store.getters.getAvatar;
    }
    function fileUpload(event: any){
        store.commit('setAvatar',URL.createObjectURL(event.target.files[0]));
    }
</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
            <label class="file-select">
                <div class="select-button">
                    <img :src="getAvatar()" v-if="getAvatar()"/>
                </div>
                <input accept="image/.jpeg,image/.png" type="file" ref="file" @change="fileUpload($event)"/>
            </label>
            <input type="text" name="login" placeholder="Login" autocomplete="off" required v-model="login">
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