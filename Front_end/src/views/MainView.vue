<script setup lang="ts">
  import music from "@/components/music.vue";
  import mainNav from '../components/mainNav.vue'
  import mainChat from '../components/mainChat.vue'
  import navButton from '../components/navButton.vue'
  import mainMainProfile from '../components/mainProfile.vue'
  import mainMainUsers from '../components/mainUsers.vue'
  import mainMainChannel from '../components/mainChannel.vue'
</script>

<template>
  <div id="main_div">
    <music/>
    <div id="mainNav">
      <mainNav @toggleAdditionalButton="toggleAdditionalButton" />
    </div>
      <div id="mainMainProfile">
        <mainMainProfile v-if="showMain == 'Profile'"/>
      </div>
      <div id="mainMainUsers">
        <mainMainUsers v-if="showMain == 'Users'"/>
      </div>
      <div id="mainMainChannel">
        <mainMainChannel v-if="showMain == 'Channel'"/>
      </div>
      <div id="mainChat" v-show="show" v-if="showMain == 'Chat'">
          <mainChat/>
      </div>
    </div>
</template>

<style scoped lang="scss">

#main_div{
  display:flex;
  justify-content: space-between;
  align-self: center;
  height: 100vh;
  //background-color: aliceblue;
}
#mainNav{
  display: flex;
  align-items:baseline;
  height: 10vh;
  
}
#mainMainHelp{
  display: block;
  margin-top: 20%;
  margin-left: 3%;
}
#mainMainProfile{
}

#mainMainStats{

}
#mainChat{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: flex-end;
    margin-bottom: 3%;
}
</style>

<script scoped lang="ts">
export default {
  components: {
    navButton
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
      toggleAdditionalButton(buttonName: any) {
        if (this.showMain == buttonName)
          this.showMain = null;
        else
          this.showMain = buttonName;
      },
      handleResize() {
      const largeurFenetre = window.innerWidth;
      const hauteurFenetre = window.innerHeight;
      if (largeurFenetre >= 500 && hauteurFenetre >= 800) { 
        this.show = true;
      } else {
        this.show = false; 
      }
    },
    beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
  },
  data() {
    return {
      showMain: null,
      show: false
    }
  }
}
  </script>
