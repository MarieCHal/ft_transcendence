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
  color: blanchedalmond;

}
header{

}
main{
  
}
footer{

}
a{
  text-align: center;
  color: white;
  text-decoration: none;
}

</style>