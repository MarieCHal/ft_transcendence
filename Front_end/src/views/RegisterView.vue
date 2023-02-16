<script setup lang="ts">
  import registerlogin from "../components/registerLogin.vue";
  import registersignin from "../components/registerSignIn.vue";
</script>

<template>
      <div>
        <registerlogin/>
        <registersignin/>
      </div>
</template>

<style scoped lang="scss">
div{
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>