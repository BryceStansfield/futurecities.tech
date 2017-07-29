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

function getList(file){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(this.responseText);
		}
	};
	xhttp.open("GET", "data/" + file, true);
	xhttp.send();
	
	
}