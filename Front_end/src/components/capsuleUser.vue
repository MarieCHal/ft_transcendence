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
        <div class="notMe" v-if="user.user_user_id != store.getters.getId" >
            <div >
                <img :src="store.getters.getUserAvatar" />
            </div>
            <div>
                user_nickname = {{ user.user_nickname }}
                <div class="status-indicator" :class="{ 'status-online': user.users_isActive, 'status-offline': !user.users_isActive }"></div>
            </div>
        </div>
        <div>
            nb parties = {{ user.stats_games }}
        </div>
        <div>
            nb victoires = {{ user.stats_victories }}
        </div>
        <div>
            nb defaites = {{ user.stats_defeats }}
        </div>
    </div>    
</template>

<style scoped lang="scss">  
.notMe{
    background-color: aquamarine;
}
.capsule{

    background-color: darkmagenta;
}
img{
    max-width: 150px;
    height: 150px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: auto;
}

.status-online {
    background-color: green;
}

.status-offline {
    background-color: red;
}
</style>