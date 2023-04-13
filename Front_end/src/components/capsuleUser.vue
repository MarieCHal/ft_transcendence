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
    <div class="capsule">
        <div class="avatar" v-if="user.user_user_id != store.getters.getId" >
            <img :src="store.getters.getUserAvatar" />
            <div class="status-indicator" :class="{ 'status-online': user.user_isActive == 1, 'status-offline': user.user_isActive == 0, 'status-playing': user.user_isActive == 2}"></div>
        </div>
        <div class="info">
            <span>
                nickname = {{ user.user_nickname }}
            </span>
            <span>
                nb parties = {{ user.stats_games }}
            </span>
            <span>
                nb victoires = {{ user.stats_victories }}
            </span>
            <span>
                nb defaites = {{ user.stats_defeats }}
            </span>
        </div>
    </div>    
</template>

<style scoped lang="scss"> 
.info{
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

}
.avatar{
    display: flex;
    justify-content: space-between;
}
.capsule{
    display: flex;
    flex-direction: column;
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
.status-online {
    background-color: rgb(0, 255, 0);
}

.status-offline {
    background-color: red;
}

.status-playing {
    background-color: rgb(0, 179, 255);
}
</style>