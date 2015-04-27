jQuery.fn.updateWithText = function(text, speed) {
	var dummy = $("<div/>").html(text);
	if ($(this).html() != dummy.html()) {
		$(this).fadeOut(speed / 2, function() {
			$(this).html(text);
			$(this).fadeIn(speed / 2, function(){});
		});
	}
}		
			
function roundVal(val) {
	return Math.round(val * 10) / 10;
}

$(document).ready(function() {

	// Set default timezone
	moment.tz.setDefault(timezone);

	// Add a compliment :)
	$(".compliment").html("What's cookin', good lookin'?");

	// Reload on git commit
	window.setInterval(function() {
		$.getJSON('githash.php', {}, function(json, text) {
			if (json) {
				if (json.gitHash != gitHash) {
					window.location.reload();
					window.location.href=window.location.href;
				}
			}
		})
	}, 5000);

	// Update the time
	window.setInterval(function() {
		$(".date").html(moment().format(dateFormat));
		$(".time").updateWithText(moment().format(timeFormat), 1000);
	}, 10000);

	// Update the weather
	window.setInterval(function() {
		var iconTable = {
			'01d':'wi-day-sunny',
			'02d':'wi-day-cloudy',
			'03d':'wi-cloudy',
			'04d':'wi-cloudy-windy',
			'09d':'wi-showers',
			'10d':'wi-rain',
			'11d':'wi-thunderstorm',
			'13d':'wi-snow',
			'50d':'wi-fog',
			'01n':'wi-night-clear',
			'02n':'wi-night-cloudy',
			'03n':'wi-night-cloudy',
			'04n':'wi-night-cloudy',
			'09n':'wi-night-showers',
			'10n':'wi-night-rain',
			'11n':'wi-night-thunderstorm',
			'13n':'wi-night-snow',
			'50n':'wi-night-alt-cloudy-windy'
		}
		$.getJSON(currWeatherUrl, currWeatherParams, function(json, t) {
			var temp = roundVal(json.main.temp) + "&deg;";
			var temp_min = roundVal(json.main.temp_min);
			var temp_max = roundVal(json.main.temp_max);
			var wind = roundVal(json.wind.speed);
			var iconClass = iconTable[json.weather[0].icon];
			var icon = $('<span/>').addClass('icon').addClass('dimmed').addClass('wi').addClass('iconClass');
			$(".temp").updateWithText(icon.outerHTML() + temp, 1000);

			var now = new Date();
			var sunrise = new Date(json.sys.sunrise * 1000).toTimeString().substring(0, 5);
			var sunset = new Date(json.sys.sunset * 1000).toTimeString().substring(0, 5);
			var windString = '<span class="wi wi-strong-wind xdimmed"></span' + wind;
			var sunString = '<span class="wi wi-sunrise xdimmed"></span>' + sunrise;
			if (json.sys.sunrise * 1000 < now && json.sys.sunset * 1000 > now) {
				sunString = '<span class="wi wi-sunset xdimmed"></span>' + sunset;
			}
			$(".windsun").updateWithText(windString + ' ' + sunString, 1000);
		});
	}, 60000);
});
