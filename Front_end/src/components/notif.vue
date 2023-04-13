<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';
    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;
    
    function confirmNotif(){
        /*if(store.getters.getInvite == true){
            const userConfirmed = confirm("Voulez-vous jouer avec cette personne?")
            if(userConfirmed){
                socket.emit('notif', store.getters.getNameNotif, false, true);
                store.commit('setNameNotif', "");
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
                store.commit('setNameNotif', "");
                store.commit('setMatchmaking', false);
                router.push('/Play/start')
                //verifier nameNotif du store une fois dans la vue playStart
                //Une fois sur la vue du pong, le jeu attend que les joueurs aient choisi
                //leur option de customisation pour ce lancer
            }
            else{
                if (store.getters.getStatus == false){
                    alert('the user is logout or in a game')
                }
                else{
                    alert('demande refus')
                }
                store.commit('setNameNotif', "");
            }
        } */ 
        if (store.getters.getMsg == "invite"){
            const userConfirmed = confirm("Voulez-vous jouer avec cette personne?")
            if(userConfirmed){
                console.log("store.getters.getNameNotif invite =", store.getters.getNameNotif)
                socket.emit('notif', store.getters.getNameNotif, "reponse", "positif");
                store.commit('setName', store.getters.getNameNotif);
                store.commit('setNameNotif', "");
                store.commit('setAcceptPlay', true);
                store.commit('setMatchmaking', false);
                router.push('/Play/start');
                //verifier nameNotif du store une fois dans la vue playStart
                //Une fois sur la vue du pong, le jeu attend que les joueurs aient choisi
                //leur option de customisation pour ce lancer
            }
            else{
                console.log("store.getters.getNameNotif =", store.getters.getNameNotif)
                socket.emit('notif', store.getters.getNameNotif, "reponse", "negatif");
                store.commit('setAcceptPlay', false);
                store.commit('setNameNotif', "");
                alert('the user not accepted');
                return ;
            }
        }
        else if (store.getters.getMsg == "accepted"){
            console.log("store.getters.getNameNotif accepted =", store.getters.getNameNotif)
            console.log("je suis dans accepted")
            store.commit('setName', store.getters.getNameNotif);
            store.commit('setNameNotif', "");
            store.commit('setMsg', null);
            router.push('/Play/start');
        }
        else if (store.getters.getMsg == "refused"){
            alert('is not accepted')
             store.commit('setNameNotif', "");
            return ;
        }
        /*else if (store.getters.getMsg == "quit"){
            console.log("store.getters.getNameNotif =", store.getters.getNameNotif)
            console.log("je suis dans quit")
            alert('the user quit the game')
            store.commit('setNameNotif', "");
            return ;
        }*/

    }
</script>

<template>
    <button @click="confirmNotif()">
        <p v-if="store.getters.getMsg != 'accepted' && store.getters.getMsg != null">
            {{ store.getters.getNameNotif }} vous invite a une partie
        </p>
        <p v-else="store.getters.getMsg == 'accepted' && store.getters.getMsg != null">
            {{ store.getters.getNameNotif }} a accepter votre demande
        </p>
    </button>
</template>

<style scoped lang="scss">
p{
    color: red;
}
button{
    background: none;
    border: none;
}
</style>