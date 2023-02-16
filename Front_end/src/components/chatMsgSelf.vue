<template>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                Vil félon, où as-tu dissimulé le Graal Sacré ? Dans ton cul ! Tu paieras pour cet affront !
            </div>
        </div>
    </div>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                Mais je ne suis pas romain, merde !
            </div>
        </div>
    </div>
    <div id="msg">        
        <div class="glow-button">
            <div class="gradient"></div>
            <div class="span">
                Les placards sont fermés ! Vous allez retourner dans votre canfouine, au trot, et si la faim persiste, mangez des moustiques : c'est nourrissant, ça coûte rien, et ça débarrasse !
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#msg{
    align-self: flex-end;
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
    background-color: rgba(33, 3, 15, 0.7);
}
</style>