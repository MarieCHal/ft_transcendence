<script setup lang="ts">
    import { useStore } from "vuex"

    const store = useStore();
    const me = store.getters.getItIsMe;
</script>

<template>
    <div id="capsule">
        <div>
            vous avez joué {{ me.stats_games}} parties!
        </div>
        <div>
            vous avez gagné {{ me.stats_victories }} parties!
        </div>
        <div>
            vous avez perdu {{ me.stats_defeats }} parties!
        </div>
    </div>

</template>

<style scoped lang="scss">
    
</style>