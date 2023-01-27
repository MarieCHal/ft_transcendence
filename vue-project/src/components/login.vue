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
    export default{
        data(){
            return{
                login: '',
                password: '',
                code: ''
            }
        },

    methods:{ 
      submitfonction(){
        console.log('salut')
      },
      codefonction: function(event: any){
        console.log(this.code)
        if (this.code == '1234'){
          console.log('log ')
          this.$router.push('/about')
        }
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