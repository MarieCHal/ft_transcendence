<template>
    <button class="navButton" id="navProfileButton" v-on:click="click">
        <span>
            Profile
        </span>
    </button>
</template>

<script lang="ts">
    export default{
        data(){
            return{
            }
        },

        methods:{ 
            click(){
                this.$router.push('/Profile')
        }
    }
}
</script>

<style scoped lang="scss">
#navProfileButton{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgb(0, 252, 38);
    margin-left: auto;
}
</style>