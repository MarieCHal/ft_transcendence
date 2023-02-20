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
            <input type="text" name="Firstname" placeholder="Firstname" autocomplete="off" required v-model="Firstname">
            <input type="text" name="Lastname" placeholder="Lastname" autocomplete="off" required v-model="Lastname">
            <input type="text" name="Nickname" placeholder="Nickname" autocomplete="off" required v-model="Nickname">
            <input type="email" name="Email" placeholder="Email" autocomplete="off" required v-model="Email">
            <input type="password" name="Password" placeholder="Password" autocomplete="off" required v-model="Password">
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
              image: localStorage.getItem('Avatar'),
              Firstname: localStorage.getItem('Firstname'),
              Lastname: localStorage.getItem('Lastname'),
              Nickname: localStorage.getItem('Nickname'),
              Email: localStorage.getItem('Email'),
              Password: localStorage.getItem('Password'),
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