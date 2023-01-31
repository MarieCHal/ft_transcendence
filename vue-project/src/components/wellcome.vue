<template>
    <button class="glow-button" v-on:click="clicklogin"> 
      <div class="gradient"></div>
    <span>
      Login 
    </span>
    </button>
    <button class="glow-button" v-on:click="clickSigne_In">
      <div class="gradient"></div>
    <span>
      Sign In 
    </span>
    </button>
  </template>
  
  <script lang="ts">
      export default{
          data(){
              return{
              }
          },
  
      methods:{ 
        clicklogin(){
            this.$router.push('/login')
        },
        clickSigne_In(){
            this.$router.push('/signe_in')
        }
        }
      }
  </script>

<style scoped lang="scss">

</style>