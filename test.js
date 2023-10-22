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
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
// On calcule où commencer la position pour centrer
let brickOffsetLeft = (canvas.width - (brickColumnCount * (brickWidth + brickPadding))) / 2;
let brickX;
let brickY;
let b;

// mouvement souris
let relativeX;

let score = 0;
let lives = 3;

// On place les briques dans un tableau en 2D (columns & rows)
let bricks = [];
for(let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(let r = 0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Ecouteurs sur les touches
document.addEventListener("keydown", keyDownHandler, false); // Quand keydown est déclenché, la fonction keyDownHandler est exécutée
document.addEventListener("keyup", keyUpHandler, false);
// Ecouteurs souris
document.addEventListener("mousemove", mouseMoveHandler, false);

//  lier le mvt de la raquette à la souris
function mouseMoveHandler(e){
    relativeX = e.clientX - canvas.offsetLeft; // Distance entre le bord gauche du canevas et pointeur souris
    if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2){
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Màj des variables selon l'évènement e grâce à la propriété key
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

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            b = bricks[c][r];
            // calculs de positions
            if (b.status == 1){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("Tu as cassé la baraque");
                        document.location.reload();
                        clearInterval(interval);
                    } 
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Vies: " + lives, canvas.width - 65, 20);
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

// Briques
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if( y + dy < ballRadius) {
        dy = -dy;

    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dx *= 1.1; // ajouter de la vitesse quand la balle touche la raquette
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
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
    requestAnimationFrame(draw);
}

// On dessine infiniement toutes les 10ms
draw();



