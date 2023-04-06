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
        <div id="nickname">
            {{ store.getters.getNickname }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.img{
    max-width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: none;
    inset: 0;
    animation: pulse 2s infinite;
    box-shadow: 0 0 20px rgba(0, 233, 177, 1);
}

@keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(3, 112, 116, 0.7);
    }
    100% {
      box-shadow: 0 0 0 10px rgba(0, 233, 177, 0);
    }
  }
</style>