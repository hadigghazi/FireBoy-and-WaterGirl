let x = 50;
let y = 50;
let speed = 2;
let frameCounter = 0;

function setup() {
  createCanvas(400, 400); // Create a larger canvas for better movement
  drawCharacter();
}

function draw() {
  background(220); // Clear the canvas with a background color
  drawCharacter(x, y);
  moveCharacter();
}

function drawCharacter(x = 50, y = 50) {
  clear(); // Clear the canvas

  // Draw the body
  fill(0, 191, 255); // fire-like blue color
  ellipse(x, y, 50, 100); // body

  // Draw the head with fire effect
  drawFire(x, y - 60, 50, 70);

  // Draw the eyes
  fill(255);
  ellipse(x - 15, y - 65, 10, 10); // left eye
  ellipse(x + 15, y - 65, 10, 10); // right eye

  // Draw the mouth
  fill(255);
  arc(x, y - 50, 30, 20, 0, PI); // mouth

  // Draw the arms
  stroke(0, 191, 255);
  strokeWeight(4);
  line(x - 30, y, x - 50, y - 20); // left arm
  line(x + 30, y, x + 50, y - 20); // right arm

  // Draw the legs with walking animation
  drawLegs(x, y + 50);
}

function drawFire(x, y, w, h) {
  noStroke();
  for (let i = 0; i < 10; i++) {
    fill(0, 191, 255, 255 - i * 20); // gradient effect
    ellipse(x, y - i * 6, w - i * 4, h - i * 6); // fire layers
  }
}

function drawLegs(x, y) {
  stroke(0, 191, 255);
  strokeWeight(4);

  let legMovement = sin(frameCounter * 0.1) * 10; // calculate leg movement

  // Draw left leg
  line(x - 15, y, x - 15, y + 30 + legMovement);

  // Draw right leg
  line(x + 15, y, x + 15, y + 30 - legMovement);
}

function moveCharacter() {
  let moving = false;

  if (keyIsDown(65)) { // 'A' key
    x -= speed;
    moving = true;
  }
  if (keyIsDown(68)) { // 'D' key
    x += speed;
    moving = true;
  }
  if (keyIsDown(87)) { // 'W' key
    y -= speed;
    moving = true;
  }
  if (keyIsDown(83)) { // 'S' key
    y += speed;
    moving = true;
  }

  if (moving) {
    frameCounter++; // increment frame counter when character is moving
  } else {
    frameCounter = 0; // reset frame counter when character is not moving
  }
}
