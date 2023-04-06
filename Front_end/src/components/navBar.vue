<script setup lang="ts">
    import navButtonLogo from "./button/navButtonLogo.vue"
    import navButtonUsers from "./button/navButtonUsers.vue"
    import navButtonProfile from "./button/navButtonProfile.vue"
    import navButtonChat from "./button/navButtonChat.vue"
    import navButtonPlay from "./button/navButtonPlay.vue"
    import navButtonLogout from "./button/navButtonLogout.vue"
</script>

<template>
    <nav class="nav">
        <navButtonLogo />
        <navButtonPlay id="button"/>
        <navButtonUsers id="button"/>
        <navButtonChat id="button"/>
        <navButtonProfile />
        <navButtonLogout id="button"/>
    </nav>
</template>


<style scoped lang="scss">
.nav{
    display: flex;
    margin-top: 10px;
    padding: 20px;
    //justify-content: space-between;
    //background-color: rgb(52, 147, 230);
}
</style>