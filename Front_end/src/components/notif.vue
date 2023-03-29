<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;
    


    function confirmNotif(){
        if(store.getters.getInvite == true){
            const userConfirmed = confirm("Voulez-vous jouer avec cette personne?")
            if(userConfirmed){
                socket.emit('notif', store.getters.getNameNotif, false, true);
                //store.commit('setNameNotif', "");
                store.commit('setAcceptPlay', true);
                store.commit('setMatchmaking', false);
                router.push('/Play/start');
                //verifier nameNotif du store une fois dans la vue playStart
                //Une fois sur la vue du pong, le jeu attend que les joueurs aient choisi
                //leur option de customisation pour ce lancer
            }
            else{
                socket.emit('notif', store.getters.getNameNotif, false, false);
                store.commit('setAcceptPlay', false);
                store.commit('setNameNotif', "");
            }
        }
        else{
            if(store.getters.getAcceptPlay == true){
                alert('demande accept')
                //store.commit('setNameNotif', "");
                store.commit('setMatchmaking', false);
                router.push('/Play/start')
                //verifier nameNotif du store une fois dans la vue playStart
                //Une fois sur la vue du pong, le jeu attend que les joueurs aient choisi
                //leur option de customisation pour ce lancer
            }
            else{
                alert('demande refus')
                store.commit('setNameNotif', "");
            }
        }    
    }
</script>

<template>
    <button @click="confirmNotif()">
        <p v-if="!store.getters.getAcceptPlay">
            Le joueur {{ store.getters.getNameNotif }} vous invite a une partie
        </p>
        <p v-else>
            {{ store.getters.getNameNotif }} a repondu
        </p>
    </button>
</template>

<style scoped lang="scss">
p{
    color: red;
}
</style>