<template>
    <div class="wrapper">
      <h1>42</h1>
      <h2>Lausanne</h2>
      <nav>
        <button v-on:click="clicklogin"> Login </button>
        <button v-on:click="clickSigne_In"> Sign In </button>
      </nav>
    </div>
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
  
  <style scoped>
  .wrapper{
    height: 200px;
    width: 200px;
    margin: auto;
    border-radius: 50%;
    background-color:rgb(25, 187, 168);
  }
  .wrapper:hover {
      background-color: hsla(38, 85%, 46%, 0.2);
    }
  </style>