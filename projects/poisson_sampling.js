var sizeX = 400;
var sizeY = 400;
var minElementDistance = 13;
var density = (sizeX * sizeY) / (minElementDistance * minElementDistance);
var Grid =[];
var PointsCandidates = [];
var Points = [];

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
	
	this.set = function (xx, yy) {
		this.x = xx;
		this.y = yy;
		return this;
	}
	
	this.distance = function (c) {
		var dx = this.x - c.x,
		dy = this.y - c.y;
		return Math.sqrt(dx * dx + dy * dy);	
	}
}

// Find first point
function findRandom() {
	return (new P()).set(Math.random()*sizeX | 0, Math.random()*sizeY | 0);
}

// Find first point
function findRandomCircle(c) {
	var a = 2 * Math.PI * Math.random();
    var r = Math.random() * minElementDistance + minElementDistance;

	return (new P()).set(  c.x + r * Math.cos(a), c.y + r * Math.sin(a) );
}



function closest(c) {
	var PPoints = Points.concat(PointsCandidates);

	var selected = PPoints[0];
	var d = Math.sqrt(sizeX * sizeY);

	for (var i=0; i < PPoints.length; i++) {
		
		if (typeof(c) == 'undefined' || typeof(PPoints[i]) == 'undefined')
		  continue;
		
		var d2 = c.distance(PPoints[i]);
		if (d2 < d) {
			selected = PPoints[i];

			d = d2;
		}
	}
	return selected;
}


function findNext(index) {
  var centre = PointsCandidates[index];

  for (var i = 0; i < 3; ++i) {


    var c;
    do {
	    c = findRandomCircle(centre);
    } while (c.x <0 || c.y <0 || c.x >sizeX || c.y >sizeY);


	var closeP = closest(c);

	if (typeof(closeP) == 'undefined' || typeof(c) == 'undefined')
	  continue;

   	var d = c.distance(closeP);

	if (d >= minElementDistance) {
		PointsCandidates.push(c);
		return;
	}
  }

  PointsCandidates.splice(index, 1);
  Points.push(centre);

}


var t;

function setup() {
  // put setup code here
  createCanvas(sizeX, sizeY);
  t = -1;
}


function mouseReleased() {
	PointsCandidates = [];
	Points = [];
	
	PointsCandidates.push( (new P()).set(sizeX/2, sizeY/2) );
	t = millis();
}


function draw() {
	clear();


	for(var i =0; i < Points.length; i++) {
		fill(0);
		ellipse(Points[i].x, Points[i].y, sizeX/80, sizeX/80);
	}
	
	for(var i =0; i < PointsCandidates.length; i++) {
		fill(255,0,0);
		ellipse(PointsCandidates[i].x, PointsCandidates[i].y, sizeX/80, sizeX/80);
	}
	

	if (t > 0) {
		if ( (density - Points.length) >= (density * 0.1) ) {
			var centre = 0; (Math.random() * PointsCandidates.length) | 0;
			findNext(centre);
		}
	}
	
	line(0,0,sizeX, 0);
	line(0,0,0, sizeY);
	line(0,sizeY,sizeX, sizeY);
	line(sizeX,0,sizeX, sizeY);
	
	
}
