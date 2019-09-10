// https://api.giphy.com/v1/gifs/random?api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&tag=cats

// append button to list

// convert string space to plus, so it doesn't break the api url

// button listener
$("button").on("click", function() {

    if ($(this).attr("id") === "derpSearchBtn") {
        console.log("search button clicked");
    }
    else {
        console.log("different button clicked");
    }
})