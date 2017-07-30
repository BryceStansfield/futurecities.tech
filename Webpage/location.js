function getLocation(){
    userPosition = new point(-34.29, 146.04);	// We don't have a https certificate 
}

function search(){
	string = document.getElementById("mapSearch").value;
	geocoder.geocode({'address': string}, function(results, status){
		// Lets just ignore bad statuses for now
		if(status == 'OK'){
			map.panTo(results[0].geometry.location);
			map.setZoom(17);
			directionToNearestPoint(new point(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
		}
	})
}

function generateUserData(points){
	var width = -28.014762 + 28.034765;
	var points = [];
	for(var i = 0; i < points; i++){
		points.push(new point(-28.034765 - width + 2*width*Math.random(),153.399744 - width + 2*width*Math.random(),50));
	}
	massMarkerPlacement(points);
}