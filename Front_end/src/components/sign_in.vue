<script setup lang="ts">
  import axios from 'axios';
  import submit from '../components/submit.vue'
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
            <input type="text" name="Firstname" placeholder="Firstname" autocomplete="off" required v-model="Firstname">
            <input type="text" name="Lastname" placeholder="Lastname" autocomplete="off" required v-model="Lastname">
            <input type="text" name="Nickname" placeholder="Nickname" autocomplete="off" required v-model="Nickname">
            <input type="email" name="Email" placeholder="Email" autocomplete="off" required v-model="Email">
            <input type="password" name="Password" placeholder="Password" autocomplete="off" required v-model="Password">
            <input type="password" name="Password" placeholder="VerifPassword" autocomplete="off" required v-model="VerifPassword">
            <submit/>
        </form>
        <div id="statuscode" v-if="StatusCode">
          <p> {{ MessageError }} </p>
        </div>
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
                VerifPassword: '',
                StatusCode: false,
                MessageError: ''
            }
        },

    methods:{ 
      submitfonction(){
        if (this.Password == this.VerifPassword)
        {
          //console.log(this.image, this.Firstname, this.Lastname, this.Nickname, this.Email, this.Password)
          const newData = {
            Firstname: this.Firstname,
            Lastname: this.Lastname,
            Nickname: this.Nickname,
            Email: this.Email,
            Password: this.Password,
          }
          this.__submitAxiosSignIn(newData);
        }
      },

      async __submitAxiosSignIn(data: any){
        try {
          const response = await axios.post("http://c1r2s3:3000/sign-in", data);
          if (response.status == 201){
            this.$router.push("/login")
          }
        } catch (error) {
          if (error.response.status != 201)
          {
            this.MessageError = error.response.data.message ;
            this.StatusCode = true;
          }
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
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: cover;
    display: block;
    margin: auto;
    border-radius: 50px;
  }
  .file-select > input {
    display: none;
  }
</style>