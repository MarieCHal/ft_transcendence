<script setup lang="ts">


</script>

<template>
    <div>
        <div id="logo"></div>
        <button class="navButton">
            <span id="login">
                Login
            </span>
        </button>
    </div>
</template>

<style scoped lang="scss">

div{
    display: flex;
    flex-direction: column;
    align-items:center ;
}

#login{
    cursor: pointer;
    text-decoration: underline;
}

#logo{
    background-image: url('../../assets/drawing.svg');
    height: 9em;
    width: 100%;
    background-size: cover;
    background-position: center;
    margin: 10px;
    max-width: 250px;
    max-height: 400px;
}

</style>

/*

    inset: 0;
    animation: pulse 1s infinite;
    box-shadow: 0 0 20px rgba(0, 233, 177, 1);

@keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 233, 177, 0.7);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(0, 233, 177, 0);
    }
  }