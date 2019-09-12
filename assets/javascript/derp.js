// global array for storing search strings
var derpArray = ["Derp Dog", "Derp Cat", "Derp Corgi", "Derp Husky", "Derp Fish", "Derp People"]


// append button to list
function addBtn() {
    // clean button topics
    $("#derpBtnView").empty();

    derpArray.forEach(function(element) {

        var btn = $("<button>");
        btn.val(element)
        btn.attr("id", "derpGifBtn");
        btn.addClass("btn-secondary rounded m-1");
        btn.html(element);

        $("#derpBtnView").append(btn);
    });
}


// show gifs
function showGifs(q) {
    // get gif info from giphy api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results)

        // create for loop to iterate through results
        for (var i = 0; i < results.length; i++) {
            var card = $("<div>");
            var derp = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var span = $("<span>").attr("id", "fav");
            span.html("Add to Favorite");
            span.addClass("float-right m-auto");
            span.attr("data-id", results[i].id);
            p.addClass("card-title text-light");
            p.append(span);
            var derpImg = $("<img>");
            derpImg.attr("src", results[i].images.fixed_height_still.url);
            derpImg.attr("data-still", results[i].images.fixed_height_still.url);
            derpImg.attr("data-animate", results[i].images.fixed_height.url);
            derpImg.attr("data-state", "still");
            derpImg.addClass("gif");
            derp.addClass("card-body");
            card.addClass("card mb-1 border-0 bg-dark");
            card.attr("id", results[i].id);

            derp.append(p, derpImg);
            card.append(derp);
            $("#derpGifView").prepend(card);
        }
    })
}

// gif click listener
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log(this);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// button listener
$(document).on("click", "#derpGifBtn", function() {
    // call function to show gifs
    showGifs($(this).val());
});

// submit button listener
$("#derpSearchBtn").on("click", function() {
    // stop this button from doing crazy stuff
    event.preventDefault();

    // check if input box is empty
    if ($("#derpSearchText").val() === "") {
        // let user know they can't input an empty string
        $("#derpSearchText").attr("placeholder", "this can't be empty!")
    }
    else {
        // add string to array
        derpArray.push("Derp " + $("#derpSearchText").val());

        // empty the search text input
        $("#derpSearchText").val("");

        // run function addBtn
        addBtn();

        // reset placeholder text for #derpSearchText
        $("#derpSearchText").attr("placeholder", "make something derpy!")
    }
});

// add gif to favorites
function addFavorite(dataid) {
    console.log(dataid);
    var card = $("#"+dataid).clone();
    var span = card.children("div").children("p").children("span");
    card.attr("id", "f" + dataid)
    span.html("Remove from Favorite");
    span.attr("id", "favd");
    $("#derpFavorites").append(card);
}

// load preset buttons
$(document).ready(addBtn);

// make mouseenter event on span
$(document).on("mouseenter", "span", function() { 
    $(this).css("cursor", "pointer");
    $(this).css("text-decoration", "underline");
})

// make mouseout event on span
$(document).on("mouseout", "span", function() { 
    // $(this).css("cursor", "cursor");
    $(this).css("text-decoration", "none");
})

// when add favorite is clicked
$(document).on("click", "#fav", function() {
    addFavorite($(this).attr("data-id"));
})

// when remove favorite is clicked
$(document).on("click", "#favd", function() {
    var dataid = $(this).attr("data-id");
    $("#f"+dataid).remove();
})