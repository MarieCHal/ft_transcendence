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
        <navButtonPlay />
        <navButtonUsers />
        <navButtonChat />
        <navButtonProfile />
        <navButtonLogout />
    </nav>
</template>


<style scoped lang="scss">
.nav {
    display: flex;
    justify-content: space-between;
    background-color: rgb(52, 147, 230);
}
</style>