<script setup lang="ts">
    import capsule from '@/components/usersComponents/capsule.vue';
    import blockUser from '@/components/usersComponents/blockUser.vue';
    import invitFriends from '@/components/usersComponents/invitFriends.vue';
    import invitPlay from '@/components/usersComponents/invitPlay.vue';
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'

    const router = useRouter();
    const store = useStore();
    
    onMounted(async () => {
        console.log("je suis la"); 
        const response = await axios.get("http://c1r2s3:3000/users/avatars");//FAIRE TRY CATCH
        //const response = await axios.get("http://localhost:3000/users");
        store.commit('setUsers', response.data);
        console.log(store.getters.getUsers[0].avatar);
    });
    function getUsers(){
        return store.getters.getUsers;
    }
</script>

<template>
    <div id="mainUsers">
        <div id="capsule" v-for="(user, index) in getUsers()" :key="index">
            <div class="elementCaps" id="avatar">
                <img :src="user.avatar" alt="">
            </div>
            <div class="elementCaps">
                <div id="nickname">
                    {{ user.nickname }}
                </div>
                <div class="status-indicator" :class="{ 'status-online': user.status, 'status-offline': !user.status }"></div>
            </div>
            <div class="elementCaps">
                <div id="nbParties">
                    nb parties: {{ user.nbParties }}
                </div>
                <div id="nbVictory">
                    nb victory: {{ user.nbVictory }}
                </div>
                <div id="nbDefeat">
                    nb defeat: {{ user.nbDefeat }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#mainUsers{
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
}
  img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
  }
  #capsule{
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    border-radius: 10px;
    width: 20em;
    max-height: 8em;
    background-color: aqua;
    color: black;
    margin: 5px;
  }
  .elementCaps{
    margin: 5px;
    align-items: center;
  }
  .status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.status-online {
  background-color: green;
}

.status-offline {
  background-color: red;
}
</style>