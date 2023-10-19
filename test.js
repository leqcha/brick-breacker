var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// Positionner la balle
var x = canvas.width / 2;
var y = canvas.height - 30;
// Déplacer la balle
var dx = 2;
var dy = -2;

// Dessin de la balle
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Mouvement de la balle
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}
// On dessine infiniement toutes les 10ms
setInterval(draw, 10);

