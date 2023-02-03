<script setup lang="ts">
  import submit from '../components/submit.vue'
  import logincode from '../components/loginCode.vue'
</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
            <input type="login" name="nickname" placeholder="login" required v-model="login">
            <input type="password" name="password" placeholder="Password"  required v-model="password">
            <submit/>
            <logincode/>
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