var map = 0;	// Init scope
var suggestMap;
var directionsDisplay;
var markers = [];
var circles = [];

function initMap() {
	getList("data/fountain.csv", intoPointArray)
	var goldcoast = {lat: -27.948276, lng: 153.407532};
	geocoder = new google.maps.Geocoder();
	directionsDisplay = new google.maps.DirectionsRenderer();

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: goldcoast
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
		circles.push(circle);
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

function deleteCircles() {
	clearMarkers();
	circles = [];
}

//use to clear whole map of markers and circles
function clearMap(){
	deleteCircles();
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

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function populationMap(file){
	var results = "";

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			results = this.responseText;
			results = results.split('\n');
			for(var i = 0; i < results.length; i++){
				list.push(results[i].split(','));
				for(var j = 0; j < list[i].length; j++){
					list[i][j] = Number(list[i][j]);
				}
			}

			handler(list.slice(1,list.length-2));
		}
	};
	//xhttp.open("GET", "data/" + file, true);
	xhttp.open("GET", file, true);
	xhttp.send();

	var list = results.split("\n");
}

function intoPointArray(arr){
	console.log(arr);
	for(var i = 0; i < arr.length; i++){
		arr[i] = new point(arr[i][0], arr[i][1], range);
	}
	points = arr;
}
