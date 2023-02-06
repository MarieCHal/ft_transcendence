<template>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                c
            </div>
        </div>
    </div>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                cassdsDfszdfzsdfd
            </div>
        </div>
    </div>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                cassdfgsdfgsdfgsdfgsdfgsdfgsdgdsfgsdfgsdfgdsfgfghfghdfghdfghdfghdfghdfghdfghdfhdfghdfghdfghdfghdfghdfghfghgdhdfg
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#msg{
    
}
div.glow-button{
    max-width: 25rem;
    min-width: none;
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
    width: inherit;
    text-align: right;
    padding-right: 12px;
    padding-left: 12px;
    overflow-wrap: break-word;
}
</style>