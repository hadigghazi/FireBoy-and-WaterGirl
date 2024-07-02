let x = 50;
let y = 50;
let speed = 2;
let frameCounter = 0;

function setup() {
  createCanvas(400, 400); 
  drawCharacter();
}

function draw() {
  background(220); 
  drawCharacter(x, y);
  moveCharacter();
}

function drawCharacter(x = 50, y = 50) {
  clear(); 
  fill(0, 191, 255);
  ellipse(x, y, 50, 100); 

  drawFire(x, y - 60, 50, 70);

  fill(255);
  ellipse(x - 15, y - 65, 10, 10); 
  ellipse(x + 15, y - 65, 10, 10); 

  fill(255);
  arc(x, y - 50, 30, 20, 0, PI);

  stroke(0, 191, 255);
  strokeWeight(4);
  line(x - 30, y, x - 50, y - 20); 
  line(x + 30, y, x + 50, y - 20); 

  drawLegs(x, y + 50);
}

function drawFire(x, y, w, h) {
  noStroke();
  for (let i = 0; i < 10; i++) {
    fill(0, 191, 255, 255 - i * 20); 
    ellipse(x, y - i * 6, w - i * 4, h - i * 6); 
  }
}

function drawLegs(x, y) {
  stroke(0, 191, 255);
  strokeWeight(4);

  let legMovement = sin(frameCounter * 0.1) * 10; 

  line(x - 15, y, x - 15, y + 30 + legMovement);

  line(x + 15, y, x + 15, y + 30 - legMovement);
}

function moveCharacter() {
  let moving = false;

  if (keyIsDown(65)) { 
    x -= speed;
    moving = true;
  }
  if (keyIsDown(68)) { 
    x += speed;
    moving = true;
  }
  if (keyIsDown(87)) {
    y -= speed;
    moving = true;
  }
  if (keyIsDown(83)) { 
    y += speed;
    moving = true;
  }

  if (moving) {
    frameCounter++;
  } else {
    frameCounter = 0; 
}
}