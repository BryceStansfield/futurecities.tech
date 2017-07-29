function toggleNavigation(){	
	var navigation = document.getElementById("navigation");	
	var visibility = navigation.style.display;
	
	if(visibility == "none")
		navigation.style.display = "block";
	else
		navigation.style.display = "none";
	
}

var x = document.getElementById("demo");
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Cannot access geo locations");
    }
}
function showPosition(position) {
	alert(position.coords.latitude +" : "+ position.coords.longitude);
}

function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }