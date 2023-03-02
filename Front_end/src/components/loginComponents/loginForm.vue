<script setup lang="ts">
    import axios from 'axios'

</script>

<template>
    <div>
        <h1>LoginPage</h1>
    </div>
    <div>
      <form @submit.prevent="submitfonction">
        <input type="text" name="Nickname" placeholder="Nickname" autocomplete="off" required v-model="Nickname">
        <input type="password" name="Password" placeholder="Password" autocomplete="off" required v-model="Password">
        <input type="submit" value="Send Request" />
      </form>
      <div id="statuscode" v-if="StatusCode">
        <p> {{ MessageError }} </p>
      </div>
    </div>
</template>

<script  lang="ts">
    export default{
    data(){
        return{
            FILE: '',
            Nickname: '',
            Password: '',

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

          const formData = new FormData();
          formData.append('Avatar', this.FILE);
          formData.append('Nickname', this.Nickname);
          formData.append('Password', this.Password);

          const config = {
            header: {
              'Content-Type' : 'multipart/form-data'
            }
          }
          this.__submitAxiosSignIn(formData, config);
      },

      async __submitAxiosSignIn(formData: any, config: any){
        try {
          const response = await axios.post("http://c1r2s3:3000/sign-in", formData, config);
          if (response.status == 201){
            this.$router.push("/")
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