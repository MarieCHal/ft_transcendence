<script  setup lang="ts">
    //faire requete pour recuperer l'user sur le quel on a clicker
    import capsuleUser from '@/components/capsuleUser.vue';
    import friendRequest from "@/components/button/friendRequest.vue";
    import sendMsg from '@/components/button/sendMsg.vue';
    import playInvit from '@/components/button/playInvit.vue';
    import bloquer from '@/components/button/bloquer.vue';
    import matchHistory from '@/components/matchHistory.vue';
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
        <bloquer />
    </div>
    <div>
        <matchHistory />
    </div>
</template>

<style scoped lang="scss">
.mainProfileUser{

}
</style>