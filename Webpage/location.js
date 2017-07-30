function getLocation(){
    userPosition = new point(-34.29, 146.04);
}

function search(){
	string = document.getElementById("mapSearch").value;
	geocoder.geocode({'address': string}, function(results, status){
		// Lets just ignore bad statuses for now
		if(status == 'OK'){
			map.panTo(results[0].geometry.location);
			map.setZoom(17);
			directionToNearestPoint(new point(results[0].geometry.location.lat, results[0].geometry.location.lng));
		}
	})
}