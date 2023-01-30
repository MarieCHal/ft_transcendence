<template>
    <div>
        <form @submit.prevent="submitfonction">
            <input type="login" name="nickname" placeholder="login" required v-model="login">
            <input type="password" name="password" placeholder="Password"  required v-model="password">
           <!-- <input type="submit" id="lolo" value="Send Code">-->
            <button class="glow-button">
            <div class="gradient"></div>
            <span>
              submit 
            </span>
            </button>
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
          this.$router.push('/')
        }
      }
    }
  }
</script>