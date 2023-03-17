<script setup lang="ts">
    import capsuleUsers from '@/components/usersComponents/capsuleUsers.vue';
    import capsuleFriends from '@/components/usersComponents/capsuleFriends.vue';
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import Cookies from 'js-cookie';
    import ButtonFriendsUsers from '@/components/usersComponents/buttonFriendsUsers.vue'

    const router = useRouter();
    const store = useStore();
    
    onMounted(async () => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const response = await axios.get("http://c1r2s3:3000/users/all", {headers});//FAIRE TRY CATCH
        //const response = await axios.get("http://localhost:3000/users");
        store.commit('setUsers', response.data);
     
    });

function getshowUsers(){
    return store.getters.getShowUsers
}

</script>

<template>
    <div id="mainUsers">
        <ButtonFriendsUsers />
      <div v-if="getshowUsers() == true">
        <capsuleFriends />
      </div>
      <div v-else>
        <capsuleUsers />
      </div>
    </div>
  </template>

<style scoped lang="scss">
#mainUsers{
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    color: black;
}
img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
  }
#capsule{
    width: 15em;
    max-height: 5em;
    //background-color: aquamarine;
}
#nickname{
    padding-left: 10px;
}
.dataUser{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    background-color: aqua;
}
.buttonUser{
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
    color: lightgrey;
    //background-color: burlywood;
}
.elementCaps{
    margin: 5px;
    align-items: center;
  }
.nicknameStatus{
    display: flex;
    padding-left: 5px;
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