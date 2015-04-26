var currWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast";

var timezone = "America/Los_Angeles";
var dateFormat = "dddd, MMMM Do YYYY";
var timeFormat = "hh:mm";

var currWeatherParams = {
	"zip":"98101",
	"units":"imperial"
};

var forecastParams = {
	"q":"Seattle,us",
	"mode":"xml",
	"units":"imperial"
};



