<template>
    <button class="glow-button" @click="show = !show">
        <div class="gradient"></div>
        <div class="span">
            Channel
        </div>
    </button>
    <ul v-if="show">
        <li v-for="item in items">{{ item.text }}</li>
    </ul>
</template>

<script scoped lang="ts">
    export default {
    data() {
        return {
        show: false,
        items: [
            { text: 'Grubin' },
            { text: 'Mchalard' },
            { text: 'Jschreye' }
        ]
        }
    }
    }
</script>

<style scoped lang="scss">

ul{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0px;
    margin-top: 5px;
}

.glow-button{
    width: 70px;
    padding: 1px;
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