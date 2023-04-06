<script  setup lang="ts">
    import FormModifProfil from "../components/form/formModifProfil.vue";
    import capsuleUser from '@/components/capsuleUser.vue';
    import doubleAuth from '../components/button/doubleAuth.vue'
    import listFriendsRequest from "@/components/listFriendsRequest.vue";
    import matchHistory from '@/components/matchHistory.vue';
    import { useStore } from "vuex"
    import { onMounted, onUnmounted } from 'vue';
    import axios from "axios";


    const store = useStore();
    onMounted(async () => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}` };
        const response = await axios.get("/users/me", {headers});
        store.commit('setMe', response.data);
        console.log('oneUser myProfile',  response.data)
    });

</script>

<template>
    <div class="ProfileUser">
        <div class="form">
            <FormModifProfil />
        </div>
        <div class="caps">
            <capsuleUser />
        </div>
        <div class="doubleAuth">
            <doubleAuth />
        </div>
        <div class="listFriendsRequest">
            <listFriendsRequest />
        </div>
    </div>

</template>

<style scoped lang="scss">
.ProfileUser{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>