function myPosition(position) {

	var latitude= position.coords.latitude;
	var longitude= position.coords.longitude;
	var key= '7bb615295b47ea95df83ee01b6364297';
	console.log(latitude);
	console.log(longitude);
		
		
	var weatherRequest = new XMLHttpRequest();
	weatherRequest.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude);
	weatherRequest.onload = function() {
	var data= JSON.parse(weatherRequest.responseText);
	console.log(data)
	
	function addSkycon(data) {
            var skycons = new Skycons({
                "color" : "#fff",
                "resizeClear": true // nasty android hack
            });
         
    var canvas = document.getElementById('canvas');
    canvas.innerHTML= '<canvas id="skycon"></canvas>';
    
    var skyconCanvas = document.getElementById('skycon');
    skyconCanvas.height = 128;
  	skyconCanvas.width = 128;

  	skycons.add(skyconCanvas, data.currently.icon);

  	skycons.play();
	}

	addSkycon(data);
	showDate(data);
	showTimezone(data);
	showTemperature(data);
	showWeatherSummary(data);
	
	}

	weatherRequest.send();
	};
	
navigator.geolocation.getCurrentPosition(myPosition);


function showDate(data) {
	var d= new Date(data.currently.time * 1000);
	var dD= d.toDateString();
	var dT = d.toLocaleTimeString();
	var date = document.getElementById('date');
	date.textContent = dD +" " + dT;

	// toggle background for day or night
	var hours = d.getHours();
	var bodyElement = document.querySelector('body');
	if (hours <= 6 || hours >= 18) {
		bodyElement.className = "day";
	} else {
		bodyElement.className = "night";
	}

}

function showTimezone(data) {
	var timezone = data.timezone;
	var location= document.getElementById('location');
	location.textContent = timezone;
}

function showTemperature(data) {
	var temperature = Math.round(data.currently.apparentTemperature);
	var temp= document.getElementById('temp');
	var temperatureCelcius = Math.round((temperature - 32) * (5/9));
	temp.textContent = temperature + 'F';
	var celciusTofarneheit = document.getElementById('celciusTofarneheit');
	celciusTofarneheit.addEventListener('click', function() {
		if (celciusTofarneheit.textContent === 'C') {
		celciusTofarneheit.textContent = 'F';
		temp.textContent = temperatureCelcius + ' C';
		} else {
		celciusTofarneheit.textContent = 'C';
		temp.textContent = temperature + ' F';	
		}
	});
}

function showWeatherSummary(data) {
	var weatherSummary = data.currently.summary;
	var summary= document.getElementById('summary');
	summary.textContent = weatherSummary;
}


//  let func = (latitude,longitude) => {
// 	fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7bb615295b47ea95df83ee01b6364297/${latitude},${longitude}`)
//  	.then(res => res.json())
//  	.then(data => {
//  		console.log(data);
//  		var d= new Date(data.currently.time);
//  		console.log(d);
//  	});
	
// }


// let pos = (position) => {
// 	console.log(position);
// 	var latitude = position.coords.latitude;
// 	var longitude = position.coords.longitude;
// 	console.log(latitude);
// 	console.log(longitude);
// 	func(latitude, longitude);
// }

// let geoloc = () => {
// 	if (navigator.geolocation) {
// 		navigator.geolocation.getCurrentPosition(pos);
// 	}
// 	return 'Error!';
// }

// window.onload = geoloc();