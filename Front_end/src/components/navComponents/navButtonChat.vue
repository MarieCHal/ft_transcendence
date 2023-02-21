<template>
    <button class="navButton" v-on:click="click">
        <span>
            Chat
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
                this.$router.push('/Chat');
        }
    }
}
</script>

<style scoped lang="scss">

</style>