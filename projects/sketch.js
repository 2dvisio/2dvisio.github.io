
var sizeX = 1000;
var sizeY = sizeX/2;

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
}


var xpos = 0;
var oldy = 0;

function draw() {
  // put drawing code here
  
  fill(212,41,100);
  stroke(255,255,100);

  radius1 = (1.1+Math.sin(xpos));
  radius2 = (32+Math.cos(xpos));
  
  x = (xpos)%(sizeX + radius2);
  y = ((sizeX/20)*((xpos)/sizeX))%sizeY;
   
  oldy = y;
  
  ellipse(x,y,radius1*radius2,radius1*radius2);
  xpos += (6.4*(sizeX/(sizeX-3)));
}