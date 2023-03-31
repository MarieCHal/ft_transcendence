<script  setup lang="ts">
    import axios from 'axios'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'

    const store = useStore();
    console.log('user', store.getters.getOneUser.user_user_id);

    onMounted(async () => {
        try {
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.get(`/users/match-history/${store.getters.getOneUser.user_user_id}`, {headers});
            store.commit('setMatchHistory', response.data);
            console.log('matchhistory', store.getters.getMatchHistory);
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
    <h1>match history</h1>
    <div v-for="(match, index) in store.getters.getMatchHistory" :key="index">
        <div>
            Partie numero: {{ index + 1}}, jouee le {{ match.date }} , joueur 1: {{ match.player1 }}, joueur 2: {{ match.player2 }}, score: {{ match.score }}
        </div>
        
    </div>
</template>

<style scoped lang="scss">

</style>