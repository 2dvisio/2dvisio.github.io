var sizeX = 700;
var sizeY = 700;

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


// Find a third point (C) between A,B such that it is
// equidistand from A and B
function findThirdEqui(A, B, side) {
  var C = new P();

  C.x = (B.y - A.y);
  C.y = -(B.x - A.x);
  C = C.normalised();

  var h = Math.sqrt( Math.pow(B.x-A.x,2) + Math.pow(B.y-A.y,2)) * 0.5;

  //move in position
  C.x *= (side ? -1 : 1) * h;
  C.y *= (side ? -1 : 1) * h;

  //move in position
  C.x += (A.x+B.x)/2;
  C.y += (A.y+B.y)/2;

  return C;
}

function curve_d(AA, BB, side, level) {
  var C = findThirdEqui(AA, BB, side);
  if (level > 0 ) {
		if (side) {
			curve_d(AA, C, !side, level-1);
	  	curve_d(C, BB, side, level-1);
		} else {
			curve_d(AA, C, side, level-1);
	  	curve_d(C, BB, !side, level-1);
		}
  } else {
  	line(AA.x, AA.y, C.x, C.y);
  	line(BB.x, BB.y, C.x, C.y);
  }
}

var slider;
var n = 0;

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  slider = createSlider(1, 13, 1);
  slider.position(20, 20);
}

function draw() {
  	n = slider.value()-1;

  	clear();
    noStroke();
    fill(0);
    text ("depth", 120, 20);

    noFill();
    stroke(0);

		var r = 200;
		var Pstart = new P();
		var Pend = new P();

		Pstart.x = sizeX*4/5;
		Pstart.y = sizeY/7;

		Pend.x = sizeX - sizeX*4/5;
		Pend.y = sizeY/7;

		if (n==0) {
    	curve_d(Pstart, Pend, false, n);
		} else {
			var C = findThirdEqui(Pstart, Pend, 0);
			curve_d(Pstart, C, false, n);
			curve_d(Pend, C, true, n);
		}
  }
