<template>
    <button class="glow-button"  @click="toggleAdditionalButton">
        <div class="gradient"></div>
        <div class="span">
           {{ title }}
        </div>
        </button>
</template>

<script scoped lang="ts">
export default {
  props:['title'],
  methods: {
    toggleAdditionalButton() {
      this.$emit('toggleAdditionalButton')
    }
  }
}
</script>

<style scoped lang="scss">
.glow-button{
    width: 70px !important;
    padding: 1px !important;
}
.gradient{
    &:before{
        width: 130px;
        height: 130px;
    }
}
.span{
    padding: 2px 0 !important;
}
</style>