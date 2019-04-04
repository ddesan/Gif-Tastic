/// VARIABLES

//Create an array with all the topics for the buttons

var topics = ["Moon", "Sun", "Jupiter", "Galaxy", "Black hole", "Aquarius", "Scorpion", "Cancer", "Capricorn", "Mars", "Neptune"];

var topicDiv;

renderButtons();

$(document).on("click", ".topic-btn", displayGif);

$(document).on("click", ".gif", animateGif);

//$(".gif").on("click",animateGif);

/// FORMULAS


//Function to render buttons on the top of the site with the array input

function renderButtons() {

    $("#add-buttons").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");

        a.addClass("btn btn-info topic-btn");

        a.attr("id", "add-gif");

        a.attr("data-name", topics[i]);

        a.text(topics[i]);

        $("#add-buttons").append(a);
    }
}

// Click function to add a button with the input text from the user in the form

$("#add-topic").on("click", function (event) {

    event.preventDefault();

    var userTopic = $("#user-input").val().trim();

    if (userTopic === ""){

    }

    else {

        topics.push(userTopic);
    
        renderButtons();

        console.log(topics);
    }
});

//Click function for the buttons to ajax a lenght of 10 non-animated gifs and place on page with rating

function displayGif() {

    var topic = $(this).attr("data-name");

    console.log(topic);

    var APIkey = "q3aNc9Fl4mhX6692itDp5svFpkwMC33t";

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + topic + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var e = 0; e < results.length; e++) {

            topicDiv = $("<div>");

            topicDiv.attr("id","results");

            // Rating data from JSON to HTML
            var rating = results[e].rating;

            var rate = $("<p>").text("Rating: " + rating);

            // Image data from JSON to HTML
            var imgURL = $("<img>");

            imgURL.attr("src", results[e].images.fixed_width_still.url);
            imgURL.attr("data-still",results[e].images.fixed_width_still.url);
            imgURL.attr("data-animate",results[e].images.fixed_width.url);
            imgURL.attr("data-state","still");
            imgURL.addClass("gif");

            // Appending the image
            
            topicDiv.append(imgURL);
            topicDiv.append(rate);

            $("#topics-data").prepend(topicDiv);

            console.log(topicDiv);

        }

    })
    
}

/// LOGIC

//Animate each gif by clicking on it and vice versa
function animateGif() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

