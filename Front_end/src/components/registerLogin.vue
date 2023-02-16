<template>
    <button class="glow-button" v-on:click="clicklogin"> 
      <div class="gradient"></div>
      <span class="span">
        Login 
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
      }
    }
  }
</script>