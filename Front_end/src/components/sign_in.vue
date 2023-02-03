<script setup lang="ts">
  import axios from 'axios'
</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
          <label class="file-select">
              <div class="select-button">
                <img :src="image" v-if="image"/>
                <img src="../assets/super.png" v-else="image"/>
              </div>
              <input type="file" ref="file" @change="setImage"/>
            </label>
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
                image: '',
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
        if (this.Password == this.VerifPassword)
          console.log(this.image, this.Firstname, this.Lastname, this.Nickname, this.Email, this.Password)
          const newdata ={
            Firstname: this.Firstname,
              Lastname: this.Lastname,
              Nickname: this.Nickname,
              Email: this.Email,
              Password: this.Password
          }
          this.submitAxioSignin(newdata);
      },

      async submitAxioSignin(data: any){
        try {
          const reponse = await axios.post("http://localhost:3000/sign_in", data);
          console.log(reponse.status);
          if(reponse.status = 201){
            this.$router.push("/login");
          }
        } catch (error) {
          console.log(error);
        }
      },

      setImage(event: any) {
        this.image = URL.createObjectURL(event.target.files[0])
      }
    }
  }
</script>

<style scoped lang="scss">
  img{
      height: 100px;
      width: 100px;
      border-radius: 50px;
      display: block;
      margin: auto;
  }
  .file-select > input {
    display: none;
  }
</style>