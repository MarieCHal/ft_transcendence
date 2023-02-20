<script setup lang="ts">
  import { RouterView } from "vue-router";
  import navButtonUsers from "./components/navComponents/navButtonUsers.vue"
  import navButtonProfile from "./components/navComponents/navButtonProfile.vue"
  import navButtonChan from "./components/navComponents/navButtonChan.vue"
  import navButtonPlay from "./components/navComponents/navButtonPlay.vue"
  import navLogin from "./components/navComponents/navLogin.vue"

</script>

<template>
  <header>
    <nav>
      <div>
        <navButtonPlay />
        <navButtonUsers />
        <navButtonChan />
      </div>
      <div v-if="checkToken()" >
        <navButtonProfile />
      </div>
      <div v-else>
        <navLogin />
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <p>coucou</p>
  </footer>
</template>

<script lang="ts">
  export default{
      data(){
        return{
          Token: ""
        }
      },
      methods:{
        checkToken(){
          this.Token = localStorage.getItem('accessToken');
          if (this.Token){
            return true;
          }
          else{
            return false;
          }
        }
      }
    }
</script>

<style scoped lang="scss">
header{
  height: 10em;
  //background-color: black;
  padding: 1%;
}
nav{
  display: flex;
  justify-content: space-between;
}
main{
  display: flex;
  //background-color: rgb(55, 47, 47);
}
footer{
  display: flex;
  position: absolute;
  bottom: 0%;
  //background-color: rgb(165, 91, 91);
}
</style>