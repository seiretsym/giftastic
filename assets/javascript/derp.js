// https://api.giphy.com/v1/gifs/random?api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&tag=cats

// append button to list
function addBtn() {
    var btnStr = $("#derpSearchText").val().trim();
    
    var btn = $("<button>");
    btn.val("Derp " + btnStr)
    btn.attr("id", "derpGifBtn");
    btn.addClass("btn-dark rounded");
    btn.html("Derp " + btnStr);

    $("#derpBtnView").prepend(btn);
}

// button listener
$(document).on("click", "#derpGifBtn", function() {
    // call function to show gifs
});

// submit button listener
$("#derpSearchBtn").on("click", function() {
    // stop this button from doing crazy stuff
    event.preventDefault();

    // run function addBtn
    addBtn();
});