var map = 0;	// Init scope
var suggestMap;
var directionsDisplay;
var markers = [];

function initMap() {
	getList("data/fountain.csv", intoPointArray)
	var goldcoast = {lat: -27.948276, lng: 153.407532};
	geocoder = new google.maps.Geocoder();
	directionsDisplay = new google.maps.DirectionsRenderer();

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: goldcoast,
		mapTypeControlOptions: {
        	position:google.maps.ControlPosition.TOP_CENTER
    	}
	});

	var suggestMap = new google.maps.Map(document.getElementById('seggestionMap'), {
		zoom: 4,
		center: goldcoast
	});

	directionsDisplay.setMap(map);

	map.setZoom(10);
    map.panTo(goldcoast);
}

function massMarkerPlacement(points){
	for(var i = 0; i < points.length; i++){
		var curr = {lat: points[i].lat, lng: points[i].long}
		console.log(curr);
		var marker = new google.maps.Marker({
			position: curr,
			map: map
		});
		markers.push(marker);
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
		markers.push(circle);
	}
}

function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setMapOnAll(null);
}

function showMarkers() {
	setMapOnAll(map);
}

function deleteMarkers() {
	clearMarkers();
	markers = [];
}


//use to clear whole map of markers and circles
function clearMap(){
	deleteMarkers();
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
	var colourA = [0, 255, 0]; // green
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

function rgbToHex([r, g, b]) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



function populationMap(file){
	var results = "";

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			results = this.responseText;
			console.log(results);
			results = results.split('\n');
			var lowest = Number(results[0].split(',')[0]);
			var highest = Number(results[0].split(',')[1]);
			var range = highest - lowest;
			for(var i = 1; i < results.length; i++){
				var temp = results[i].split(',');
				massCirclePlacement([new point(Number(temp[0]), Number(temp[1]), 1000)], rgbToHex(cGrad((temp[2]-lowest)*(1/range))));
			}
		}
	};
	//xhttp.open("GET", "data/" + file, true);
	xhttp.open("GET", file, true);
	xhttp.send();

	var list = results.split("\n");
}
