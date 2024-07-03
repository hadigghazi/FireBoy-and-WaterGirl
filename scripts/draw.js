let canvasElement;
let drawnPaths = [];
let currentDrawingPath = [];
let isDrawingNow = false;
let activePlayer = 1;
let useDefault = false;


function setup() {
  canvasElement = createCanvas(70, 85);
  canvasElement.parent("canvasWrapper1");
  resetCanvas();

  select("#nextButton1").mousePressed(switchToNextPlayer);
  select("#nextButton2").mousePressed(() => saveCanvasToLocalStorage("character2"));
  select("#clearButton1").mousePressed(resetCanvas);
  select("#clearButton2").mousePressed(resetCanvas);

    select("#defaultBtn").mousePressed(setDefault);


  canvasElement.elt.addEventListener('touchstart', handleTouchStart);
  canvasElement.elt.addEventListener('touchmove', handleTouchMove);
  canvasElement.elt.addEventListener('touchend', handleTouchEnd);
}

function draw() {
  noFill();
  if (isDrawingNow) {
    stroke(activePlayer === 1 ? [255, 0, 0] : [0, 0, 255]);
    strokeWeight(5);
    const newPoint = { x: mouseX, y: mouseY };
    currentDrawingPath.push(newPoint);
  }

  drawnPaths.forEach(path => {
    beginShape();
    path.forEach(point => vertex(point.x, point.y));
    endShape();
  });
}

function mousePressed() {
  isDrawingNow = true;
  currentDrawingPath = [];
  drawnPaths.push(currentDrawingPath);
}

function mouseReleased() {
  isDrawingNow = false;
}

function setDefault() {
  useDefault = !useDefault;
  
  let tick = document.querySelector("img.tick");
  useDefault ? tick.style.visibility = "visible":
                tick.style.visibility = "hidden";
  }


function switchToNextPlayer() {
  if (activePlayer === 1) {
    saveCanvasToLocalStorage("character1");
    select("#canvasContainer1").hide();
    select("#canvasContainer2").show();
    canvasElement.parent("canvasWrapper2");
    resetCanvas();
    activePlayer = 2;
  }
}

function resetCanvas() {
  isDrawingNow = false;
  drawnPaths = [];
  currentDrawingPath = [];
  clear();
  background(255, 255, 255, 0);
}

function saveCanvasToLocalStorage(key) {
  if (drawnPaths.length === 0 || (drawnPaths.length === 1 && drawnPaths[0].length === 0)) {
    localStorage.setItem(key, "");
  } else {
    loadPixels();
    let image = canvasElement.canvas.toDataURL("image/png");
 
      localStorage.setItem(key, image);
    
  }

  if(activePlayer == 2){
    scroll();
  }
}


function scroll(){
    const game = document.getElementById('gameContainer');
    game.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleTouchStart(e) {
  e.preventDefault();
  isDrawingNow = true;
  currentDrawingPath = [];
  drawnPaths.push(currentDrawingPath);
  const touch = e.touches[0];
  const newPoint = { x: touch.clientX - canvasElement.elt.getBoundingClientRect().left, y: touch.clientY - canvasElement.elt.getBoundingClientRect().top };
  currentDrawingPath.push(newPoint);
}

function handleTouchMove(e) {
  e.preventDefault();
  if (isDrawingNow) {
    const touch = e.touches[0];
    const newPoint = { x: touch.clientX - canvasElement.elt.getBoundingClientRect().left, y: touch.clientY - canvasElement.elt.getBoundingClientRect().top };
    currentDrawingPath.push(newPoint);
  }
}

function handleTouchEnd(e) {
  e.preventDefault();
  isDrawingNow = false;
}
