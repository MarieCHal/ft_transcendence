<script setup lang="ts">
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"

    const router = useRouter();
    const store = useStore();
    let nickname = store.getters.getNickname;

    function getAvatarStore(){
        return store.getters.getAvatar;
    }
    const fileUpload = async (event: any) => {
        const file = event.target.files[0];
        const avatar = URL.createObjectURL(file);
        
        if (store.getters.getAvatar != avatar)
        {
            try {
                const formData = new FormData();
                formData.append("avatar", file);
                const headers = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${store.getters.getToken}`
                };
                const response = await axios.post('/profile/modify/avatar',
                formData,
                { headers }
                );
                if (response.status == 201)
                {
                    store.commit('setAvatar', avatar);
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    }
    const nicknameUpload = async () => {
        if (store.getters.getNickname != nickname){
            try {
                const headers = {"Authorization": `Bearer ${store.getters.getToken}`};
                const data = {nickname: nickname};
                const response = await axios.post('profile/modify/nickname', data, {headers})
                if (response.status == 201)
                {
                    store.commit('setNickname', nickname);
                    router.push('/Profile/me')
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    }
</script>

<template>
        <form class="formModifProfile" @submit.prevent="nicknameUpload">
            <span>
                modif
            </span>
            <div>
                <label class="file-select">
                    <div class="select-button">
                        <img :src="getAvatarStore()" v-if="getAvatarStore()"/>
                    </div>
                    <input accept="image/.jpeg,image/.png" type="file" ref="file" @change="fileUpload($event)"/>
                </label>
            </div>
            <div class="submit">
                <input class="navButton" type="text" name="Nickname" placeholder="Nickname" autocomplete="off" required v-model="nickname">
                <button class="navButton">
                    submit nickname
                </button>
            </div>
        </form>
</template>

<style scoped lang="scss">
span{

    //text-align: center;
    
}
.formModifProfile{

    //background-color: darkslateblue;
}
.submit{

}
img{
    width: 100px;
    height: 100px;
    display: block;
    margin: auto;
    border-radius: 50px;
}
.file-select > input {
display: none;
}
</style>