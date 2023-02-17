<template>
    <button class="glow-button" @click="toggleAdditionalButton">
      <div class="gradient"></div>
      <div class="span">
              <img :src="image" v-if="image"/>
      </div>
      </button>
</template>

<script scoped lang="ts">
export default {
  data(){
    return{
      image: localStorage.getItem('Avatar')
      }
  },
  props:['title'],
  methods: {
    
    toggleAdditionalButton() {
      console.log(localStorage.getItem('accessToken'));
      this.$emit('toggleAdditionalButton')
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
    margin: auto;
    border-radius: 50px;
  }

  .gradient{
    &:before{
        width: 200px;
        height: 200px;
    }
}

  button{
    position: fixed;
    right: 10px;
    border-radius: 100px;
  }
</style>