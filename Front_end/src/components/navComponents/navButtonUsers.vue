<template>
    <button class="navButton" v-on:click="click">
        <span>
            Users
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
                this.$router.push('/Users')
        }
    }
}
</script>

<style scoped lang="scss">

</style>