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

</style>