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
    <div class="card">
        <div>
            <capsuleUser />
        </div>
        <div class="userButton">
            <friendRequest />
            <sendMsg />
            <playInvit />
            <bloquer />
        </div>
    </div>
</template>

<style scoped lang="scss">


button{
    max-width: 100px;
	height: 30px;
	border-radius: none;
	width: 65px;
	color: rgb(122, 122, 122);
	border: none;
	letter-spacing: 1.5px;
	font-family: 'emoji';
    background:  none;
    margin: 5px;
    //background-color:  #06FFFF;
    cursor: pointer;
}
.userButton {
        display: flex;
        justify-content: flex-start; 
        gap: 10px;
        margin: 10px;
        height: 100%;
        border-top: 1px solid #06FFFF;
}

.card {
    position: static;
    background-color: rgba(123, 211, 211, 0.098);
    border-radius: 5px;
    box-shadow: 3.5px 3.5px 9px rgba(79, 200, 209, 0.94);
    padding: 20px;
    transition: opacity 0.2s ease-in-out;
    opacity: 0.8;
    width: 40%;
    max-width: 450px;
    min-width: 340px;
}
