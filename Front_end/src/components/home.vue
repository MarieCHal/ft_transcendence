<template>
    <div class="glow-button" v-on:click="clicklogin">
        <div class="gradient"></div>
        <span class="span">
            42 Lausanne
        </span>
    </div>
</template>

<script lang="ts">
    export default{
    data() {
        return {};
    },
    methods: {
        clicklogin() {
            this.$router.push("/register");
        },
    },
}
  </script>

<style scoped lang="scss">
.glow-button{
    font-size: 32px;
    border-radius: 50%;
    width: 300px;
    height: 300px;
.gradient{
  &:before {
    top: 15%;
  }
}
span {
    text-align: center;
    line-height: 890%;
    bottom: 0.59%;
    width: inherit;
    height: 304px;
    }
}
</style>