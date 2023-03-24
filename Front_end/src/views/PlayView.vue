<template>
    <div>
        <div id="boutons">
            <div>
                <div>
                    <button id="InviteFriends" @click="getBool()" v-if="store.getters.getBool == false">
                        play
                    </button>
                    <div v-if="store.getters.getBool">
                        <pong />
                    </div>
                </div>
            </div>
            <div>
                <button id="InviteFriends" @click="submit" v-if="store.getters.getBool == false">
                    InviteFriends
                </button>
                <div id="user42">
                    <div id="user" v-for="(user, index) in getUsers()">
                        <button>
                                {{ user.nickname }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from "vuex"
    import axios from "axios";
    import pong from "../components/playComponents/pong.vue"

    const store = useStore();
    store.commit("setBool", false)



const submit = async () => {
    const response = await axios.get("http://c1r2s3:3000/users/all");
    store.commit('setUsers', response.data)

}

function getUsers(){
        return store.getters.getUsers;
    }

function getBool(){
    store.commit("setBool", true)

    return store.getters.getBool;
}

</script>

<style scoped lang="scss">

#user42{
    position: absolute;
    align-items: center;
    align-self: center;
    justify-content: center;
    left: 24%
}

#boutons{
    display: inline-flex;
    margin: 10%;
    flex-direction: column;
    align-items: center;
}

#Matchmaking{
    background-color: rgb(1, 1, 1);
    color: rgb(247, 247, 247);
    margin: auto;
}

#InviteFriends{
    background-color: rgb(1, 1, 1);
    color: rgb(247, 247, 247);
    margin: auto;
}
</style>