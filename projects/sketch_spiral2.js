
var sizeX = 1000;
var sizeY = sizeX/2;

var  s1 =[];

var Back = [50, 89, 100, 255];
var Fore = [0, 255, 0, 255];

var numCircles = 0;

var P ;


function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  P = createGraphics(sizeX, sizeY);
  
  for (var i=0; i< numCircles; i++) {
    s1.push(new Spiral());
  }
  P.background(Back[0], Back[1], Back[2], Back[3]);
}


var tangent_speed = 2;


function draw() {
  // put drawing code here

   P.stroke(Fore);
  
  var countActive = 0;
  s1.forEach(function(e,i,a) { 
  	e.move(); 
  	e.display();
  	if (e.isrunning) {
  		countActive++;
		if (random(1) <= 0.2 && !e.isrunning && e.gaveBirth>0) {
			e.gaveBirth--;
			s1.push(new Spiral());
		}
  	}
  });
  
  image(P,0,0,2*sizeX,2*sizeY);
  
}



// Spiral class
function Spiral() {


  this.initx = random(sizeX);
  this.inity = random(sizeY);
  this.x = 1;
  this.y = 1;
  
  this.gaveBirth = random(2);
  
  this.t=0;
  
  this.phase = random(sizeX);
  
  this.diameter = 21;
  this.speed = 1;

  this.radius = 2;
  this.isrunning = true;

  var me = this;


  this.move = function() {
    
    if (this.isrunning) {
		
		this.isrunning = this.check();		

		this.t += this.speed;
		this.radius = ( 0.5 * this.t % 360);

		this.x = round(this.initx + this.radius * sin(this.t+this.phase));
		this.y = round(this.inity + this.radius * cos(this.t+this.phase));
		this.speed = tangent_speed / this.radius;
			
	}
  };

  this.display = function() {
    P.ellipse(this.x, this.y, this.diameter, this.diameter);
  };


  
 this.check = function() {

	var v = P.get(this.x, this.y);
	return (abs(red(v) - red(Fore)) + 
		abs(green(v) - green(Fore)) +
		abs(blue(v) - blue(Fore))) > 10;
	}
	
}


function mouseClicked() {
	var s = new Spiral();
	s.initx = mouseX;
	s.inity = mouseY;
	
	s1.push(s);
}




function circlesIntersect(c1, c2) {
	var x0 = c1.initx;
	var y0 = c1.inity;
	var r0 = c1.radius
	
	var x1 = c2.initx;
	var y1 = c2.inity;
	var r1 = c2.radius;
	
	
	if (x0 < 0 || y0 < 0 || x1 < 0 || y1 < 0 ||
		x0 > sizeX || x1 > sizeX || y0 > sizeY || y1 > sizeY) {
		return true;
	}
	
	
    // This function checks for the intersection of two circles.
	// If one circle is wholly contained within the other a -1 is returned
	// If there is no intersection of the two circles a 0 is returned
	// If the circles intersect a 1 is returned and
	// the coordinates are placed in xi1, yi1, xi2, yi2
 
    //dx and dy are the vertical And horizontal distances between
    //the circle centers.
    dx = x1 - x0;
    dy = y1 - y0;
 
    //Determine the straight-Line distance between the centers.
    d = sqrt((dy*dy) + (dx*dx));
 
 
    //Check for solvability.
    if (d > (r0 + r1)) {
        //no solution. circles do Not intersect
        return false;
    }
 
    if(d < abs(r0 - r1)) {
    	// no solution. one circle is contained in the other
        return true;
    }
 
    // 'point 2' is the point where the Line through the circle
    // intersection points crosses the Line between the circle
    // centers.
 
    // Determine the distance from point 0 To point 2.
    a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d);
 
    // Determine the coordinates of point 2.
    x2 = x0 + (dx * a/d);
    y2 = y0 + (dy * a/d);
 
    // Determine the distance from point 2 To either of the
    // intersection points.
    h = sqrt((r0*r0) - (a*a));
     
    // Now determine the offsets of the intersection points from
    // point 2.
    rx = (0-dy) * (h/d);
    ry = dx * (h/d);
 
    // Determine the absolute intersection points.
    xi1 = x2 + rx;
    xi2 = x2 - rx;
    yi1 = y2 + ry;
    yi2 = y2 - ry;
 
    return true;
}
