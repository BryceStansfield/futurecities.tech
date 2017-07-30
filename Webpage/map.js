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
		position: goldcoast,
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

function cGrad(val){
	var colourA = [0, 0, 255]; // blue
	var colourB = [255, 0, 0]; // red
	var colourR = [0, 0, 0];
	for(var i = 0; i < 3; i++){
		colourR[i] = Math.ceil(colourA[i] + val * (colourB[i] - colourA[i]));
	}
	return(colourR);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
