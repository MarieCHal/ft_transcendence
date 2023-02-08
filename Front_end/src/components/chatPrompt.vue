<template>
    <div id="prompt">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                promptdsdfgdsfsdfsdfsdfsdfsadfsdfsadfasdf
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#prompt{
    display: flex;

}
div.glow-button{


}

div.gradient{
    transform: scaleY(1.02) scaleX(1.005) rotate(0deg);
    &:before{
        top: -10vh;
        left: -20vh;
        width: 50rem;
        height: 50rem;
        border-radius: 50%;
    }
}
div.span{
    text-align: right;
    padding-right: 12px;
    padding-left: 12px;
    overflow-wrap: break-word;
    max-width: 25rem;
}
</style>