<template>
    <div class="glow-div" v-on:click="clicklogin">
        <div class="gradient-div"></div>
        <span class="span-div">
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
.glow-div{
    --button-background: #09041e;
    --button-color: #fff;
    --button-shadow: rgba(33, 4, 104, 0.2);
    --button-shine-left: rgba(120, 0, 245, 0.5);
    --button-shine-right: rgba(200, 148, 255, 0.65);
    --button-glow-start: #b000e8;
    --button-glow-end: #009ffd;

    display: flex;
    appearance: none;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 32px;
    font-weight: 500;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    color: var(--button-color);
    width: 300px;
    height: 300px;
    background: none;
    z-index: 1;
    box-shadow: 0 8px 20px var(--button-shadow);
.gradient-div{
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    transform: scaleY(1.02) scaleX(1.005) rotate(-0.35deg);

  &:before {
    content: "";
    position: absolute;
    top: 15%;
    left: 0;
    right: 0;
    transform: scale(1.05) translateY(-44px) rotate(0deg) translateZ(0);
    padding-bottom: 100%;
    background: linear-gradient(
        90deg,
        var(--button-shine-left),
        var(--button-shine-right)
    );
    animation: rotate linear 2s infinite;
  }
}
.span-div {
    text-align: center;
    line-height: 890%;
    z-index: 1;
    position: relative;
    bottom: 0.59%;
    display: block;
    width: inherit;
    height: 304px;
    border-radius: inherit;
    background-color: var(--button-background);
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
}

&:hover {
    --button-glow-opacity: 1;
    --button-glow-duration: 0.25s;
    --button-background: #0c0529;
}
}

@keyframes rotate {
  to {
    transform: scale(1.05) translateY(-44px) rotate(360deg) translateZ(0);
  }
}
</style>