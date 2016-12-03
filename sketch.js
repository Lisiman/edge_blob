//edge blob
//by siman li
//runs on p5.js, jsfeat, tracking.js
//december 2016
//v0.3.0.

//variable for holding the p5.js capture
//it reads from the webcam
var capture = null;

//variable to hold the buffer used by the jsfeat library
var buffer = null;

//variable to hold the resulst of the jsfeat library
var result = null;

//dimension variables
var myWidth = 640;
var myHeight = 500;

//auxiliar variable for storing temporal image
var img = null;

//variable to hold button for taking snapshots
var button = null;

var tracker = null;

//threshold variables controlled by mouse
var lowThresholdMouse = null;
var highThresholdMouse = null;

var blurSize = null;

//variables for threshold
var rhi, ghi, bhi;
var rlo, glo, blo;

var isNewImage = null;

//instantation mode
// //p5.js canvas on instantiation mode
// var sketch = function(p) {
//   p.setup = function() {
//     p.createCanvas(700, 410);
//   };
//
//   p.draw = function() {
//
//   };
// }
//
// var myp5 = new p5(sketch);


//function for setting up() initial conditions
//part of the p5.js libraries
function setup() {

  //setup initial canvas with p5.js library
  setupInitialCanvas();

  //setup camera with p5.js library
  setupCamera();

  //setup jsfeat library with jsfeat library
  setupEdgeDetection();
}

function draw() {

}

function setupInitialCanvas() {
  //create p5 canvas
  createCanvas(myWidth, myHeight);

  //paint the background gray
  background(100);

  //create a button for doing snapshots
  button = createButton('snap');
}


function setupCamera() {
  //initialize capture of video
  capture = createCapture(VIDEO);

  //define the capture size with the same dimensions as the canvas
  capture.size(myWidth, myHeight);

  //hide it
  capture.hide();
}


function setupEdgeDetection() {
    //create a new buffer
    buffer = new jsfeat.matrix_t(myWidth, myHeight, jsfeat.U8C1_t);

    //set the blur size
    blurSize = 6;
}

//function for adjusting thresholds
//it accepts rgb values and range
function setTarget(r, g, b, range) {
  //range is either range or 32
  range = range || 32;
  rhi = r + range;
  rlo = r - range;
  ghi = g + range;
  glo = g - range;
  bhi = b + range;
  blo = b - range;
}

function retrieveWebcamImage() {
  capture.loadPixels();
  //check if the webcam is outputting a new image
  if (capture.pixels.length > 0) {
    isNewImage = true;
  } else {
    isNewImage = false;
  }
};

//function for updating the threshold for the jsfeat edge detection
//works thanks to the p5.js library
function updateThresholdMouse() {
  lowThreshold = mouseX;
  highThreshold = mouseY;
  //console.log(mouseX ," ", mouseY);
}

//perform the edge detection with jsfeat library
function performEdgeDetection() {

  //update thresholds according to mouse position on canvas
  updateThresholdMouse();

  jsfeat.imgproc.grayscale(capture.pixels, myWidth, myHeight, buffer);
  jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
  jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
};

//place the edge detection image result on the p5 canvas
function edgeDetectionTop5() {
  result = jsfeatToP5(buffer, result);
  image(result, 0, 0, 640, 500);
};

//take a snapshot when the a key is pressed
//used by the jsfeat library
//its part of the p5.js library
function keyTyped() {
  if (key === 'a') {
      takeSnapshot();
    }
}

//take snap picture
//used by the jsfeat library
//relies on the p5.js library
function takeSnapshot(){
  saveCanvas('myCanvas', 'png');
  //img = image(result, 0, 500);
}
