<script setup lang="ts">
  import loginCode from '../components/loginCode.vue'
</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
            <input type="text" name="nickname" placeholder="login" required v-model="login">
            <input type="password" name="password" placeholder="Password"  required v-model="password">
           <!-- <input type="submit" id="lolo" value="Send Code">-->
              <button class="glow-button">
              <div class="gradient"></div>
              <span>
                submit 
              </span>
            </button>
            <loginCode/>
        </form>
    </div> 
</template>

<script lang="ts">

  export default{
      data(){
        return{
            login: '',
            password: '',
        }
      },

    methods:{ 
      submitfonction(){
        console.log('salut')
      },
    }
  }
</script>