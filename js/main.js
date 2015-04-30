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

$.fn.outerHTML = function(){
    // IE, Chrome & Safari will comply with the non-standard
    // outerHTML, all others (FF) will have a fall-back for cloning
    return (!this.length) ? this : (this[0].outerHTML || (
      function(el){
          var div = document.createElement('div');
          div.appendChild(el.cloneNode(true));
          var contents = div.innerHTML;
          div = null;
          return contents;
    })(this[0]));
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

	// Set up stock table rows
	for (var i = 0; i < stockList.length; ++i) {
		$.ajax({
			url: stockLookupUrl,
			data: {'input': stockList[i]},
			dataType: 'jsonp',
			success: function(json) {
				var row = $('<tr/>');
				row.append($('<td/>').addClass(json[0].Symbol));
				$('.stock-table').append(row);
			}
		});
	}

	// Update the stock info
	window.setInterval(function() {
		$.ajax({
			url: stockLookupUrl,
			data: {'input':'netflix'},
			dataType: 'jsonp',
			success: function(json) {
				$.ajax({
					url: stockQuoteUrl,
					data: {'symbol': json[0].Symbol},
					dataType: 'jsonp',
					success: function(json) {
						var stockStr = json.Symbol;
						var open = json.Open.toFixed(2).toString();
						if (open.length == 5) {
							stockStr += "  ";
						} else {
							stockStr += " ";
						}
						stockStr += open;
						var delta = json.ChangePercent.toFixed(2);
						if (delta < 0.0) {
							stockStr += " -";
						} else {
							stockStr += " +";
						}
						stockStr += Math.abs(delta).toString();
						var classStr = "." + json.Symbol;
						$(classStr).html(stockStr);
					}
				})
			},
			error: function(data) {
				console.log(data);
			}
		});
	}, 15000);

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
		};
		$.getJSON(currWeatherUrl, weatherParams, function(json, t) {
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
			var windString = '<span class="wi wi-strong-wind xdimmed"></span>' + ' ' + wind;
			var sunString = '<span class="wi wi-sunrise xdimmed"></span>' + ' ' + sunrise;
			if (json.sys.sunrise * 1000 < now && json.sys.sunset * 1000 > now) {
				sunString = '<span class="wi wi-sunset xdimmed"></span>' + sunset;
			}
			$(".windsun").updateWithText(windString + '   ' + sunString, 1000);
		});
	}, 60000);

	// Update the forecast
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
		};
		$.getJSON(forecastUrl, weatherParams, function(json, t) {
			var forecastData = {};
			for (var i in json.list) {
				var forecast = json.list[i];
				var dateKey  = forecast.dt_txt.substring(0, 10);
				if (forecastData[dateKey] == undefined) {
					forecastData[dateKey] = {
						'timestamp':forecast.dt * 1000,
						'icon':forecast.weather[0].icon,
						'temp_min':forecast.main.temp,
						'temp_max':forecast.main.temp
					};
				} else {
					forecastData[dateKey]['icon'] = forecast.weather[0].icon;
					forecastData[dateKey]['temp_min'] =
						(forecast.main.temp < forecastData[dateKey]['temp_min']) ?
							forecast.main.temp : forecastData[dateKey]['temp_min'];
					forecastData[dateKey]['temp_max'] =
						(forecast.main.temp > forecastData[dateKey]['temp_max']) ?
							forecast.main.temp : forecastData[dateKey]['temp_max'];
				}

			}
			var forecastTable = $('<table />').addClass('forecast-table');
			var opacity = 1;
			for (var i in forecastData) {
				var forecast = forecastData[i];
			    var iconClass = iconTable[forecast.icon];
				var dt = new Date(forecast.timestamp);
				var row = $('<tr />').css('opacity', opacity);
				row.append($('<td/>').addClass('day').html(moment.weekdaysShort(dt.getDay())));
				row.append($('<td/>').addClass('icon-small').addClass(iconClass));
				row.append($('<td/>').addClass('temp-max').html(roundVal(forecast.temp_max)));
				row.append($('<td/>').addClass('temp-min').html(roundVal(forecast.temp_min)));
				forecastTable.append(row);
				opacity -= 0.155;
			}
			$('.forecast').updateWithText(forecastTable, 1000);
		});
	}, 60000);
});
