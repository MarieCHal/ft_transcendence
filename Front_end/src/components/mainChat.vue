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
    align-self: flex-end;
    flex-direction: column;
    align-items: flex-end;
}
</style>