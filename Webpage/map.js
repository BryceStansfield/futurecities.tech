var map = 0;	// Init scope
var suggestMap;
var directionsDisplay;

function initMap() {
	var goldcoast = {lat: -27.948276, lng: 153.407532};

	directionsDisplay = new google.maps.DirectionsRenderer();

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: goldcoast
	});

	var suggestMap = new google.maps.Map(document.getElementById('seggestionMap'), {
		zoom: 4,
		center: goldcoast
	});
	
	directionsDisplay.setMap(map);

	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

function massMarkerPlacement(points){
	for(var i = 0; i < points.length; i++){
		var curr = {lat: points[i].lat, lng: points[i].long}
		console.log(curr);
		var marker = new google.maps.Marker({
			position: curr,
			map: map
		})
	}
}

function massCirclePlacement(points, c){
	for(var i = 0; i < points.length; i++){
		var curr = {lat: points[i].lat, lng: points[i].long}
		var col = c || "#0088ff"
		var circle = new google.maps.Circle({
			fillColor: col,
			center: curr,
			radius: points[i].radius,
			strokeOpacity: 0.8,
			fillOpacity: 0.2,
			strokeColor: "white",
			scale: 1,
			strokeWeight: 2,
			map: map
		});
	}
}

function direct(from, to){
	var directionsService = new google.maps.DirectionsService;

	var request = {
		origin: from,
		destination: to,
		travelMode: 'WALKING'
	 };
	directionsService.route(request, function(result, status) {
		//console.log("directionService: " + status);
	    if (status == 'OK') {
	    	directionsDisplay.setDirections(result);
	    }
	});
}
