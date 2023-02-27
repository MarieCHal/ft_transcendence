<script setup lang="ts">
  import axios from 'axios';
  import submit from '../components/submit.vue'
</script>

<template>
    <div id="all">
        <form @submit.prevent="submitfonction">
          <label class="file-select">
              <div class="select-button">
                <img :src="image" v-if="image"/>
              </div>
            </label>
            <input type="text" name="login" placeholder="Login" autocomplete="off" required v-model="login">
        </form>
        <div id="statuscode" v-if="StatusCode">
          <p> {{ MessageError }} </p>
        </div>
    </div> 
</template>

<script lang="ts">
    export default{
        data(){
            return{
              image: localStorage.getItem('avatar'),
              login: localStorage.getItem('login'),
              StatusCode: false,
              MessageError: ''
              
            }
        },

    methods:{ 
      submitfonction(){
      },
        setImage(event: any) {
        this.image = URL.createObjectURL(event.target.files[0])
      }
    }
  }
</script>
<style scoped lang="scss">
  img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
  }
  #all{
    display: flex;
    position: absolute;
    align-items: center;
    left: 0;
    height: 100vh;

  }
  .file-select > input {
    display: none;
  }
</style>