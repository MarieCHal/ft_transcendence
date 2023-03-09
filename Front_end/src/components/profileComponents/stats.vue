<script setup lang="ts">
    import { useStore } from "vuex"

    const store = useStore();
    const me = store.getters.getItIsMe;
</script>

<template>
    <div id="capsule">
        <div>
            vous avez joué {{ me.nbParties}} parties!
        </div>
        <div>
            vous avez gagné {{ me.nbVictory }} parties!
        </div>
        <div>
            vous avez perdu {{ me.nbDefeat }} parties!
        </div>
    </div>

</template>

<style scoped lang="scss">
    
</style>