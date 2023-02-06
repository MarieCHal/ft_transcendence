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
      <div class="glow-button">
        <div class="gradient"></div>
          <div class="span">
            <!-- <mainNav/> -->
          </div>
      </div>
    </div>
    <div class="div_component" id="mainMain">
      <!-- <mainMain/> -->
    </div>
    <mainChat/>

  </div>
</template>

<style scoped lang="scss">

#main_div{
  display:flex;
  height: 100vh;
  position: relative;
  //background-color: aqua;
}
#mainNav{
  background-color: aliceblue;
}
#mainMain{
  width: 100px;
  background-color: rgb(212, 37, 197);
}

</style>