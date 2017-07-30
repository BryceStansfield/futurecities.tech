function getList(file, handler){
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