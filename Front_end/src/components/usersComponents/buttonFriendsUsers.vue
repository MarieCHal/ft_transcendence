<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    const router = useRouter();
    const store = useStore();
    function click(bool: boolean){
        if (bool == true)
            store.commit('setShowUsers', true)
        else
            store.commit('setShowUsers', false)
    }
</script>
<template>
    <div>
        <button id="users" @click="click(false)">Users</button>
    </div>
    <div>
        <button id="friends" @click="click(true)">Friends</button>
    </div>
</template>

<style scoped lang="scss">
#users{
    background-color: blue;
    color: red;
    margin: 10px;
    border-radius: 10px;
}
#friends{
    background-color: blue;
    color: red;
    margin: 10px;
    border-radius: 10px;
}
</style>