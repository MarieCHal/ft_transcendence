<template>
    <div >
        <button class="navButton" @click="Quit()">
            X
        </button>
        <canvas id="pong" width="600" height="400"></canvas>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted, onUnmounted } from 'vue';

    const store = useStore();
    const router = useRouter();
    const socket = store.getters.getWebSocket;

    function Quit(){
        console.log("store.getters.getRoom === ", store.getters.getRoom)
        socket.emit("game", store.getters.getRoom, "quit");
    }
    
    
    onMounted(async () => {
        console.log("room =", store.getters.getRoom)
        socket.on("init" ,(ballx: number, bally: number, user1: number, user2: number) => {
            store.commit("setBallX", ballx)
            store.commit("setBallY", bally)
            store.commit("setUser1", user1)
            store.commit("setUser2", user2)
            
        }); 
        socket.emit("init")
        store.commit("setStatusCode", -1)
        socket.on('startgame', (player: number, status: any, trigger: boolean, msg: string) => {
        if(trigger == true){
            store.commit("setStatusCode", status)
            socket.off("startgame");
            socket.off("player");
            socket.off("game");
            socket.off("init");
            store.commit("setRoom", "")
            alert(msg);
            
            setTimeout(() =>{
                router.push("/")
            }, 1500);       
        }
            if (status == false){
                store.commit("setPlayer", player)
                store.commit("setGoPlay", status)
            }
            else{
                game();
                store.commit("setGoPlay", status)
                store.commit("setRoom", player)
            }
        });
        //console.log('isMatchmaking', store.getters.getMatchmaking)
        //console.log('isNameNotif', store.getters.getNameNotif)
        socket.emit('startgame', store.getters.getMatchmaking, store.getters.getNameNotif)
        store.commit('setNameNotif', "")
        socket.on("game", (ballx: number, bally: number, user1: number, user2: number, score1: number, score2: number ) => {      
               
            if (store.getters.getPlayer == 1){
                store.commit("setBallX", ballx)
                store.commit("setBallY", bally)
                //store.commit("setUser1", user1)
                store.commit("setUser2", user2)
                store.commit("setScoreUser1", score1)
                store.commit("setScoreUser2", score2)
            }
            else{
                store.commit("setBallX", 600 - ballx)
                store.commit("setBallY", bally)
                store.commit("setUser2", user1)
                //store.commit("setUser1", user2)
                store.commit("setScoreUser2", score1)
                store.commit("setScoreUser1", score2)
            }
        });
        socket.emit('game', "départ")
    });
    
    
    /// FONCTION POUR LE PONG !!!!!!!!!
    function game(){
        const cvs = document.getElementById("pong") as HTMLCanvasElement;
        const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;

    function end(){
        if (store.getters.getId == store.getters.getStatusCode){
            drawText("YOU WIN", cvs.width/3, cvs.height/2, store.getters.getColorText)
        }
        else{
            drawText("YOU LOSE", cvs.width/3, cvs.height/2, store.getters.getColorText)
        }
    }
    const user1 = {
        x: 10,
        y: cvs.height/2 - 100/2,
        width: 10,
        height: 100,
        color: store.getters.getColorRect1,
        score: 0,
    }
    const user2 = {
        x: cvs.width - 20,
        y: cvs.height/2 - 100/2,
        width: 10,
        height: 100,
        color: store.getters.getColorRect2,
        score: 0,
    }
    const ball = {
        x: cvs.width/2,
        y: cvs.height/2,
        radius: 8,
        color: store.getters.getColorBall
    }
    const net = {
        x: cvs.width/2 - 1,
        y: 0,
        width: 2,
        height: 10,
        color: store.getters.getColorNet,
    }
    function drawNet(){
        for(let i = 0; i <= cvs.height; i += 15){
            drawRect(net.x, net.y + i, net.width, net.height, net.color);
        }
    }
    function drawRect(x: number, y: number, w: number, h: number, color: any){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
    drawRect(0, 0, cvs.width, cvs.height, store.getters.getColorBackGround)
    function drawCircle(x: number, y: number, r: number, color: string){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }
    function drawText(text: any, x: number, y: number, color: string){
        ctx.fillStyle = color;
        ctx.font = "45px fantasy";
        ctx.fillText(text, x, y);
    }
    function render(){
       // user1.y = store.getters.getUser1;
        user2.y = store.getters.getUser2;
        ball.x = store.getters.getBallX;
        ball.y = store.getters.getBallY;
        user1.score = store.getters.getScoreUser1;
        user2.score = store.getters.getScoreUser2;

        drawRect(0, 0, cvs.width, cvs.height, store.getters.getColorBackGround);
        drawNet();
        drawText(user1.score, cvs.width/4, cvs.height/5, store.getters.getColorText);
        drawText(user2.score, 3*cvs.width/4, cvs.height/5, store.getters.getColorText);
        drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
        drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
        drawCircle(ball.x, ball.y, ball.radius, ball.color);
    }
    document.addEventListener("keydown", function(event) 
    {
        let rect = cvs.getBoundingClientRect();
        //let prop = rect.height/40;
        const speed = cvs.height/20;
        if (event.code == 'KeyW') // Touche "haut"
        { 
            if (user1.y > 0)
            {
                user1.y -= 10;
            }
        } 
        else if (event.code == 'KeyS') // Touche "bas"
        {
            if (user1.y < 300)
            {
                user1.y += 10;
            }
        }
        
        if (store.getters.getRoom){
            socket.emit('player', store.getters.getRoom , user1.y)
        }
    });
 
    function playgame(){
        //console.log('1')
        if (store.getters.getStatusCode < 0){
            render();
        }
        else{
            end();
        }  
    }
    if (store.getters.getStatusCode == -1){
        const framePerSeconde = 50;
        let interval = setInterval(playgame, 1000/framePerSeconde)
        store.commit("setInterval", interval)
    }
}
onUnmounted (async () => {
    clearInterval(store.getters.getInterval);
    store.commit("setInterval", 0);
    store.commit('setPlayStart', false);
});
</script>


<style scoped lang="scss">
#pong{
    width: 60%;
    height: auto;
}
</style>