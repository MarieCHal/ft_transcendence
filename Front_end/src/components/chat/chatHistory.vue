<script setup lang="ts">
    import chatMyMsg from "./chatMyMsg.vue";
    import chatHisMsg from "./chatHisMsg.vue";
    import { useStore } from "vuex"

    const store = useStore();
    console.log('history ', store.getters.getChatHistory);

</script>

<template>
    <div v-for="(msg, index) in store.getters.getChatHistory" :key="index">
        <div v-if="msg.messages_text" class="chat-messages" :class="{ 'chat-myMsg': msg.sender_user_id === store.getters.getId, 'chat-hisMsg': msg.sender_user_id != store.getters.getId}">
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
        </div>
    </div>
</template>

<style scoped lang="scss">
.chat-messages {
    display: flex;
    flex-direction: column;
    //background-color: cyan;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    overflow: auto;
}
.chat-myMsg{
    background-color: rgb(117, 74, 218);
}
.chat-hisMsg{
    background-color: rgb(22, 232, 15);
}
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