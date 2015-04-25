jQuery.fn.updateWithText = function(text, speed) {
	var dummy = $("<h1/>").html(text);
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
		$("#displayDate").html(moment().format("dddd, MMMM Do YYYY"));
		$("#displayTime").updateWithText(moment().format("hh:mm"), 1000);
	}, 10000);

	// Update the weather
	window.setInterval(function() {
		$.getJSON(currWeatherUrl, currWeatherParams, function(json, t) {
			var temp = roundVal(json.main.temp) + "&deg;";
			$("#currWeather").updateWithText(temp, 1000);
		});
	}, 60000);
});
