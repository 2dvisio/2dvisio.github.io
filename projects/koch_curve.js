var sizeX = 500;
var sizeY = 500;

function P() {
	this.x;
	this.y;
	
	this.m = function() {
		return sqrt( sq(this.x) + sq(this.y))
	};
	
	this.normalised = function () {
		var n = new P();
		n.x = this.x / this.m();
		n.y = this.y / this.m();
		return n; 
	};
}

function findThirdEqui(A, B) {
  var C = new P();

  C.x = (B.y - A.y);
  C.y = -(B.x - A.x);
  C = C.normalised();

  var h = Math.sqrt( Math.pow(B.x-A.x,2) + Math.pow(B.y-A.y,2)) * (0.866025);
  
  //move in position
  C.x *= h;
  C.y *= h;

  //move in position
  C.x += (A.x+B.x)/2;
  C.y += (A.y+B.y)/2;
  
  return C;
}

function curve_k(AA, BB, level) {
  var A = new P();
  var B = new P();
  
  A.x = (AA.x * 2 + BB.x) / 3;
  A.y = (AA.y * 2 + BB.y) / 3;
  
  var B = new P();
  
  B.x = (AA.x + BB.x * 2) / 3;
  B.y = (AA.y + BB.y * 2) / 3;
  
  var C = findThirdEqui(A, B);
  
  if (level > 0 ) {  
  	curve_k(AA, A, level-1);
  	curve_k(A, C, level-1);
  	curve_k(C, B, level-1);
  	curve_k(B, BB, level-1);
  } else {
  	line(AA.x, AA.y, A.x, A.y);
  	line(A.x, A.y, C.x, C.y);
  	line(C.x, C.y, B.x, B.y);
  	line(B.x, B.y, BB.x, BB.y);  	
  }  
}

var slider;
var sliderONOFF;
var n = 0;
var onoff = 0;

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  slider = createSlider(1, 6, 1);
  slider.position(20, 20);

  sliderONOFF = createSlider(0, 1, 0);
  sliderONOFF.position(200, 20);
}

function draw() {

  
  if ( (n != slider.value() * 2)  || (onoff != sliderONOFF.value()) ) {
  	n = slider.value() * 2;
  	onoff = sliderONOFF.value();
  	
  	clear();
    noStroke();
    fill(0);
    text ("side", 120, 20);
    text ("alternate", 280, 20);


    noFill();
    stroke(0);

	var r = 200;
	var Ps = [];

	var sxhalf = (sizeX/2)
	var syhalf = (sizeY/2)

	for (var i = 0; i < n; i++) {
		var p = new P();
		p.x =  sxhalf + r * Math.cos(2 * Math.PI * i / n);
		p.y =  syhalf + r * Math.sin(2 * Math.PI * i / n);

		Ps.push(p);
	}
	
    for (var i = 0; i < n; i++) {
  	  if (i%2 == 0 || sliderONOFF.value() == 0)
	      curve_k(Ps[i], Ps[(i+1)%n], 4);
      else
          curve_k(Ps[(i+1)%n], Ps[i], 4);
    }
  }
}
