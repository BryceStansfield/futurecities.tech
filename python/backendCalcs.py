def anyInRange(places, range, pos):
	# Returns 
	earthCircum = 6371000; # In metres
	minRange = range;
	closestPoint = -1;
	for i in range(0, len(places)):
		a = math.sin((pos.lat - places[i].lat)/2) ** 2 + math.cos(pos.lat) * math.cos(pleaces[i].lat) * (math.sin((pos.long - places[i].long)/2) ** 2);
		c = 2 * math.atan2(a**0.5, (1-a)**0.5);
		d = earthCircum * c;
		if(d <= minRange):
			minRange = d;
			closestPoint = -1;
	return(closestPoint);