
var sizeX = 500;
var sizeY = sizeX * (0.866025);


function curve_s(Ax, Ay, Bx, By, level) {

  var Cx = (By - Ay);
  var Cy = -(Bx - Ax);

  var Cm = sqrt( sq(Cx) + sq(Cy));

  //move in position
  Cx /= Cm;
  Cy /= Cm;

  var h = sqrt( sq(Bx-Ax) + sq(By-Ay)) * (0.866025);
  
  //move in position
  Cx *= h;
  Cy *= h;

  //move in position
  Cx += (Ax+Bx)/2;
  Cy += (Ay+By)/2;
  
  var p1x = (Cx + Bx)/2;
  var p1y = (Cy + By)/2;
  
  var p2x = (Ax + Cx)/2;
  var p2y = (Ay + Cy)/2;
  
  if (level > 0 ) {
  
  	curve_s(p2x, p2y, p1x, p1y, level-1);
  	curve_s(p2x, p2y, Ax, Ay, level-1);
  	curve_s(Bx, By, p1x, p1y, level-1);
  } else {
  	line(Ax, Ay, p2x, p2y);
  	line(p2x, p2y, p1x, p1y);
  	line(p1x, p1y, Bx, By);
  }  
}

var slider;

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  slider = createSlider(0, 9, 1);
}

function draw() {

  clear();
  
  fill(212,41,100);
  noStroke();
  
  var p1x=0;
  var p1y=sizeY;
  
  var p2x=sizeX;
  var p2y=sizeY;
  
  stroke(0);
  noFill();
    
  curve_s(p1x, p1y, p2x, p2y, slider.value());

}

