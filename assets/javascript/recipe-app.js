var recentSearch = JSON.parse(localStorage.getItem("searches"));

var regExNotLetters = /[^a-z\s]/i;

//Prints the recent searches in its spot whenever this is called
function printFavorites() {
    $("#recent-searches-box").html("");
    if (recentSearch.length > 0) {
        $("#recent-searches-box").html(
            "<button type='submit' class='btn recent-searches-header mt-2'>Recent Searches</button>"
        );
        for (var i = 0; i < recentSearch.length; i++) {
            var ingred1 = recentSearch[i].ing1;
            var ingred2 = recentSearch[i].ing2;
            var ingred3 = recentSearch[i].ing3;

            var newBtn = $("<button>");
            var newBigDiv = $("<div>");
            var newDiv0 = $("<div>");
            var newDiv1 = $("<div>");
            var newDiv2 = $("<div>");

            newBtn.addClass(
                "btn btn-primary recents-button collapse multi-collapse"
            );
            newBtn.attr("data-value", ingred1 + "," + ingred2 + "," + ingred3);
            newBigDiv.addClass("recents-div");

            newDiv0.text(ingred1);
            newDiv1.text(ingred2);
            newDiv2.text(ingred3);

            newBigDiv
                .append(newDiv0)
                .append(newDiv1)
                .append(newDiv2);

            newBtn.append(newBigDiv);

            $("#recent-searches-box").append(newBtn);
        }
    } else {
        //Do nothing
    }
}

$(document).ready(function() {
    if (recentSearch == null) {
        recentSearch = [];
    }

    // submit button storage
    $("#submit-btn").on("click", function() {
        //Makes sure search terms are valid
        if (
            regExNotLetters.test(
                $("#ingredient-input-1")
                    .val()
                    .trim()
            ) == false &&
            regExNotLetters.test(
                $("#ingredient-input-2")
                    .val()
                    .trim()
            ) == false &&
            regExNotLetters.test(
                $("#ingredient-input-3")
                    .val()
                    .trim()
            ) == false
        ) {
            //Makes sure search boxes arent empty
            if (
                $("#ingredient-input-1")
                    .val()
                    .trim() != "" ||
                $("#ingredient-input-2")
                    .val()
                    .trim() != "" ||
                $("#ingredient-input-3")
                    .val()
                    .trim() != ""
            ) {
                var newSearch = {
                    ing1: $("#ingredient-input-1")
                        .val()
                        .trim(),
                    ing2: $("#ingredient-input-2")
                        .val()
                        .trim(),
                    ing3: $("#ingredient-input-3")
                        .val()
                        .trim()
                };

                //Limits recent searches to 3
                if (recentSearch.length >= 3) {
                    for (var i = 3; recentSearch.length >= i; ) {
                        recentSearch.shift();
                    }
                }

                recentSearch.push(newSearch);
                localStorage.setItem("searches", JSON.stringify(recentSearch));
                printFavorites();
            }
        }
    });

    // TIME DISPLAY change paragraph with friendly good morning, good afternoon and good evening.

    var now = moment().format("HH:mm");
    console.log(now);

    if (parseInt(now) < 12 && parseInt(now) > 5) {
        $(".chef-message").text("Good morning");
    }

    if (parseInt(now) >= 12 && parseInt(now) < 18) {
        // alert("true");
        $(".chef-message").text("Good afternoon");
    }

    if (parseInt(now) >= 18 || parseInt(now) === 0) {
        $(".chef-message").text("Good evening");
    }

    printFavorites();

    //Handler for clicking recent searches buttons
    $("body").on("click", ".recents-button", function(event) {
        var ingredientsArray = $(this)
            .attr("data-value")
            .split(",");
        for (var i = 0; i < ingredientsArray.length; i++) {
            var inputId = i + 1;
            $("#ingredient-input-" + inputId).val(ingredientsArray[i]);
        }
    });
});

//Initializing variables
var queryURL;

var baseURL = "https://api.edamam.com/search?";
var recipeObject;

//Initializing magnific handlers

//Do not change these two vars
var appId = "c485664d";
var apiKey = "2a2ce1b2b1251ecd04f880325d65269f";
//

$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // clear previews results
    $("#recipe-container").empty();
    $("#input-error-box").html("");

    //   Loading: spin icon when search button is pressed, animate
    $(".fa-utensils").addClass("loader");
    setTimeout(function() {
        $(".fa-utensils").removeClass("loader");
        // scroll to this part of the page
        $("html, body").animate(
            {
                scrollTop: $("#scrollTo").offset().top
            },
            5
        );
    }, 1300);
    var validEntries = true;
    var searchString = "";

    if (regExNotLetters.test($("#ingredient-input-1").val()) == false) {
        searchString = $("#ingredient-input-1")
            .val()
            .trim();
    } else {
        validEntries = false;
        console.log("Entry 1 invalid.");
        $("#input-error-box").append(
            "<p>Ingredient 1 invalid. Letters and spaces only please!</p>"
        );
    }

    if (regExNotLetters.test($("#ingredient-input-2").val()) == false) {
        if (
            $("#ingredient-input-2")
                .val()
                .trim() != ""
        ) {
            if ($("#ingredient-input-2"))
                searchString +=
                    ", " +
                    $("#ingredient-input-2")
                        .val()
                        .trim();
        }
    } else {
        validEntries = false;
        console.log("Entry 2 invalid.");
        $("#input-error-box").append(
            "<p>Ingredient 2 invalid. Letters and spaces only please!</p>"
        );
    }

    if (regExNotLetters.test($("#ingredient-input-3").val()) == false) {
        if (
            $("#ingredient-input-3")
                .val()
                .trim() != ""
        ) {
            searchString +=
                ", " +
                $("#ingredient-input-3")
                    .val()
                    .trim();
        }
    } else {
        validEntries = false;
        console.log("Entry 3 invalid.");
        $("#input-error-box").append(
            "<p>Ingredient 3 invalid. Letters and spaces only please!</p>"
        );
    }

    if (validEntries) {
        queryURL =
            baseURL +
            "app_id=" +
            appId +
            "&app_key=" +
            apiKey +
            "&q=" +
            searchString;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            recipeObject = response.hits;
            for (var i = 0; i < recipeObject.length; i++) {
                //Data creating the popups for each recipe
                var newAnchor = $("<a>");
                newAnchor.addClass("recipe-link");
                newAnchor.attr("id", "recipe-num-" + i);
                newAnchor.attr("href", "#recipe-popup-" + i);

                var newDiv = $("<div>");
                newDiv.attr("id", "recipe-popup-" + i);
                newDiv.addClass("recipe-popup mfp-hide");
                newDiv.html();

                var leftDiv = $("<div>");
                var rightDiv = $("<div>");

                var newImg = $("<img>");
                newImg.attr("src", recipeObject[i].recipe.image.toString());
                newImg.addClass("popup-image");
                leftDiv.append(newImg);

                var nameLine =
                    "<p>Recipe: " + recipeObject[i].recipe.label + "</p>";
                var lineBreak = "<br>";
                var servingsLine =
                    "<p>Serves: " + recipeObject[i].recipe.yield + "</p>";
                var caloriesLine =
                    "<p>Calories: " +
                    Math.floor(
                        recipeObject[i].recipe.calories /
                            recipeObject[i].recipe.yield
                    ) +
                    "</p>";

                var recipeLinkLine =
                    "<a href='" +
                    recipeObject[i].recipe.url +
                    "' target='_blank'>Click Here to go the recipe</a>";
                var sourceLine =
                    "<p>Source: " + recipeObject[i].recipe.source + "</p>";

                rightDiv.append(
                    nameLine +
                        lineBreak +
                        servingsLine +
                        lineBreak +
                        caloriesLine +
                        lineBreak +
                        recipeLinkLine +
                        lineBreak +
                        sourceLine
                );
                rightDiv.addClass("pl-2 popup-rightside");

                leftDiv.addClass("popup-leftside");

                newDiv.append(leftDiv).append(rightDiv);
                //end of popup creation
                //puts popup window in page, hidden
                $("#recipe-container").append(newDiv);

                //Start of adding each recipe to the page
                var newDiv0 = $("<div>");
                newDiv0.addClass(
                    "container-fluid recipe-holder w3-animate-opacity"
                ); //added smooth animation to recipe loading

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
                column3.html(
                    "<p>Cal.: " +
                        Math.floor(
                            recipeObject[i].recipe.calories /
                                recipeObject[i].recipe.yield
                        ) +
                        "</p>"
                );

                var newThumb = $("<img>");
                newThumb.attr("src", recipeObject[i].recipe.image);
                newThumb.attr("alt", recipeObject[i].recipe.source);
                newThumb.addClass("recipe-thumbnail");

                column1.append(newThumb);

                row2.append(column2).append(column3);
                row1.append(column1);

                newDiv1.append(row1).append(row2);

                newAnchor.append(newDiv1);
                newDiv0.append(newAnchor);

                $("#recipe-container").append(newDiv0);
                setTimeout(function() {
                    $(".recipe-link").magnificPopup({
                        type: "inline",
                        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                    });
                }, 100);

                searchString = "";

                setTimeout(function() {
                    for (var i = 1; i < 4; i++) {
                        $("#ingredient-input-" + i).val("");
                    }
                }, 100);
            }
        });
    } else {
        console.log("Invalid entry detected. Check the input boxes.");
    }
});

var recipeContainer = $("#recipe-container");
