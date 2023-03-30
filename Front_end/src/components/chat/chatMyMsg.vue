<script setup lang="ts">
    import { useStore } from "vuex"

    const store = useStore();
    console.log('myMsg ', store.getters.getMsg);
    let msg = store.getters.getMsg
</script>

<template>
    <div id="name">
        {{ msg.sender_nickname }}
    </div>
    <div id="corp">
        <div id="msg">
            {{ msg.messages_text }}
        </div>
        <div id="date">
            {{ msg.messages_createdAtTime }}
        </div>
    </div>
</template>

<style scoped lang="scss">

#name{
    text-decoration: underline;
    font-size:smaller;
    color: rgb(225, 117, 22);
}
#corp{
    display: flex;
    flex-direction: row;
    margin-top: 0.3rem;
}
#msg{
    word-wrap: break-word;
    overflow: hidden;
    background-color: darkkhaki;
}
#date{
    height: 0.7rem;
    width: 2.5rem;
    background-color: darkcyan;
    font-size: x-small;
    color: rgb(150, 147, 147);
}
</style>