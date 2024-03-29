$(document).ready(function () {

    $("#addBtn").on('click', function (event) {
        event.preventDefault();

        var btnName = $("#btnName").val().trim();
        console.log(btnName);
        createNewBtn(btnName);
    });

    // Event listener for all button elements
    $(document).on("click", function (event) {
        event.preventDefault();
        var btnClicked = $(event.target);
        if ($(btnClicked).attr("data-person")) {
            var person = $(btnClicked).attr("data-person");
            searchGiphy(person);
        };
        // In this case, the "this" keyword refers to the button that was clicked

    });

    function createNewBtn(btnTitle) {
        var newBtn = $("<button>");
        newBtn.attr('data-person', btnTitle);
        newBtn.text(btnTitle);
        newBtn.addClass('gif');
        $("#searchButtons").append(newBtn);
    };

    function searchGiphy(searchParam) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchParam + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            
            .then(function (response) {
                
                var results = response.data;
              
                for (var i = 0; i < results.length; i++) {
                    
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                       
                        var gifDiv = $("<div>");
                       
                        var rating = results[i].rating;
                       
                        var p = $("<p>").text("Rating: " + rating);
                        var animated = results[i].images.fixed_height.url;
                        var still = results[i].images.fixed_height_still.url;
                        var personImage = $("<img>");
                        
                        personImage.attr("src",still);
                        personImage.attr("data-still",still);
                        personImage.attr("data-animated", animated);
                        personImage.attr("data-state","still");
                        personImage.addClass("imgClass");
                        gifDiv.append(p);
                        gifDiv.append(personImage);
                        
                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                }
            });
    }
    $(document).on("click", ".imgClass", function () {
        console.log($(this));
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })





})
