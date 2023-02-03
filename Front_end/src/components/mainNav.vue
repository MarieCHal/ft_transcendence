<template>
      <div class="glow-button">
        <div class="gradient"></div>
        <span>
          <nav>
          </nav>
       </span>
      </div>
</template>

<script scoped lang="ts">
  export default{
    data() {
        return {
        isDropdownOpen: false,
        IsDropdownOpen: false
        }
    }
  }
</script>

<style scoped lang="scss">

.glow-button{
    width: 100px;
    font-size: 32px;
    border-radius: 2%;
    height: 900px;

.gradient{
  &:before {
    height: 900px;
    width: -900px;
  }
}

span {
    width: inherit;
    }
}
</style>