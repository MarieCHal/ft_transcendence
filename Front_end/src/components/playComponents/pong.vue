<template>
    <div>
        <button @click="Quit()">
            X
        </button>
    </div>
    <div id="all">
        <div id="monpong">
            <canvas id="pong" width="600" height="400"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import { onMounted, ref } from 'vue';
    import axios from "axios";

    const store = useStore();
    const router = useRouter();
    const chatMessages = ref<string[]>([]);
    const newMessage = ref('');

    let Pwd = '';
    let bool = false;
    const socket = store.getters.getWebSocket;
    const chanContext = store.getters.getChanContext;
    const user1Context = store.getters.getuser1Context;
    const chatHistory = store.getters.getChatHistory;
    let getsocket = store.getters.getresultSocketOn;

    function Quit(){
        socket.emit("game", store.getters.getRoom, "quit");
    }

    
    onMounted(async () => {
        console.log("userID =", store.getters.getId)
        socket.on("init" ,(ballx: number, bally: number, user1: number, user2: number) => {
            store.commit("setBallX", ballx)
            store.commit("setBallY", bally)
            store.commit("setUser1", user1)
            store.commit("setUser2", user2)

        }); 
        socket.emit("init")
        store.commit("setStatusCode", - 1)
        socket.on('startgame', (player: number, status: any, trigger: any, ballx: number, bally: number ) => {
            store.commit("setTrigger", trigger)
            if (trigger == false){
                game();
            }
            else if(trigger == true){
                store.commit("setStatusCode", status)
                console.log("Status =", status)
                console.log("setStatusCode =", trigger)
                console.log("setTimeoutavant timeout")
                socket.off("startgame");
                socket.off("player");
                socket.off("game");
                socket.off("init");
                // fonction d attente
                setTimeout(() =>{
                    console.log("setTimeout dans timeout")
                    router.push("/")
                }, 3000);

            }
            if (status == false){
                store.commit("setPlayer", player)
                console.log('Player =', player)
                store.commit("setGoPlay", status)
            }
            else{
                store.commit("setGoPlay", status)
                store.commit("setRoom", player)
            }
        });
        socket.emit('startgame')
        socket.on("game", (ballx: number, bally: number, user1: number, user2: number, score1: number, score2: number ) => {
            
            if (store.getters.getPlayer == 1){
                store.commit("setBallX", ballx)
                store.commit("setBallY", bally)
                store.commit("setUser1", user1)
                store.commit("setUser2", user2)
                store.commit("setScoreUser1", score1)
                store.commit("setScoreUser2", score2)
            }
            else{
                store.commit("setBallX", 600 - ballx)
                store.commit("setBallY", bally)
                store.commit("setUser2", user1)
                store.commit("setUser1", user2)
                store.commit("setScoreUser2", score1)
                store.commit("setScoreUser1", score2)
            }
        });
        socket.emit('game', "départ")
    });
    
    /// FONCTION POUR LE PONG !!!!!!!!!
    function game(){
        const cvs = document.getElementById("pong")
        const ctx = cvs.getContext("2d");
    
    
    function end(){

        if (store.getters.getId == store.getters.getStatusCode){
            drawText("YOU WIN", cvs.width/3, cvs.height/2, "YELLOW")
        }
        else{
            drawText("YOU LOSE", cvs.width/3, cvs.height/2, "YELLOW")
        }
    }


    const user1 = {
        x: 10,
        y: cvs.height/2 - 100/2,
        width: 10,
        height: 100,
        color: "WHITE",
        score: 0,
    }

    const user2 = {
        x: cvs.width - 20,
        y: cvs.height/2 - 100/2,
        width: 10,
        height: 100,
        color: "WHITE",
        score: 0,
    }

    const ball = {
        x: cvs.width/2,
        y: cvs.height/2,
        radius: 8,
        color: "WHITE"
    }

    const net = {
        x: cvs.width/2 - 1,
        y: 0,
        width: 2,
        height: 10,
        color: "WHITE",
    }

    function drawNet(){
        for(let i = 0; i <= cvs.height; i+=15){
            drawRect(net.x, net.y + i, net.width, net.height, net.color);
        }
    }

    function drawRect(x, y, w, h, color){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
    drawRect(0, 0, cvs.width, cvs.height, "black")

    function drawCircle(x, y, r, color){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }

    function drawText(text, x, y, color){
        ctx.fillStyle = color;
        ctx.font = "45px fantasy";
        ctx.fillText(text, x, y);
    }

    function render(){
        user1.y = store.getters.getUser1;
        user2.y = store.getters.getUser2;
        ball.x = store.getters.getBallX;
        ball.y = store.getters.getBallY;
        user1.score = store.getters.getScoreUser1;
        user2.score = store.getters.getScoreUser2;

        drawRect(0, 0, cvs.width, cvs.height, "BLACK");
        drawNet();
        drawText(user1.score, cvs.width/4, cvs.height/5, "WHITE");
        drawText(user2.score, 3*cvs.width/4, cvs.height/5, "WHITE");
        drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
        drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
        drawCircle(ball.x, ball.y, ball.radius, ball.color);

    }

    // control the user1 paddle;
    cvs.addEventListener("mousemove", movePaddle);

    function movePaddle(evt){
        let rect = cvs.getBoundingClientRect();
        console.log('movemouse')
        if (store.getters.getRoom){
            user1.y = evt.clientY - rect.top - user1.height/2;
            socket.emit('player', store.getters.getRoom , user1.y)
        }
    }

    function game(){
        if (store.getters.getStatusCode < 0){
            render();
        }
        else{
            end();
        }
        
    }
    const framePerSeconde = 50;
    setInterval(game, 1000/framePerSeconde)
}


</script>

<style scoped lang="scss">

#all{
    align-items: center;
    display: flex;
}

#monpong{
    
    margin: 10%;
    align-items: center;
    display: flex;
    justify-content: center;

}

</style>