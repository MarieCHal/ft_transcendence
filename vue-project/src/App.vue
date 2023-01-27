<template> <ouais/> </template>

<script lang="ts">
  import ouais from "./components/login.vue";
export default {
    name: 'App',
    components: {ouais}
  }
</script>
<!--
<template>
    <div>
      <form action="" method="get">
          <input type="text" id="nickname" name="nickname" placeholder="login">
          <input type="password" id="pass" name="password" placeholder="Password">
          <input type="submit" id="lolo" value="Send Code">
      </form>
      <form action="" method="get">
        <input type="password" id="code" name="code"
        minlength="4" required placeholder="code">
      </form>
    </div>
</template>

<style scoped>
div{
  height: 100px;
  width: 100px;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  height: 50px;
  width: 200px;
  border-radius: 30px;
  background-color: aquamarine;
  margin-top: 10px;
}
::placeholder{
  text-align: center;
}
#lolo{

  height: 50px;
  width: 100px;
  color: white;
  font-weight: bold;
  background-color: rgb(232, 4, 232);
}
</style>
-->