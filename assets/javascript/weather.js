// API call
var myAPI = "f48f376b3f3a0f2f2c42323709cb6fb9";

var newQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=Nashville&units=imperial&appid=" + myAPI;

console.log(newQueryURL);
$.ajax({
    url: newQueryURL,
    method: "GET"
}).then(function(response){
    console.log(response);

    // Get current temperature
    var temperature = response.main.temp;
    temperature = Math.floor(temperature);

    var weatherType = response.weather[0].main;

    var weatherIcon = response.weather[0].icon;
    console.log(weatherIcon);

    // Attempted to add the weather icon (inline) to the existing message. Will require more changes than probably desired
    var weatherIconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

    var weatherIconDisplay = $("<img>").attr("src", weatherIconURL);

    var weatherMessage = "It's currently " + temperature + "&#8457;" + " outside. Weather condition: " + weatherType;
    
    $(".weather-message").append(weatherMessage, weatherIconDisplay);
})

