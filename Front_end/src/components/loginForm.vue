<script setup lang="ts">
  import submit from '../components/submit.vue'
  import logincode from '../components/loginCode.vue'
  import axios from 'axios';
import { pushScopeId } from 'vue';
</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
            <input type="login" name="nickname" placeholder="login" autocomplete="off" required v-model="login">
            <input type="password" name="password" placeholder="Password" autocomplete="off" required v-model="password">
            <submit/>
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
            login: '',
            password: '',
            StatusCode: false,
            MessageError: ''
        }
      },

    methods:{ 
      submitfonction(){
          const newData = {
          login: this.login,
          password: this.password,
          }
          this.submitAxiosSignIn(newData);
      },

      async submitAxiosSignIn(data: any){
        try {
          const response = await axios.post("http://c1r2s3:3000/auth/login", data);
          if (response.data.doubleAuth == false){
              var accessToken = response.data.access_token;
              var nickname = response.data.user.nickname;
              var id = response.data.user.id;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('nickname', nickname);
              localStorage.setItem('id', id);

              const res = await axios.get("http://c1r2s3:3000/users/avatar", {
                params: {nickname: localStorage.getItem('Nickname')},
                responseType: 'blob'
              });
              const url = URL.createObjectURL(res.data);
              var avatar = url;
              localStorage.setItem('avatar', avatar);
              this.$router.push("/main")
          }
          /*if (response.data.doubleAuth == true){
            faire une div pour le code
          }*/
          } catch (error: any) {
            if (error.response.doubleAuth != 201)
            {
              this.MessageError = error.response.data.message ;
              this.StatusCode = true;
            }
          }
      },
    }
  }
</script>