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

// Find square corner on A where A,B is one side of the square
function findCorner(A, B, side) {
  var C = new P();

  C.x = (B.y - A.y);
  C.y = -(B.x - A.x);
  C = C.normalised();

  var h = Math.sqrt( Math.pow(B.x-A.x,2) + Math.pow(B.y-A.y,2));

  //set length
  C.x *= (side ? -1 : 1) * h;
  C.y *= (side ? -1 : 1) * h;

  //move in position
  C.x += A.x;
  C.y += A.y;

  return C;
}



function curve_p(AA, BB, side, level) {
  var C = findThirdEqui(AA, BB, side);

	var ACc = findCorner(AA, C, side);
	var CAc = findCorner(C, AA, !side);
	quad(AA.x, AA.y, ACc.x, ACc.y, CAc.x, CAc.y, C.x, C.y);


	var BCc = findCorner(C, BB, side);
	var CBc = findCorner(BB, C, !side);
	quad(BB.x, BB.y, CBc.x, CBc.y, BCc.x, BCc.y, C.x, C.y);

  if (level > 0) {
			curve_p(ACc, CAc, side, level-1);
	  	curve_p(BCc, CBc, side, level-1);
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

		Pstart.x = sizeX/2 - 25;
		Pstart.y = 20;

		Pend.x = sizeX/2 + 25;
		Pend.y = 20;

		var B1 = findCorner(Pend, Pstart, 0);
		var A1 = findCorner(Pstart, Pend, 1);
		quad(Pstart.x, Pstart.y, A1.x, A1.y, B1.x, B1.y, Pend.x, Pend.y);

		curve_p(A1, B1, true, n);
  }
