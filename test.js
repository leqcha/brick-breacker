let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
// Positionner la balle
let x = canvas.width / 2;
let y = canvas.height - 30;
// Déplacer la balle
let dx = 2;
let dy = -2;
// détecter les collisions
let ballRadius = 10;
let ballColor = "#0095DD";
// Création de la raquette
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// Comportement de la raquette
let rightPressed = false; // au début la valeur est fausse, aucune touche n'est pressée
let leftPressed = false; // il faudra ajouter 2 écouteur pour savoir quand on appuie
//  Création des briques
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// Ecouteurs sur les touches
document.addEventListener("keydown", keyDownHandler, false); // Quand keydown est déclenché, la fonction keyDownHandler est exécutée
document.addEventListener("keyup", keyUpHandler, false);

// Màj des variables selo, l'évènement e grâce à la propriété key
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39){
        rightPressed = false;
    } else if (e.keyCode == 37){
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// Raquette
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = 'red';
    }
    if( y + dy < ballRadius) {
        dy = -dy;
        ballColor = 'green';

    } else if(y + dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
            dx *= 1.1; // ajouter de la vitesse quand la balle touche la raquette
        } 
        else{
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); 
    }
}
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

// On dessine infiniement toutes les 10ms
var interval = setInterval(draw, 10);



