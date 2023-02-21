<script setup lang="ts">
  import { RouterView } from "vue-router";
  import navButtonLogo from "./components/navComponents/navButtonLogo.vue"
  import navButtonUsers from "./components/navComponents/navButtonUsers.vue"
  import navButtonProfile from "./components/navComponents/navButtonProfile.vue"
  import navButtonChat from "./components/navComponents/navButtonChat.vue"
  import navButtonPlay from "./components/navComponents/navButtonPlay.vue"
  import navLogin from "./components/navComponents/navLogin.vue"
</script>

<template>
  <div class="mainDiv">
    <header>
      <nav>
        <div>
          <navButtonLogo />
        </div>
        <div>
          <navButtonPlay />
          <navButtonUsers />
          <navButtonChat />
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
      <p>42 Lausanne</p>
    </footer>
  </div>
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
.mainDiv{
  display: flex;
  flex-direction: column;
  background-color: burlywood;
  height: 100vh;
  max-width: 1000px;
}
header{
  //height: 10em;
  background-color: black;
  padding: 10px;
}
nav{
  display: flex;
  justify-content: space-between;
}
main{
  display: flex;
  height: 100%;
  background-color: rgb(55, 47, 47);
}
footer{
  display: flex;
  //position: absolute;
  bottom: 0%;
  max-width: 1000px;
  width: 100%;
  background-color: rgb(165, 91, 91);
}
p{
  margin: auto;
}
</style>