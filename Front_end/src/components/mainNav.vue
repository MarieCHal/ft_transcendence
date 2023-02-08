<script setup lang="ts">
    import navChan from "./navChan.vue";
    import navButton from "./navButton.vue";
</script>

<template>
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                <navChan/>
                <navButton class="navButton" title="Profile"  @click="toggleAdditionalButton('Profile')"/>
                <navButton class="navButton"  title="Help"  @click="toggleAdditionalButton('Help')"/>
                <navButton class="navButton"  title="Stats"  @click="toggleAdditionalButton('Stats')"/>
            </div>
        </div>
</template>

<script scoped lang="ts">
    export default {
        methods: {
            toggleAdditionalButton(buttonName: any) {
            this.$emit('toggleAdditionalButton', buttonName)
            }
        }
    }
</script>

<style scoped lang="scss">
div.glow-button{
    width: 100px;
    min-height: 50vh;
    max-height: 60vh;
}
div.gradient{
    transform: scaleY(1.003) scaleX(1.01) rotate(0deg);
    &:before {
        height: 900px;
        width: 900px;
        left: -400%;
    }
}
div.span{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.navButton{

}
</style>


<!--
    <style scoped lang="scss">
.glow-button{
  width: 100px;
  top: 40px;
  .gradient{
    transform: scaleY(1.003) scaleX(1.01) rotate(0deg);
    &:before {
      height: 900px;
      width: 900px;
      left: -400%;
      top: 5%;
    }
  }
  .span{
    height: 70vh;
    display: flex;
    flex-direction: column;
  }
}

</style>
-->