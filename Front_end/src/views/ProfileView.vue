<script setup lang="ts">
    import modifProfileButton from '../components/profileComponents/modifProfileButton.vue'
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    
    const router = useRouter();
    const store = useStore();
    let nickname = store.getters.getNickname;

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
        <br>
        <Span>
            {{ nickname }}
        </Span>
        <br>
        <Span>stats</Span>
        <modifProfileButton @click="click()"/>
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