// API call
var myAPI = "f48f376b3f3a0f2f2c42323709cb6fb9";

var newQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=Nashville&appid=" + myAPI;

console.log(newQueryURL);
$.ajax({
    url: newQueryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})



// // Only run display-related functions after the document loads
// $(document).ready(function(){




// });