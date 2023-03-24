<script setup lang="ts">
  import navBar from "./components/navBar.vue"
  import { onMounted } from 'vue'
  import { RouterView } from "vue-router"
  import  { useStore} from 'vuex'
    
  const store = useStore();
  
  function getToken() {
    const token = store.getters.getToken;
    if (token)
      return token;
  }
</script>

<template>
  <div class="mainDiv">
    <header v-if="getToken()">
        <navBar />
    </header>
    <main>
        <RouterView />
    </main>
    <footer v-if="getToken()">
      <a href="https://42lausanne.ch/"> 42 Lausanne</a>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.mainDiv{
  overflow: hidden;
  position: relative;
  display: flex;
	flex-direction: column;
	align-items: center;
  min-height: 100%;
  background-color: black;
  color: blanchedalmond;

}
header{
  max-width: 1000px;
  min-width: 360px;
  height: auto;
  background-color: cyan;
}
main{
  max-width: 1000px;
  min-width: 360px;
  flex-grow: 1;
  background-color: rgb(253, 253, 253);
  color: black;
}
footer{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 1000px;
  min-width: 360px;
  height: auto;
  background-color: burlywood;
}
a{
  text-align: center;
}

</style>