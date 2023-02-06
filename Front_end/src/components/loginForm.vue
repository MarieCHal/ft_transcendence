<script setup lang="ts">
  import submit from '../components/submit.vue'
  import logincode from '../components/loginCode.vue'
  import axios from 'axios';
</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
            <input type="login" name="nickname" placeholder="login" autocomplete="off" required v-model="login">
            <input type="password" name="password" placeholder="Password" autocomplete="off" required v-model="password">
            <submit/>
        </form>
        <logincode/>
        <div id="statuscode" v-if="StatusCode">
          <p> {{ MessageError }} </p>
        </div>
    </div> 
</template>

<script lang="ts">

  export default{
      data(){
        return{
            login: '',
            password: '',
            StatusCode: false,
            MessageError: ''
        }
      },

    methods:{ 
      submitfonction(){
          const newData = {
            Nickname: this.login,
            Password: this.password,
          }
          this.submitAxiosSignIn(newData);
      },

      async submitAxiosSignIn(data: any){
        try {
          const response = await axios.post("http://c1r2s3:3000/login", data);
        } catch (error) {
          if (error.response.status != 201)
          {
            this.MessageError = error.response.data.message ;
            this.StatusCode = true;
          }
        }
      },
    }
  }
</script>