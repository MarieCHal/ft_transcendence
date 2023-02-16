<template>
    <div id="prompt">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                La seule solution pour que ce soit encore plus sale, ça serait de demander aux clients de chier directement par terre ! Je vois que ça.
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#prompt{
    display: flex;
}
div.gradient{
    transform: scaleY(1.02) scaleX(1.005) rotate(0deg);
    &:before{
        top: -100vh;
        left: -100vh;
        width: 120rem;
        height: 120rem;
        border-radius: 50%;
    }
}
div.span{
    text-align: right;
    padding-right: 12px;
    padding-left: 12px;
    overflow-wrap: break-word;
    width: 25rem;
}
</style>