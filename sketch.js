//edge blob
//by siman li
//runs on p5.js, jstracker, tracking.js
//december 2016
//v0.0.1.

var capture;
var buffer;
var result;
var tracker;
var img;
//var afterImg;

//variables for threshold
var rhi, ghi, bhi;
var rlo, glo, blo;

var w = 640, h = 1000;

function setTarget(r, g, b, range) {
  range = range || 32;
  rhi = r + range, rlo = r - range;
  ghi = g + range, glo = g - range;
  bhi = b + range, blo = b - range;
}


//function for setting up() initial conditions
//part of the p5.js libraries
function setup() {
  createCanvas(w, h);
  background(100);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);
  button = createButton('snap');
  // button.mousePressed(takesnap);
    setTarget(255, 255, 255); // by default track white
  // tracking.ColorTracker.registerColor('match', function(r, g, b) {
  //   if(r <= rhi && r >= rlo &&
  //      g <= ghi && g >= glo &&
  //      b <= bhi && b >= blo) {
  //     return true;
  //   }
  //   return false;
  // });
  //  tracker = new tracking.ColorTracker(['match']);
  // tracker.minDimension = 20; // make this smaller to track smaller objects
  // capture.elt.id = 'p5video';
  //img.id = ("p5img");
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
//  // image(capture, 0,0, 640, 490);
//    if(mouseIsPressed &&
//     mouseX > 0 && mouseX < width &&
//     mouseY > 0 && mouseY < height) {
//     capture.loadPixels();
//     target = capture.get(mouseX, mouseY);
//     setTarget(target[0], target[1], target[2]);
//   }
//   img.loadPixels();
//   if(img.pixels.length > 0) { // don't forget this!
//     var blurSize = 6;
//     var lowThreshold = mouseX;
//     var highThreshold = mouseY;
//     console.log(mouseX ," ", mouseY);
//     jsfeat.imgproc.grayscale(img.pixels, w, 490, buffer);
//     jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
//     jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);
//     result = jsfeatToP5(buffer, result);
//     image(result, 0, 0, 640, 500);
//   }
}



function takesnap(){
  img = image(result, 0, 500);
}

function keyTyped() {
  if (key === 'a') {
      takesnap();
    }
}

//when the key is pressed==a, take a snapshot.
