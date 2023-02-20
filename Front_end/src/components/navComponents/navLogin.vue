<template>
    <button class="navButton" id="navLoginButton" v-on:click="click">
        <span>
            LOGIN
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
                this.$router.push('/Login')
        }
    }
}
</script>

<style scoped lang="scss">
#navLoginButton{
    background-color: rgb(0, 252, 38);
}
.navButton{
    width: auto;
    height: 3em;
}
</style>