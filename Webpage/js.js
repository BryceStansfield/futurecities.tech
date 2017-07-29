function toggleNavigation(){	
	
	var container = document.getElementById("container");
	if(container.classList.contains("navHide")){
		container.classList.remove("navHide");
	}else{
		container.classList.add("navHide");
	}
	
	/*var navigation = document.getElementById("navigation");	
	var drawer = document.getElementById("navigationDrawer");	
	var map = document.getElementById("map");	
	var visibility = navigation.style.display;
	
	var animationSpeed = 0.02;
	
	if(visibility == "none"){
		
		navigation.style.display = "block";
		
		var x = 0.0;
		var animation = setInterval( function() {
			navigation.style.left = 400 * x - 400;
			drawer.style.left = x * 350;
			map.style.left = x * 400;
			
			console.log(x);
			if(x > 1){
				clearInterval(animation);
			}
			x += animationSpeed;
		}, 1);
	}else{
		var x = 1.0;
		var animation = setInterval( function() {
			navigation.style.left = 400 * x - 400;
			drawer.style.left = x * 350;
			map.style.left = x * 400;
			
			console.log(x);
			if(x < 0){
				clearInterval(animation);
				navigation.style.display = "none";
			}
			x -= animationSpeed;
		}, 1);
	}
	*/
	
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