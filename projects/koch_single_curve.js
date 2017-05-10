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
var n = -1;
var p1 = new P();
var p2 = new P();

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  slider = createSlider(1, 7, 1);
  slider.position(20, 20);

	p1.x = 5;
	p1.y = sizeX/2;

	p2.x = sizeY-5;
	p2.y = sizeX/2;

}

function draw() {

  if ( n != slider.value()) {
  	n = slider.value();

  	clear();
    noStroke();
    fill(0);
    text ("side", 120, 20);

    noFill();
    stroke(0);

		console.log(p1);
		console.log(p2);
    curve_k(p1, p2, n-1	);
  }

}
