<template>
    <button class="navButton" v-on:click="click">
        <span>
            Chan
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
                this.$router.push('/Chan')
        }
    }
}
</script>

<style scoped lang="scss">

</style>