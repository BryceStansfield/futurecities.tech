function getList(file){
	var results = "";
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			results = this.responseText;
		}
	};
	//xhttp.open("GET", "data/" + file, true);
	xhttp.open("GET", file, true);
	xhttp.send();
	
	var list = results.split("\n");
	for(var i = 0; i < list.length; i++){
		list[i] = list[i].split(",");

		for(var j = 0; j < item.length; j++){
			list[i][i] = list[i][j].trim();
		}
	}
	
	alert(list);
}