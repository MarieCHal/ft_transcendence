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
    <h1>Match history</h1>
    <div class="info" v-for="(match, index) in store.getters.getMatchHistory" :key="index">
        Partie: {{ index + 1}} du {{ match.date }}<br/> {{ match.player1 }} vs {{ match.player2 }} <br/>score: {{ match.score }}      
    </div>
</template>

<style scoped lang="scss">
.info{
    border: 1px solid rgba(79, 200, 209, 0.94);
    border-radius: 3px;
    padding: 5px;
    width: 11rem;
}
</style>