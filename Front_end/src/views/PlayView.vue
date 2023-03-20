<template>
    <div>
        <div id="boutons">
            <div>
                <button id="Matchmaking">
                    Matchmaking
                </button>
            </div>
            <div>
                <button id="InviteFriends" @click="submit">
                    InviteFriends
                </button>
                <div id="user42">
                    <div id="user" v-for="(user, index) in getUsers()">
                        <button>
                                {{ user.nickname }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="monpong">
            <canvas id="pong" width="600" height="400"></canvas>
        </div>
    <div v-if="store.getters.getScoreUser1 == 10">
        you lose
    </div>
    <div v-else="store.getters.getScoreUser2 == 10">
        you win
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
    const userContext = store.getters.getUserContext;
    const chatHistory = store.getters.getChatHistory;
    let getsocket = store.getters.getresultSocketOn;

    onMounted(async () => {
        console.log("sasas")
        socket.on('startgame', (player: number, status: any) => {
            if (status == false){
                store.commit("setPlayer", player)
                store.commit("setGoPlay", status)
            }
            else{
                store.commit("setGoPlay", status)
            }
        });
        socket.emit('startgame', 'salut');
        socket.on('play', (message: number) => {
            getsocket = message;
        });
        socket.on('ball', (ballx: number, bally: number, scoreUser2: number, scoreUser1: number) => {
            store.commit("setBallX", ballx)
            store.commit("setBallY", bally)
            store.commit("setScoreUser2", scoreUser2)
            store.commit("setScoreUser1", scoreUser1)
        });
        game();
    });

/// FONCTION LOGIQUE BOUTON !!!! 

const submit = async () => {
    const response = await axios.get("http://c1r2s3:3000/users/all");
    store.commit('setUsers', response.data)
    /*try {
            if (response.data.doubleAuth == false)
            {
                
            }
            else
            {

            }
        } catch (error: any) {
            if (error.response.status != 201)
            {
                console.error("Erreur lors de l'affichage d'amis", error);
            }
        }*/
}

function getUsers(){
        return store.getters.getUsers;
    }


/// FONCTION POUR LE PONG !!!!!!!!!
function game(){
    const cvs = document.getElementById("pong")
    const ctx = cvs.getContext("2d");

const user = {
    x: 10,
    y: cvs.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0,
}

const com = {
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
    radius: 10,
    speed: 6,
    velocityX: 5,
    velocityY: 5,
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

function resetBallright(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;

    ball.speed = 6;
    ball.velocityX = -5;
    ball.velocityY = -5;
}

function resetBallleft(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;

    ball.speed = 6;
    ball.velocityX = 5;
    ball.velocityY = 5;
}

function render(){
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");
    drawNet();
    drawText(user.score, cvs.width/4, cvs.height/5, "WHITE");
    drawText(com.score, 3*cvs.width/4, cvs.height/5, "WHITE");
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
// pos, mov, score, ...
function update(){

    if (ball.x - ball.radius < 0){
        com.score++;
        resetBallright();
    }else if(ball.x + ball.radius > cvs.width){
        user.score++;
        resetBallleft();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    com.y = getsocket;
    
    if (ball.y + ball.radius > cvs.height ||
        ball.y - ball.radius < 0){
            ball.velocityY = - ball.velocityY;
        }
        
        let player = (ball.x + ball.radius < cvs.width/2) ? user: com;
        
        if (collision(ball, player)){
            let collidePoint = (ball.y - (player.y + player.height/2));

            // normalization
            collidePoint = collidePoint/(player.height/2);
            
            // calculate angle in Radian
            let angleRad = collidePoint * Math.PI/4;
            
            // X direction of the ball hit
            let direction = (ball.x + ball.radius < cvs.width/2) ? 1 : - 1;
            
            // change vel x and y
            ball.velocityX = direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            
            // everytime the ball hit the paddle, we encrese its speed
            if (ball.speed != 19)
                ball.speed += 0.5;
            
            //update the scrore

    }
}

// control the user paddle;
cvs.addEventListener("mousemove", movePaddle);

function movePaddle(evt){
    let rect = cvs.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
    socket.emit('play', user.y)
}

// collision detection
function collision(b, p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right &&
    b.top < p.bottom;

}

function game(){
    if(store.getters.getGoPlay == true && user.score < 10 && com.score < 10){
        if (store.getters.getPlayer == 1){
            update();
            socket.emit("ball", ball.x, ball.y, com.score, user.score)
        }
        else if(store.getters.getPlayer == 2){

            ball.x = cvs.width - store.getters.getBallX;
            ball.y = store.getters.getBallY;
            com.score = store.getters.getScoreUser1;
            user.score = store.getters.getScoreUser2;
            com.y = getsocket;
        }
        render();
    }
    if (user.score > 9 && com.score > 9){
        socket.emit("ball", "stop");
        socket.off("ball", "play", "startgame")
    }
}

const framePerSeconde = 50;
setInterval(game, 1000/framePerSeconde);
   
}


</script>

<style scoped lang="scss">

#user42{
    position: absolute;
    align-items: center;
    align-self: center;
    justify-content: center;
    left: 24%
}

#monpong{
    margin: 10%;
    align-items: center;
    display: flex;
    justify-content: center;

}
#boutons{
    display: inline-flex;
    margin: 10%;
    flex-direction: column;
    align-items: center;
}
#Matchmaking{
    background-color: rgb(1, 1, 1);
    color: rgb(247, 247, 247);
    margin: auto;
}
#InviteFriends{
    background-color: rgb(1, 1, 1);
    color: rgb(247, 247, 247);
    margin: auto;
}
</style>