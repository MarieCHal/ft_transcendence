<template>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                Ouais, alors là où je vois que je suis vraiment à cran, c'est que quand vous avez dit malédiction, j'ai fait une série de tout petits pets comme ça : pft pft pft pft pft pft.
            </div>
        </div>
    </div>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                Je dirais que ma vie ne représente pas la période la plus captivante de mon existence.
            </div>
        </div>
    </div>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                Non mais c'est à se coincer les parties dans une porte !
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#msg{
    align-self: flex-start;
}
div.glow-button{
    max-width: 25rem;
    min-width: none;
}
div.gradient{
    transform: scaleY(1.02) scaleX(1.005) rotate(0deg);
    border-radius: 0 11px 11px 11px;
    
    &:before{
        top: -10vh;
        left: -20vh;
        width: 50rem;
        height: 50rem;
        border-radius: 50%;
    }
}
div.span{
    padding: 3px;
    border-radius: 0 11px 11px 11px;
    width: inherit;
    text-align: right;
    overflow-wrap: break-word;
    background-color: rgba(4, 139, 38, 0.703);
}
</style>