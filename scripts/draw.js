let canvas;
let drawing = [];
let currentPath = [];
let isDrawing = false;
let currentPlayer = 1;

function setup() {
  canvas = createCanvas(50, 90);
  canvas.parent("canvasWrapper1");
  clearCanvas();

  select("#nextButton1").mousePressed(nextPlayer);
  select("#nextButton2").mousePressed(saveDrawings);
  select("#clearButton1").mousePressed(clearCanvas);
  select("#clearButton2").mousePressed(clearCanvas);
}

function draw() {
  noFill();
  if (isDrawing) {
    stroke(currentPlayer === 1 ? [255, 0, 0] : [0, 0, 255]);
    strokeWeight(4);
    const point = {
      x: mouseX,
      y: mouseY,
    };
    currentPath.push(point);
  }

  for (let i = 0; i < drawing.length; i++) {
    const path = drawing[i];
    beginShape();
    for (let j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function mousePressed() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function mouseReleased() {
  isDrawing = false;
}

function nextPlayer() {
  if (currentPlayer === 1) {
    saveCanvasToLocalStorage("character1");
    select("#canvasContainer1").hide();
    select("#canvasContainer2").show();
    canvas.parent("canvasWrapper2");
    clearCanvas();
    currentPlayer = 2;
  }
}

function saveDrawings() {
  saveCanvasToLocalStorage("character2");
  alert("Characters saved!");
}

function clearCanvas() {
  isDrawing = false;
  drawing = [];
  currentPath = [];
  clear();
  background(255, 255, 255, 0);
}

function saveCanvasToLocalStorage(key) {
  console.log(drawing);
  if (
    drawing.length === 0 ||
    (drawing.length === 1 && drawing[0].length === 0)
  ) {
    console.log(`Saving empty character to localStorage with key: ${key}`);
    localStorage.setItem(key, "");
  } else {
    loadPixels();
    let img = canvas.canvas.toDataURL("image/png");
    const emptyImageData =
"    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABaCAYAAAD6mAWGAAAAAXNSR0IArs4c6QAAAO9JREFUeF7tksEJADAMhJL9l+4OglCC/Z8Q7c6Rt0fumA75rWRFKiIZ6GtJYjG2IlidNKyIJBZjK4LVScOKSGIxtiJYnTSsiCQWYyuC1UnDikhiMbYiWJ00rIgkFmMrgtVJw4pIYjG2IlidNKyIJBZjK4LVScOKSGIxtiJYnTSsiCQWYyuC1UnDikhiMbYiWJ00rIgkFmMrgtVJw4pIYjG2IlidNKyIJBZjK4LVScOKSGIxtiJYnTSsiCQWYyuC1UnDikhiMbYiWJ00rIgkFmMrgtVJw4pIYjG2IlidNKyIJBZjK4LVScOKSGIx9kyRB9aVAFukLBc2AAAAAElFTkSuQmCC"
    if (img === emptyImageData) {
      localStorage.setItem(key, "");
      console.log(`Character saved to localStorage with key: ${key}`);
      return;
    } else {
      console.log(`Saving character to localStorage with key: ${key}`);
      localStorage.setItem(key, img);
    }
  }
  console.log(`Current localStorage for ${key}: `, localStorage.getItem(key));
}
