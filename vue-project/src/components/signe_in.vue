<template>
    <div>
        <form @submit.prevent="submitfonction">
            <img type="image" id="image" alt="Login"
            src="../assets/1.webp">
            <input type="Firstname" name="Firstname" placeholder="Firstname" required v-model="Firstname">
            <input type="Lastname" name="Lastname" placeholder="Lastname" required v-model="Lastname">
            <input type="Nickname" name="Nickname" placeholder="Nickname" required v-model="Nickname">
            <input type="email" name="Email" placeholder="Email" required v-model="Email">
            <input type="Password" name="Password" placeholder="Password"  required v-model="Password">
            <input type="Password" name="Password" placeholder="VerifPassword"  required v-model="VerifPassword">
            <button class="glow-button">
            <div class="gradient"></div>
            <span>
              submit 
            </span> 
            </button>
        </form>
    </div> 
</template>

<script lang="ts">
    export default{
        data(){
            return{
                Firstname: '',
                Lastname: '',
                Nickname: '',
                Email: '',
                Password: '',
                VerifPassword: ''
            }
        },

    methods:{ 
      submitfonction(){
        console.log('salut')
      },
      codefonction: function(event: any){
          this.$router.push('/about')
        }
      }
    }
</script>

<style scoped lang="scss">

img{
    max-width: 100px;
    border-radius: 50px;
    display: block;
    margin: auto;
    
}
</style>