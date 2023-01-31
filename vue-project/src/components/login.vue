<template>
    <div>
        <form @submit.prevent="submitfonction">
            <input type="login" name="nickname" placeholder="login" required v-model="login">
            <input type="password" name="password" placeholder="Password"  required v-model="password">
           <!-- <input type="submit" id="lolo" value="Send Code">-->
            <button> submit </button>
        </form>
        <input type="text" name="code"
        minlength="4" placeholder="code" v-model="code" @keyup="codefonction">
       <!-- <p> Login: {{ login }}</p>
        <p> Password: {{ password }}</p>
        <p> Code: {{ code }}</p>-->
    </div> 
</template>

<script lang="ts">
  import axios from "axios";
  import { server } from "../utils/helper";
    export default{
        data(){
            return{
                login: '',
                password: '',
                code: ''
            }
        },

    methods:{ 
      /*submitfonction(){
        console.log('salut')
        let newUser = {
          username: this.login,
          password: this.password,
          email: "test@gmail.com"
        };
        this.__submitToServer(newUser);
      },

      __submitToServer(data: any) {
        axios.post(`http://localhost:3000/database/create`, data);
      },*/

      submitfonction(){
        console.log('salut')
        let newUser = {
          Nickname: this.login,
          password: this.password,
        };
        this.__submitToServer(newUser);
      },

      __submitToServer(data: any) {
        axios.get(`http://localhost:3000/users/login`, data);
      },

      codefonction: function(event: any){
        console.log(this.code)
        if (this.code.length > 3){
          console.log('log ')
          this.__displayUsers();
          //this.$router.push('/about')
        }
      }, 
      __displayUsers() {
        axios.get(`http://localhost:3000/users/name`);
      }
    }
  }
</script>

<style scoped>
div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  height: 50px;
  width: 200px;
  border-radius: 30px;
  background-color: aquamarine;
  margin-top: 10px;
}
::placeholder{
  text-align: center;
}
button{
  margin-top: 10px;
  border-radius: 30px;
  height: 50px;
  width: 100px;
  color: white;
  font-weight: bold;
  background-color: rgb(232, 4, 232);
}
</style>