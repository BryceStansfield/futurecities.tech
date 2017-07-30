var range = 1000;
var points = [];
var secondaryPoints = [];
var userPosition = new point(0,0);

function point(lat, long, radius){
	this.lat = lat;
	this.long = long;
	this.radius = radius || 0;
}

function d2r(x){
	return(x * Math.PI / 180);
}

function distance(point1, point2){ // From http://www.movable-type.co.uk/scripts/latlong.html
	var R = 6371e3; // metres
	var l1 = d2r(point1.lat);
	var l2 = d2r(point2.lat);
	var dl = d2r(point2.lat-point1.lat);
	var don = d2r(point1.long-point2.long);

	var a = Math.sin(dl/2) * Math.sin(dl/2) +
        Math.cos(l1) * Math.cos(l2) *
        Math.sin(don/2) * Math.sin(don/2);
    console.log(a);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return(R * c);
}

function closest(places, pos){
	minDist = Infinity;
	best = -1;
	for(var i = 0; i < places.length; i++){
		dist = distance(places[i], pos);
		if(dist < minDist){
			minDist = dist;
			best = i;
		}
	}
	return([minDist, i]);
}

function findGaps(places, r, startX, endX, startY, endY, delta){
	// startX and startY are the smaller of the coords
	y = startY;
	x = startX;
	gaps = [];
	while(x <= endX){
		gaps.push([]);
		while(y <= endY){
			isGap = true;
			for(var i = 0; i < places.length; i++){
				if(distance(new point(x,y), places[i]) <= r){
					isGap = false;
					i = Infinity;
				}
			}
			gaps[gaps.length - 1].push(isGap);
			y += delta;
		}
		y = startY;
		x += delta;
	}
	return(gaps);
}

function dotValue(gaps, dotRange, x, y){
	value = 0;
	for(var circY = Math.min(y - dotRange, 0); circY <= Math.max(y + dotRange, gaps[0].length - 1); y++){
		for(var circX = Math.min(x - dotRange, 0); circX <= Math.max(x + dotRange, gaps.length - 1); x++){
			if(gaps[circX][circY] == true){
				value += 1;
			}
		}
	}
	return(value);
}

function updateGapsSquare(gaps, dotRange){
	for(var circY = Math.min(y - dotRange, 0); circY <= Math.max(y + dotRange, gaps[0].length - 1); y++){
		for(var circX = Math.min(x - dotRange, 0); circX <= Math.max(x + dotRange, gaps.length - 1); x++){
			gaps[circX][circY] = false;
		}
	}
}

function minimizeGapsGreedyApprox(gaps, dotRange, adding){
	// Giving a map of gaps and a dotrange of the util, it trys to add adding utils to fill in the biggest gaps
	place = [];
	for(var number = 0; number < adding; number++){
		max = 0;
		bestSpot = [0,0];
		for(var x = 0; x < gaps.length; x++){
			for(var y = 0; y < gaps.length; y++){
				value = dotValue(gaps, dotRange, x, y);
				if(value > max){
					bestSpot = [x,y];
					max = value;
				}
			}
		}
		if(max != 0){
			place.push(bestSpot);
			gaps = updateGapsSquare(gaps, dotRange);
		}
		else{
			number = Infinity;
		}
	}
	return(place);
}

function directionToNearestPoint(pos){
	var pointTo = points[closest(points, pos)[1]];
	direct({lat: pos.lat, lng: pos.long}, {lat:pointTo.lat, lng: pointTo.lng});
}