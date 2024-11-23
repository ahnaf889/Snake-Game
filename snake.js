// Get the canvas element and context
const canvas = document.getElementById("snakeGameCanvas");
const ctx = canvas.getContext("2d");

// Constants for game configuration
const gridSize = 20; // size of each grid square
const canvasSize = 400; // canvas size
const snakeSpeed = 100; // milliseconds between frames

// Initial snake and food positions
let snake = [
  { x: 160, y: 200 },
  { x: 140, y: 200 },
  { x: 120, y: 200 },
];
let food = { x: 200, y: 200 };
let dx = gridSize; // snake movement direction (dx/dy)
let dy = 0;
let score = 0;
let gameOver = false;

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to draw the snake
function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "green" : "white"; // head is green, body is white
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
  ctx.strokeStyle = "black";
  ctx.strokeRect(food.x, food.y, gridSize, gridSize);
}

// Function to update the snake's position
function updateSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Check for collisions with walls
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    gameOver = true;
    return;
  }

  // Check for collisions with itself
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      return;
    }
  }

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    generateFood();
  } else {
    snake.pop(); // Remove the last segment of the snake
  }
}

// Function to generate food at random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
  };
}

// Function to change the direction of the snake based on key press
function changeDirection(event) {
  if (gameOver) return;

  if (event.keyCode === 37 && dx === 0) {
    // Left arrow
    dx = -gridSize;
    dy = 0;
  }
  if (event.keyCode === 38 && dy === 0) {
    // Up arrow
    dx = 0;
    dy = -gridSize;
  }
  if (event.keyCode === 39 && dx === 0) {
    // Right arrow
    dx = gridSize;
    dy = 0;
  }
  if (event.keyCode === 40 && dy === 0) {
    // Down arrow
    dx = 0;
    dy = gridSize;
  }
}

// Function to display the score
function displayScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Function to end the game and show the game over message
function endGame() {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over!", 120, 200);
  ctx.font = "20px Arial";
  ctx.fillText(`Final Score: ${score}`, 140, 230);
}

// Main game loop
function gameLoop() {
  if (gameOver) {
    endGame();
    return;
  }

  clearCanvas();
  updateSnake();
  drawSnake();
  drawFood();
  displayScore();

  setTimeout(gameLoop, snakeSpeed);
}

// Start the game
document.addEventListener("keydown", changeDirection);
gameLoop();
