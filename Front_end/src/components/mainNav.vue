<script setup lang="ts">
    import axios from 'axios';
    import navButton from "./navButton.vue";
    import navButtonImg from "./navButtonImg.vue";
</script>

<template>
    <div>
        <navButton class="navButton" title="Channel"  @click="toggleAdditionalButton('Channel')"/>
    </div>
    <div>
        <navButton class="navButton" title="Play"  @click="toggleAdditionalButton('Play')"/>
    </div>
    <div>
        <navButton class="navButton"  title="Users"  @click="toggleAdditionalButton('Users')"/>
    </div>
    <div>
        <navButtonImg class="navButton" title="Profile"  @click="toggleAdditionalButton('Profile')"/>
    </div>
    <div>
        <navButton class="navButton" title="Chat"  @click="toggleAdditionalButton('Chat')"/>
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
            toggleAdditionalButton(buttonName: any) {
            this.$emit('toggleAdditionalButton', buttonName)
            }
        },
    }
</script>
