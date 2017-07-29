var map = 0;	// Init scope
var directionsService = new google.maps.DirectionsService;

function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
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

function massCirclePlacement(points){
	for(var i = 0; i < points.length; i++){
		var curr = {lat: points[i].lat, lng: points[i].long}
		var circle = new google.maps.Circle({
			fillColor: "#0088ff",
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

function direct(from, to, directions){
	directions.route({
		origin: from,
		destination: to,
		travelMode: 'WALKING',
		provideRouteAlternatives: true,
	})
}
