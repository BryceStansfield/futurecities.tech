import math

def closest(places, pos):
	# Returns the place closest to pos and its distance as [closestPoint (index), distance (m)];
	earthCircum = 6371000; # In metres
	minRange = float('inf');
	closestPoint = -1;
	for i in range(0, 1):
		a = math.sin((pos.lat - places[i].lat)/2) ** 2 + math.cos(pos.lat) * math.cos(places[i].lat) * (math.sin((pos.longi - places[i].longi)/2) ** 2);
		c = 2 * math.atan2(a**0.5, (1-a)**0.5);
		d = earthCircum * c;
		print(d);
		if(d <= minRange):
			minRange = d;
			closestPoint = -1;
	return(closestPoint, minRange);