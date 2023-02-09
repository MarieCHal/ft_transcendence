<script setup lang="ts">
  import axios from 'axios';
  import submit from '../components/submit.vue'
  import defaultImg from '../assets/super.png'

</script>

<template>
    <div>
        <form @submit.prevent="submitfonction">
          <label class="file-select">
            <div class="select-button">
              <img :src="image" v-if="image"/>
              <img src="../assets/super.png" v-else="image"/>
            </div>
            <input accept="image/.jpeg,image/.png" type="file" ref="file" @change="fileUpload($event)"/>
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
                FILE: '',
                Firstname: '',
                Lastname: '',
                Nickname: '',
                Email: '',
                Password: '',
                VerifPassword: '',

                image: '',
                StatusCode: false,
                MessageError: '',
            }
        },

    methods:{ 
      fileUpload(event: any){
        this.FILE = event.target.files[0];
        if (this.FILE)
          this.image = URL.createObjectURL(event.target.files[0]);
      },

      submitfonction(){
        if (this.Password == this.VerifPassword)
        {
          const formData = new FormData();
          formData.append('Avatar', this.FILE);
          formData.append('Firstname', this.Firstname);
          formData.append('Lastname', this.Lastname);
          formData.append('Nickname', this.Nickname);
          formData.append('Email', this.Email);
          formData.append('Password', this.Password);

          const config = {
            header: {
              'Content-Type' : 'multipart/form-data'
            }
          }
          this.__submitAxiosSignIn(formData, config);
        }
      },

      async __submitAxiosSignIn(formData: any, config: any){
        try {
          const response = await axios.post("http://c1r2s3:3000/sign-in", formData, config);
          if (response.status == 201){
            this.$router.push("/login")
          }
        } catch (error: any) {
          if (error.response.status != 201)
          {
            this.MessageError = error.response.data.message ;
            this.StatusCode = true;
          }
        }
      },
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