<script setup lang="ts">
    import userButtonAll from "../components/button/userButtonAll.vue"
    import userButtonFriends from "../components/button/userButtonFriends.vue"
    import oneUserButton from "../components/button/oneUserButton.vue"
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'

    const router = useRouter();
    const store = useStore();

    function clickCheckWhat(what: string){
        if(what == 'all'){
            store.commit('setWhat', what);
        }
        else if(what == 'friends'){
            store.commit('setWhat', what);
        }
    }
        
    onMounted(async () => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.get("/users/all", {headers});
            store.commit('setAllUsers', response.data);
        } catch (error: any) {
            console.log(error);
            //alert(error);
            /*setTimeout(() => {
                window.location.reload();
            }, 1000);*/
        }
    });

</script>

<template>
    <div id="mainUsers">
        <div class="navUser">
            <userButtonAll @click="clickCheckWhat('all')"/>
            <userButtonFriends @click="clickCheckWhat('friends')"/>
        </div>
        <oneUserButton v-if="store.getters.getWhat == 'all'"/>
        <oneUserButton v-if="store.getters.getWhat == 'friends'"/>
    </div>
  </template>

<style scoped lang="scss">
#mainUsers{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
    background-color: aquamarine;
}
.navUser{
    display: flex;
    flex-direction:row;
    justify-content: center;
    max-height: 5em;
    background-color: darkblue;
}
</style>