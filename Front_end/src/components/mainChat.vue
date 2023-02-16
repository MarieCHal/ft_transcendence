<script setup lang="ts">
    import chatPrompt from "../components/chatPrompt.vue"
    import chatMsgSelf from "./chatMsgSelf.vue"
    import chatMsgOther from "./chatMsgOther.vue"

</script>

<template>
        <chatMsgOther/>
        <chatMsgSelf/>
        <chatPrompt/>
</template>

<style scoped lang="scss">

</style>