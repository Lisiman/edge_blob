//edge blob
//by siman li
//runs on p5.js, jsfeat, tracking.js
//december 2016
//v0.1.0.

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

//var afterImg;

//function for setting up() initial conditions
//part of the p5.js libraries
function setup() {

  //setup initial canvas with p5.js library
  setupInitialCanvas();

  //setup camera with p5.js library
  setupCamera();

  //setup jsfeat library with jsfeat library
  setupEdgeDetection();

  //initialize target threshold
  // by default track white
  //setTarget(255, 255, 255);

  // tracking.ColorTracker.registerColor('match', function(r, g, b) {
  // if(r <= rhi && r >= rlo &&
  // g <= ghi && g >= glo &&
  // b <= bhi && b >= blo) {
  //      console.log("yay");
  //  return true;
  //
  // }
  // console.log("oh no");
  //  return false;
  // });

  //  tracker = new tracking.ColorTracker(['match']);
  // tracker.minDimension = 20; // make this smaller to track smaller objects
  // capture.elt.id = 'p5video';
  //img.id = ("p5img");
  //yuli says here is the magic part
  // tracking.track('p5img', tracker, { camera: true });
  // tracking.track('p5img', tracker, { camera: true });
  // tracker.on('track', function(event) {
  //   clear();
  //   strokeWeight(4);
  //   stroke(255, 0, 0);
  //   noFill();
  //   event.data.forEach(function(r) {
  //     rect(r.x, r.y, r.width, r.height);    });
  //});
}

//draw() function runs after setup() on a loop
//part of the p5.js library
function draw() {


  capture.loadPixels();
  //don't forget this! - why?
  if(capture.pixels.length > 0) {
    updateThresholdMouse();
    //perform the jsfeat edge detection
    performEdgeDetection();
    result = jsfeatToP5(buffer, result);
    image(result, 0, 0, 640, 500);
    }

//
//    if(mouseIsPressed &&
//     mouseX > 0 && mouseX < width &&
//     mouseY > 0 && mouseY < height) {
//     capture.loadPixels();
//     target = capture.get(mouseX, mouseY);
//     setTarget(target[0], target[1], target[2]);
//   }
//   img.loadPixels();
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

//take snap picture
//used by the jsfeat library
function takesnap(){
  img = image(result, 0, 500);
}

//function for updating the threshold for the jsfeat edge detection
//works thanks to the p5.js library
function updateThresholdMouse() {
  lowThreshold = mouseX;
  highThreshold = mouseY;
  //console.log(mouseX ," ", mouseY);
}

//perform the edge detection with jsfeat library
function performEdgeDetection() {
  jsfeat.imgproc.grayscale(capture.pixels, myWidth, myHeight, buffer);
  jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
  jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
};



//when the key is pressed==a, take a snapshot.
//used by the jsfeat library
//its part of the p5.js library
function keyTyped() {
  if (key === 'a') {
      takesnap();
    }
}
