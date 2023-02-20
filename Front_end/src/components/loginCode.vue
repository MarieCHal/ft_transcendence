<script setup lang="ts">
  import router from '@/router';
import axios from 'axios';
</script>

<template>
  <div>
    <form>
      <input type="text" name="code" autocomplete="off"
        minlength="4" placeholder="code"
        v-model="Code" @keyup="submitfonction">
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
                Code: '',
                StatusCode: false,
                MessageError: '',
            }
        },

    methods:{ 
      submitfonction(){
          var mynameIs = localStorage.getItem('login');
          const newData = {
            username: mynameIs,
            password: this.Code
          }
          this.checkCode(newData);
      },

      async checkCode(data: any)
      {
        try {
          if (this.Code.length === 4){
            const response = await axios.post("http://c1r2s3:3000/auth/code", data);
            if (response.status == 201){
              var accessToken = response.data.access_token;
              var firstname = response.data.loginUser.Firstname;
              var lastname = response.data.loginUser.Lastname;
              var nickname = response.data.loginUser.Nickname;
              var email = response.data.loginUser.Email;
              var password = response.data.loginUser.Password;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('Firstname', firstname);
              localStorage.setItem('Lastname', lastname);
              localStorage.setItem('Nickname', nickname);
              localStorage.setItem('Email', email);
              localStorage.setItem('Password', password);
              const res = await axios.get("http://c1r2s3:3000/users/avatar", {
                params: {nickname: localStorage.getItem('Nickname')},
                responseType: 'blob'
              });
              const url = URL.createObjectURL(res.data);
              var avatar = url;
              localStorage.setItem('Avatar', avatar);
              console.log(accessToken);
              console.log("truc");
              this.$router.push("/main");
            }
          }
        } catch (error: any) {
          if (error.response.status != 201)
          {
            this.MessageError = error.response.data.message ;
            this.StatusCode = true;
          }
        }
      }
    }
    }
</script>
