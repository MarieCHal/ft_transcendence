<template>
    <button class="navButton"  v-on:click="click">
        <span>
            Play
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
                this.$router.push('/Play')
        }
    }
}
</script>

<style scoped lang="scss">

</style>