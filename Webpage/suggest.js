function initSuggestMap() {
	var goldcoast = {lat: -27.948276, lng: 153.407532};

	var map = new google.maps.Map(document.getElementById('seggestionMap'), {
		zoom: 4,
		center: goldcoast
	});

	directionsDisplay.setMap(map);

	var marker = new google.maps.Marker({
		position: goldcoast,
		map: map
	});
}

function suggest(action){
	var overlay = document.getElementById("suggestionOverlayBackground");
	
	
	if(action){
		
		
		
	}
	
	
	overlay.style.display = "none";
}

function selectSuggestion(){
	
	overlay.style.display = "block";
	
	
	
}