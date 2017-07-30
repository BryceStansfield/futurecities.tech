function getLocation(){
    userPosition = new point(-34.29, 146.04);
}

function search(){
	string = document.getElementById("mapSearch").value;
	geocoder.geocode({'address': string, function(results, status){
		// Lets just ignore bad statuses for now
		if(status == 'OK'){
			directionToNearestPoint(new point(results[0].geometry.location.lat, results[0].location.lng));
		}
	}})
}