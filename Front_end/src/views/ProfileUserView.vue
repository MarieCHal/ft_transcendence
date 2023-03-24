<script  setup lang="ts">
    //faire requete pour recuperer l'user sur le quel on a clicker
    import capsuleUser from '@/components/capsuleUser.vue';
    import friendRequest from "@/components/button/friendRequest.vue";
    import sendMsg from '@/components/button/sendMsg.vue';
    import playInvit from '@/components/button/playInvit.vue';
    //import { useStore } from "vuex"
    //const store = useStore();
    //const user = store.getters.getOneUser;

</script>

<template>
    <div class="mainProfileUser">
        <capsuleUser />
    </div>
    <div class="userButton">
        <friendRequest />
        <sendMsg />
        <playInvit />
    </div>
    <div class="ownerButton">

    </div>
</template>

<style scoped lang="scss">
.mainProfileUser{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    //background-color: gray;
}
</style>