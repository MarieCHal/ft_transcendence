<script setup lang="ts">
    import chatPrompt from "../components/chatPrompt.vue"
    import chatMsgSelf from "./chatMsgSelf.vue"
    import chatMsgOther from "./chatMsgOther.vue"

</script>

<template>
    <div id="mainChat">
        <chatMsgOther/>
        <chatMsgSelf/>
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