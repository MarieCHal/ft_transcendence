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

    <div id="mainMain">
      <div id="mainMainProfile">
        <mainMainProfile v-if="showMain == 'Profile'"/>
      </div>
      <div id="mainMainUsers">
        <mainMainUsers v-if="showMain == 'Users'"/>
      </div>
      <div id="mainMainChannel">
        <mainMainChannel v-if="showMain == 'Channel'"/>
      </div>
    </div>

    <div id="mainChat">
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
#mainMain{
  flex-grow: 1;
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
  methods: {
      toggleAdditionalButton(buttonName: any) {
        if (this.showMain == buttonName)
          this.showMain = null;
        else
          this.showMain = buttonName;
      }
  },
  data() {
    return {
      showMain: null
    }
  }
}
  </script>
