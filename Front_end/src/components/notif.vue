<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';
    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;
    
    function confirmNotif(){
        try {            
            if (store.getters.getMsg == "invite"){
                const userConfirmed = confirm("Voulez-vous jouer avec cette personne?")
                if(userConfirmed){
                    socket.emit('notif', store.getters.getNameNotif, "reponse", "positif");
                    store.commit('setName', store.getters.getNameNotif);
                    store.commit('setNameNotif', "");
                    store.commit('setAcceptPlay', true);
                    store.commit('setMatchmaking', false);
                    router.push('/Play/start');
                }
                else{
                    socket.emit('notif', store.getters.getNameNotif, "reponse", "negatif");
                    store.commit('setAcceptPlay', false);
                    store.commit('setNameNotif', "");
                    alert('the user not accepted');
                    return ;
                }
            }
            else if (store.getters.getMsg == "accepted"){
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
        } catch (error) {
            store.commit('setError', error);
            router.push('/error');
        }
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

</style>