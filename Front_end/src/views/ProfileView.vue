<script setup lang="ts">
    import modifProfileButton from '../components/profileComponents/modifProfileButton.vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted } from 'vue'
    import stats from '../components/profileComponents/stats.vue'
    import doubleAuth from '../components/profileComponents/doubleAuthButton.vue'
    import friendRequest from '../components/profileComponents/friendRequest.vue'
    import logout from '../components/profileComponents/logout.vue'
    import Cookies from 'js-cookie';

    const router = useRouter();
    const store = useStore();
    let nickname = store.getters.getNickname;

    onMounted(async () => {
        const headers = { Authorization: `Bearer ${Cookies.get('auth_token')}` };
        const response = await axios.get("http://c1r2s3:3000/users/me", {headers});//FAIRE TRY CATCH
        store.commit('setItIsMe', response.data);
    });

    function click(){
        router.push('/Profile/modif');
    }
    function getAvatar(){
        return store.getters.getAvatar;
    }
</script>

<template>
    <div>
        <div >
            <img :src="getAvatar()"/>
        </div>
        <div>
            {{ nickname }}
        </div>
        <div>
            <stats />
        </div>
        <div>
            <doubleAuth />
        </div>
        <div>
            <friendRequest />
        </div>
        <div>
            <logout />
        </div>
        <div>
            <modifProfileButton @click="click()"/>
        </div>
    </div> 
</template>

<style scoped lang="scss">
  img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
  }
</style>