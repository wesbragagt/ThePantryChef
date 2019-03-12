//Initializing variables
var queryURL;

var baseURL = "https://api.edamam.com/search?";
var recipeObject;

//Initializing magnific handlers



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
        searchString += ", " + $("#ingredient-input-3").val().trim();
    }

    queryURL = baseURL + "app_id=" + appId + "&app_key=" + apiKey + "&q=" + searchString;

    $.ajax( {
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        console.log(response);
        recipeObject = response.hits;
        for (var i = 0; i < recipeObject.length; i++) {

            var newAnchor = $("<a>");
            newAnchor.addClass("recipe-link");
            newAnchor.attr("id", "recipe-num-" + i);
            newAnchor.attr("href", "#recipe-popup-" + i);

            var newDiv = $("<div>");
            newDiv.attr("id", "recipe-popup-" + i);
            newDiv.addClass("recipe-popup mfp-hide d-flex flex-row");
            newDiv.html();

            var leftDiv = $("<div>");
            var rightDiv = $("<div>");

            var newImg = $("<img>");
            newImg.attr("src", recipeObject[i].recipe.image.toString() );
            newImg.addClass("popup-image");
            leftDiv.append(newImg);

            var nameLine = "<p>Recipe: " + recipeObject[i].recipe.label + "</p>";
            var lineBreak = "<br>"
            var servingsLine = "<p>Serves: " + recipeObject[i].recipe.yield + "</p>";
            var caloriesLine = "<p>Calories: " + Math.floor(recipeObject[i].recipe.calories) + "</p>";
            var recipeLinkLine = "<a href='" + recipeObject[i].recipe.shareAs + "'>Click Here for Full Recipe</a>";
            var sourceLine = "<p>Source: " + recipeObject[i].recipe.source + "</p>";

            rightDiv.append(nameLine + lineBreak + servingsLine + lineBreak + caloriesLine + lineBreak + recipeLinkLine + lineBreak + sourceLine);
            rightDiv.addClass("pr-1 popup-rightside");

            leftDiv.addClass("popup-leftside");

            newDiv.append(leftDiv)
                .append(rightDiv);

            $("body").append(newDiv);
        

            var newDiv0 = $("<div>");
            newDiv0.addClass("container-fluid recipe-holder");

            var newDiv1 = $("<div>");

            var row1 = $("<div>");
            row1.addClass("row");

            var row2 = $("<div>");
            row2.addClass("row recipe-bottom-row");

            var column1 = $("<div>");
            column1.addClass("col-12");

            var column2 = $("<div>");
            column2.addClass("col-8");
            column2.html("<p>" + recipeObject[i].recipe.label + "</p>");

            var column3 = $("<div>");
            column3.addClass("col-4 recipe-bottom-right");
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

            newAnchor.append(newDiv1)
            newDiv0.append(newAnchor);

            $("#recipe-container").append(newDiv0);
            setTimeout(function() {
                $('.recipe-link').magnificPopup({
                    type:'inline',
                    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                });

            }, 100);
            
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