<script setup lang="ts">
    import chatPrompt from "../components/chatPrompt.vue"
    import chatMsg from "../components/chatMsg.vue"
</script>

<template>
    <div id="mainChat">
        <chatMsg/>
        <chatPrompt/>
    </div>
</template>

<style scoped lang="scss">
#mainChat{
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: end;
    position: absolute;
    right: 0%;
    height: 100vh;
   // background-color: bisque;
}
</style>