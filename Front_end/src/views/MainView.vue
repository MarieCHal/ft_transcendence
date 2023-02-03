<script setup lang="ts">
  import music from "@/components/music.vue";
  import mainNav from '../components/mainNav.vue'
  import mainMain from '../components/mainMain.vue'
  import mainChat from '../components/mainChat.vue'
</script>

<template>
  <div id="main_div">
    <music/>
    <div class="div_component" id="mainNav">
      <mainNav/>
    </div>
    <div class="div_component" id="mainMain">
      <mainMain/>
    </div>
    <div class="div_component" id="mainChat">
      <mainChat/>
    </div>
  </div>
</template>

<style scoped lang="scss">
#main_div{
  display:flex;
  //position: relative;
  background-color: aqua;
}
#mainNav{
  height: 98vh;

  background-color: aliceblue;
}
#mainMain{
  height: 98vh;

  background-color: rgb(212, 37, 197);
}
#mainChat{
  height: 98vh;
  margin-left: auto;
  //float: right;
  background-color: rgb(44, 211, 111);
}
</style>