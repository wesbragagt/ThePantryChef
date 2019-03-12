//Initializing variables
var queryURL;

var baseURL = "https://api.edamam.com/search?";
var recipeObject;

//Do not change these two vars
var appId = "c485664d";
var apiKey = "2a2ce1b2b1251ecd04f880325d65269f";
// 

$("#submit-btn").on("click",   function(event) {
    event.preventDefault();
    var searchString = $("#ingredient-input-1").val().trim();
    if ($("#ingredient-input-2").val().trim() != "") {
        searchString += ", " + $("#ingredient-input-2").val().trim();
    }
    if ($("#ingredient-input-3").val().trim() != "") {
        seachString += ", " + $("#ingredient-input-3").val().trim();
    }

    queryURL = baseURL + "app_id=" + appId + "&app_key=" + apiKey + "&q=" + searchString;

    $.ajax( {
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        console.log(response);
        recipeObject = response.hits;
        for (var i = 0; i < recipeObject.length; i++) {
            var newDiv1 = $("<div>");
            newDiv1.addClass("container-fluid recipe-holder");

            var row1 = $("<div>");
            row1.addClass("row");

            var row2 = $("<div>");
            row2.addClass("row");

            var column1 = $("<div>");
            column1.addClass("col-12");

            var column2 = $("<div>");
            column2.addClass("col-8");
            column2.html("<p>" + recipeObject[i].recipe.label + "</p>");

            var column3 = $("<div>");
            column3.addClass("col-4");
            column3.html("<p>Time: " + recipeObject[i].recipe.totalTime + " Min.</p>" );

            var newThumb = $("<img>");
            newThumb.attr("src", recipeObject[i].recipe.image);
            newThumb.attr("alt", recipeObject[i].recipe.source);
            newThumb.addClass("recipe-thumbnail");


            column1.append(newThumb);

            row2.append(column2)
                .append(column3);
            row1.append(column1);

            newDiv1.append(row1)
                .append(row2);

            $("#recipe-container").append(newDiv1);
            
            searchString = "";
            
            setTimeout(function() {
                for (var i = 1; i < 4; i++) {
                    $("#ingredient-input-" + i).val("");
                }
            }, 100);
            
        };
    });
});

var recipeContainer = $("#recipe-container");

