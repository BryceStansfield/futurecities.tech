function point(lat, long){
	this.lat = lat;
	this.long = long;
}

function distance(point1, point2){ // From http://www.movable-type.co.uk/scripts/latlong.html
	var R = 6371e3; // metres
	var φ1 = point1.lat.toRadians();
	var φ2 = point2.lat.toRadians();
	var Δφ = (point2.lat-point1.lat).toRadians();
	var Δλ = (point1.long-point2.long).toRadians();

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return(R * c)
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
				if(distance(point(x,y), places[i]) <= r){
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

