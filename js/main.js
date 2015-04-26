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
		$(".date").html(moment().format(dateFormate));
		$(".time").updateWithText(moment().format(timeFormat), 1000);
	}, 10000);

	// Update the weather
	window.setInterval(function() {
		$.getJSON(currWeatherUrl, currWeatherParams, function(json, t) {
			var temp = roundVal(json.main.temp) + "&deg;";
			$(".temp").updateWithText(temp, 1000);
		});
	}, 60000);
});
