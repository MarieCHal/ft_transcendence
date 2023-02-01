<script setup lang="ts">
  import mainNav from '../components/mainNav.vue'
  import mainMain from '../components/mainMain.vue'
  import mainChat from '../components/mainChat.vue'
</script>

<template>
  <div id="main_div">
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
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  @media screen and (max-width: 780px)
  {
    #main_div{
      flex-direction: column;
    }
  }
</style>