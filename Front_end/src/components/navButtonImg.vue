<template>
    <button @click="toggleAdditionalButton">
      <div ></div>
      <div>
              <img :src="image" v-if="image"/>
      </div>
      </button>
</template>

<script scoped lang="ts">
export default {
  data(){
    return{
      image: localStorage.getItem('avatar')
      }
  },
  props:['title'],
  methods: {
    
    toggleAdditionalButton() {
      this.$emit('toggleAdditionalButton')
    }
  }
}
</script>

<style scoped lang="scss">
  img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .gradient{
    &:before{
        width: 200px;
        height: 200px;
    }
}

  button{
    display: flex;
    position:absolute;
    right: 0;
    border-radius: 110px;
    margin-top: -0;
  }
</style>