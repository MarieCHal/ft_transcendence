<script setup lang="ts">
  import mainNav from '../components/mainNav.vue'
  import mainMain from '../components/mainMain.vue'
  import mainChat from '../components/mainChat.vue'
</script>

<template>
  <div id="mainDiv">
    <div id="mainNav">
      <mainNav/>
    </div>
    <div id="mainMain">
      <mainMain/>
    </div>
    <div id="mainChat">
      <mainChat/>
    </div>
  </div>
</template>

<style scoped lang="scss">

#mainDiv{
  display: flex;
  position: relative;
}

#mainNav{
  height: 98vh;
}

#mainMain{
    height: 98vh;
    width: 50vh;
    //background-color: aliceblue;
}
#mainChat{
    height: 98vh;
    margin-left: auto;
  }
</style>