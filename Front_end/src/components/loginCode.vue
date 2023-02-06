<script setup lang="ts">
  import axios from 'axios';
</script>

<template>
  <div>
    <form>
      <input type="text" name="code" autocomplete="off"
        minlength="4" placeholder="code"
        v-model="Code" @keyup="submitfonction">
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
                Code: '',
                StatusCode: false,
                MessageError: ''
            }
        },

    methods:{ 
      submitfonction(){
          const newData = {
            Code: this.Code
          }
          this.checkCode(newData);
      },

      async checkCode(data: any)
      {
        try {
          if (this.Code.length === 4){
            const response = await axios.post("http://c1r2s3:3000/login/code", data);
            if (response.status == 201){
              this.$router.push("/main")
            }
          }
        } catch (error) {
          if (error.response.status != 201)
          {
            this.MessageError = error.response.data.message ;
            this.StatusCode = true;
          }
        }
      }
    }
  }
</script>
