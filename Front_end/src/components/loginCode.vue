<template>
    <input type="text" name="code"
      minlength="4" placeholder="code"
      v-model="code" @keyup="codefonction">
</template>

<script lang="ts">
    export default{
        data(){
            return{
                code: ''
            }
        },
    methods:{ 
      codefonction: function(event: any){
        console.log(this.code)
        if (this.code == '1234'){
          console.log('log ')
          this.$router.push('/main')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
div{

}
</style>