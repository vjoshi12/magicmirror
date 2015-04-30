var currWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast";

var stockLookupUrl = "http://dev.markitondemand.com/Api/v2/Lookup/json";
var stockQuoteUrl = "http://dev.markitondemand.com/Api/v2/Quote/json";

var timezone = "America/Los_Angeles";
var dateFormat = "dddd, MMMM Do YYYY";
var timeFormat = "hh:mm";

var weatherParams = {
	'q':'Seattle,us',
	'units':'imperial'
};

var stockList = [
	'Apple',
	'Facebook',
	'Google',
	'Microsoft',
	'Netflix',
	'Twitter'
]
