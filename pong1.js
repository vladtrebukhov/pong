const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// player paddle position and dimensions
let playerX = 20;
let playerY = 40;
const playerHeight = 100;
const playerWidth = 20;

// computer paddle position and dimensions
var computerX = 660;
var computerY = 40;

var computerHeight = 100;
var computerWidth = 20;

// ball dimensions and position
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballWidth = 20;
var ballHeight = 20;
var ballVelocityX = 5;
var ballVelocityY = 5;

// scores
var playerScore = 0;
var computerScore = 0;
var computerSpeed = 4.5;

var update = () => {
  // draw canvas,player, computer and ball to screen
  context.fillStyle = "black";
  context.strokeStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "50px Arial";
  context.fillText(`${playerScore}`, 200, 80);
  context.fillText(`${computerScore}`, 450, 80);
  context.fillRect(playerX, playerY, playerWidth, playerHeight);
  context.fillRect(computerX, computerY, computerWidth, computerHeight);
  context.fillRect(ballX, ballY, ballWidth, ballHeight);
  context.fill();
  context.save();

  // reset ball to center
  let reset = () => {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballVelocityX = -ballVelocityX || ballVelocityX;
  };

  // make ball move
  ballX += ballVelocityX;
  ballY += ballVelocityY;

  // if ball hits top or bottom of canvas, reverse direction
  if (ballY > canvas.height || ballY < 0) {
    ballVelocityY = -ballVelocityY;
  }

  // bounce ball and score point for computer if ball misses paddle
  if (ballX < 0 + playerX) {
    // ball is over or under player paddle
    if (ballY > playerY && ballY < playerHeight + playerY) {
      ballVelocityX = -ballVelocityX;
    } else {
      computerScore++;
      reset();
    }
  }

  if (ballX > canvas.width - 40) {
    if (ballY > computerY && ballY < computerHeight + computerY) {
      ballVelocityX = -ballVelocityX;
    } else {
      playerScore++;
      reset();
    }
  }

  if (computerY + computerHeight / 2 < ballY) {
    computerY += computerSpeed;
  } else {
    computerY -= computerSpeed;
  }

  // on mouse move event, change position of playerY to position of mouse
  let movePlayerPaddle = event => {
    playerY = event.clientY - playerHeight;
  };
  canvas.addEventListener("mousemove", movePlayerPaddle);

  // run update function every frame
  window.requestAnimationFrame(update);
};

window.onload = update;
