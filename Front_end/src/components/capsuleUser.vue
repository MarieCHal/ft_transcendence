<script  setup lang="ts">
//faire requete pour recuperer l'user sur le quel on a clicker
    import { useStore } from "vuex"
    import { onMounted, ref } from 'vue';
    import getAvatar from '../getAvatar'

    const store = useStore();
    const user = store.getters.getOneUser;

    onMounted(async () => {
        getuserAvatar(user.user_user_id)
    });
    console.log('me', user);
    async function getuserAvatar(userId: number) {
        try {
            const url = await getAvatar(store, userId);
            store.commit('setUserAvatar', url);
        } 
        catch (error) {
            console.error(error);
        }
    }

</script>

<template>
    <div>
        <div class="capsule" v-if="user.user_user_id != store.getters.getId" >
            <div class="dispo">
                <img :src="store.getters.getUserAvatar" />
            </div>
            <div class="status-indicator" :class="{ 'status-online': user.user_isActive, 'status-offline': !user.user_isActive }"></div>
        </div>
        <div class="dispo">
            user_nickname = {{ user.user_nickname }}
        </div>
        <div class="dispo">
            nb parties = {{ user.stats_games }}
        </div>
        <div class="dispo">
            nb victoires = {{ user.stats_victories }}
        </div>
        <div class="dispo">
            nb defaites = {{ user.stats_defeats }}
        </div>
    </div>    
</template>

<style scoped lang="scss">  

.capsule{
    display: flex;
}

img{
    max-width: 150px;
    height: 150px;
    border-radius: 50%;
}

.status-indicator {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.dispo{
    margin: 5px;
}
.status-online {
    background-color: rgb(0, 255, 0);
}

.status-offline {
    background-color: red;
}
</style>