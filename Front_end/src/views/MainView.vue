<script setup lang="ts">
  import music from "@/components/music.vue";
  import mainNav from '../components/mainNav.vue'
  import mainChat from '../components/mainChat.vue'
  import navButton from '../components/navButton.vue'
  import mainMainHelp from '../components/mainHelp.vue'
  import mainMainProfile from '../components/mainProfile.vue'
  import mainMainStats from '../components/mainStats.vue'
</script>

<template>
  <div id="main_div">
    <music/>
    <mainNav @toggleAdditionalButton="toggleAdditionalButton" />
    <mainMainHelp v-if="showMain == 'Help'"/>
    <mainMainProfile v-if="showMain == 'Profile'"/>
    <mainMainStats v-if="showMain == 'Stats'"/>
    <mainChat/>
  </div>
</template>

<style scoped lang="scss">

#main_div{
  display:flex;
  justify-content: space-between;
  height: 100vh;
  //background-color: aqua;
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
