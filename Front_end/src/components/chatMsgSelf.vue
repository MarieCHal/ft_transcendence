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
    border-radius: 11px 11px 0 11px;
    
    &:before{
        top: -10vh;
        left: -20vh;
        width: 50rem;
        height: 50rem;
        border-radius: 50%;
    }
}
div.span{
    padding: 5px;
    border-radius: 11px 11px 0 11px;
    width: inherit;
    text-align: right;
    overflow-wrap: break-word;
    background-color: rgb(139, 13, 61,);
}
</style>