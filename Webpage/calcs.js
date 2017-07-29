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
	y = startY;
	x = startX;
	gaps = [];
	while(y <= endY){
		gaps.push([]);
		while(x <= endX){
			isGap = true;
			for(var i = 0; i < places.length; i++){
				if(distance(point(x,y), places[i]) <= r){
					isGap = false;
					i = Infinity;
				}
			}
			gaps[gaps.length - 1].push(isGap);
			x += delta;
		}
		x = startX;
		y += delta;
	}
	return(gaps);
}