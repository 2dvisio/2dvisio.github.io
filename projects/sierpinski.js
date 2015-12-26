
var sizeX = 500;
var sizeY = sizeX * (0.866025);


var sq3_2;


function sierpinski(triangle_inv, Ax, Ay, Bx, By, Cx, Cy, iterations) {

  if (iterations ==0) {
  	return;
  }

  triangle_inv(Ax, Ay, Bx, By, Cx, Cy);
  var p1x = round((Bx+Ax)/2);
  var p1y = round((By+Ay)/2);
  
  var p2x = round((Cx + Bx)/2);
  var p2y = round((Cy + By)/2);
  
  var p3x = round((Ax + Cx)/2);
  var p3y = round((Ay + Cy)/2);

      
  sierpinski(triangle_inv, Ax, Ay, p1x, p1y, p3x, p3y, iterations-1);
  sierpinski(triangle_inv, p1x, p1y, Bx, By, p2x, p2y, iterations-1);
  sierpinski(triangle_inv, p3x, p3y, p2x, p2y, Cx, Cy, iterations-1);
  
}


var slider;

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  
  sq3_2 = sqrt(3)/2;
  
  slider = createSlider(0, 9, 1);
}

function draw() {
  
  fill(212,41,100);
  noStroke();
  
  var p1x = sizeX/2;
  var p1y = 0;
  
  var p2x=0;
  var p2y=sizeY;
  
  var p3x=sizeX;
  var p3y=sizeY;
  
  triangle(p1x, p1y, p2x, p2y, p3x, p3y);
  noStroke();
  fill(255,255,100);
    
  sierpinski(triangle_inv, p1x, p1y, p2x, p2y, p3x, p3y, slider.value());
  
}


function triangle_inv(Ax, Ay, Bx, By, Cx, Cy) {
  var p1x = (Bx+Ax)/2;
  var p1y = (By+Ay)/2;
  
  var p2x = (Cx + Bx)/2;
  var p2y = (Cy + By)/2;
  
  var p3x = (Ax + Cx)/2;
  var p3y = (Ay + Cy)/2;
  triangle(p1x, p1y, p2x, p2y, p3x, p3y);
}