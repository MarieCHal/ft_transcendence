<script  setup lang="ts">
    import FormModifProfil from "../components/form/formModifProfil.vue";
    import capsuleUser from '@/components/capsuleUser.vue';
    import doubleAuth from '../components/button/doubleAuth.vue'
    import listFriendsRequest from "@/components/listFriendsRequest.vue";
    import { useStore } from "vuex"

    const store = useStore();
    const user = store.getters.getOneUser;

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
    background-color: cyan;
}
.form{
    background-color: darkgray;
}
.caps{
    background-color: aqua;
}
.doubleAuth{
    height: 200px;
    background-color: greenyellow;
}
</style>