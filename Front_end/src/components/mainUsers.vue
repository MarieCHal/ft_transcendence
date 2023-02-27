<script setup lang="ts">
  import axios from 'axios';
</script>

<template>
  <div class="glow-button" @click='toggleAdditionalButton'>
      <div class="gradient"></div>
        <div class="span">
          <ul>
            <li v-for="Nickname in prenoms">{{ Nickname.Nickname }}</li>         
          </ul>
          <ul>
            <li v-for="Avatar in Aatar">{{ Avatar.Avatar }}</li>         
          </ul>
      </div>
  </div>
</template>

<script scoped lang="ts">
export default {
  data(){
    return{
      prenoms: [],
      avatar: [],
      Aatar: ''
    }
  },
  methods: {
    async toggleAdditionalButton() {
      const response = await axios.get("http://c1r2s3:3000/users/all/profile");
      this.prenoms = response.data
      console.log(response.data)
      const res = await axios.get("http://c1r2s3:3000/users/all/avatar", {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(res.data.Avatar);
      this.Aatar = url;
      console.log("res =", url)
      //this.prenoms = response.data.map(user => ({Nickname: user.Nickname}));
    }
  }
}
</script>

<style scoped lang="scss">
div.glow-button{
  width: 100px;
}
div.gradient{
  transform: scaleY(1.003) scaleX(1.01) rotate(0deg);
  &:before {
      height: 1000px;
      width: 1000px;
      left: -400%;
  }
}
div.span{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>



  <style scoped lang="scss">
.glow-button{
top: 100px;
position: absolute;
left: 5px;
.gradient{
  transform: scaleY(1.003) scaleX(1.01) rotate(0deg);
  &:before {
    height: 900px;
    width: 900px;
    left: -400%;
    top: 5%;
  }
}
.span{
  height: 50vh;
  display: flex;
  flex-direction: column;
}
}
</style>
