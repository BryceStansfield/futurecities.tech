function toggleNavigation(){	
	var navigation = document.getElementById("navigation");	
	var drawer = document.getElementById("navigationDrawer");	
	var map = document.getElementById("map");	
	var visibility = navigation.style.display;
	
	if(visibility == "none"){
		
		navigation.style.display = "block";
		
		var x = 0.0;
		var animation = setInterval( function() {
			navigation.style.left = -400 * x;
			drawer.style.left = 350 - x * 350;
			map.style.left = 400 - x * 400;
			
			console.log(x);
			if(x > 1){
				clearInterval(animation);
			}
			x += 0.01;
		}, 1);
	}else{
		var x = 0.0;
		var animation = setInterval( function() {
			navigation.style.left = -400 * x;
			drawer.style.left = 350 - x * 350;
			map.style.left = 400 - x * 400;
			
			console.log(x);
			if(x > 1){
				clearInterval(animation);
				navigation.style.display = "none";
			}
			x += 0.01;
		}, 1);
	}
		
	
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