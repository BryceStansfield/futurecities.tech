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