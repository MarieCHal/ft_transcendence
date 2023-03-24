<script  setup lang="ts">
    import { useStore } from "vuex"
    import router from '@/router'
    import axios from "axios";

    const store = useStore();

    async function clickCheckWhat(what: string){
        try {
            store.commit('setWhat', what);
            const headers = { Authorization: `Bearer ${store.getters.getToken}` };
            const response = await axios.get(`/users/profile/${store.getters.getId}`, {headers});
            store.commit('setOneUser', response.data);
            console.log('OneUser in navButtonProfile = ', store.getters.getOneUser);
            router.push('/Profile/me');
        } catch (error: any) {
            console.log(error);
        }
    }

</script>

<template>
    <div class="avatarButton">
        <button class="img" @click="clickCheckWhat('me')" :style="{ backgroundImage: 'url(' + store.getters.getAvatar + ')' }">
            <img :src="store.getters.getAvatar" />
        </button>
            {{ store.getters.getNickname }}
    </div>
</template>

<style scoped lang="scss">
.img{
  max-width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
img{
  display: none;
}
.avatarButton{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
}
</style>