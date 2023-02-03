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
      <div class="glow-button">
        <div class="gradient"></div>
          <div class="span">
            <!-- <mainMain/> -->
          </div>
      </div>
    </div>
    <div class="div_component" id="mainChat">
      
      <div class="glow-button">
        <div class="gradient"></div>
          <div class="span">
            <!--<mainChat/> -->
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.glow-button{
  margin: auto;
  height: 100vh;
}
.gradient{
  display: flex;
  align-items: center;
  &:before{
    justify-content: flex-start;
    width: 100vh;
    height: 100vh;
    margin-right: auto;
  }

}
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