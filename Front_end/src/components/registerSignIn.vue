<template>
    <button class="glow-button" v-on:click="clickSigne_In">
        <div class="gradient"></div>
        <span>
        Sign In 
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
            clickSigne_In(){
                this.$router.push('/sign_in')
        }
    }
}
</script>