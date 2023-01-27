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
            <p>confirme password </p>
            <input type="Password" name="Password" placeholder="Password"  required v-model="VerifPassword">
            <button> submit </button>
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

<style scoped>
div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  height: 50px;
  width: 200px;
  border-radius: 30px;
  background-color: aquamarine;
  margin-top: 10px;
}
::placeholder{
  text-align: center;
}
button{
  margin-top: 10px;
  border-radius: 30px;
  height: 50px;
  width: 100px;
  color: white;
  font-weight: bold;
  background-color: rgb(232, 4, 232);
}
p{
    color: rgb(250, 3, 3);
    margin-top: 10px;
}
#image{
    margin-top: 10px;
    max-width: 100px;
    border-radius: 50px;

}
</style>