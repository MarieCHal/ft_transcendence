
<script setup lang="ts">
    import axios from "axios";
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;

    function goMatchmaking(){
        store.commit('setMatchmaking', true);
        router.push('/Play/start');
    }

    const submit = async () => {
        const headers = { Authorization: `Bearer ${store.getters.getToken}`};
        const response = await axios.get("http://c1r2s3:3000/users/all", {headers});
        store.commit('setUsers', response.data.allUsers)
        console.log('user store', store.getters.getUsers)
    }

    const play = async (userId: number) =>{
        socket.emit('notif', userId, true);
    }
</script>

<template>
    <div class="playButtonContainer">
        <div class="playButton">
            <button class="playButton" id="InviteFriends" @click="goMatchmaking()">
                Matchmaking
            </button>
        </div>
        <div class="playButton">
            <button class="playButton" @click="submit">
                InviteFriends
            </button>
            <div v-for="(user, index) in store.getters.getUsers">
                <button class="playButton" v-if="user.user_isActive == 1" @click="play(user.user_user_id)">
                    {{ user.user_nickname }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.playButtonContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh; /* Assure que le conteneur occupe la hauteur de la fenêtre */
}

.playButton {
    width: auto;
    margin: 10px;
    align-items: center;
    justify-content: center;
    color: darkcyan;
    background: none;
    border: none;
    font-size: large;
    letter-spacing: 1.5px;
    cursor: pointer;
}

.playButton:hover {
    color: #e6e6e6;
}
</style>