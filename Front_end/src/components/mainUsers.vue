<script setup lang="ts">
  import axios from 'axios';
</script>

<template>
  <div class="glow-button" @click='toggleAdditionalButton'>
      <div class="gradient"></div>
          <div class="span">
            <ul>
              <li v-for="Nickname in prenoms">{{ prenoms }}</li>
            </ul>
      </div>
  </div>
</template>

<script scoped lang="ts">
export default {
  data(){
    return{
      prenoms: []
  }
},
methods: {
  async toggleAdditionalButton() {
      const response = await axios.get("http://c1r2s3:3000/users/all");
      this.prenoms = response.data
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
