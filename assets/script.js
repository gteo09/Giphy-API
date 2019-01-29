/////////////GLOBAL VARIABLES/////////////
var searchTopics = ["burger", "sushi", "pretzel", "beer", "pasta", "wine", "cheese", "tofu", "steak", "vegetable"];
//var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=sMbBIFdOSY8RMeb4uDjqPK1llahpCbd2&tag="+ userSearch; //giphy API URL


/////////////FUNCTIONS/////////////

// function to manipulate dom to display gifs from clicked button
function displayGifs() {

    var userSearch = $(this).attr("data-name");
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=sMbBIFdOSY8RMeb4uDjqPK1llahpCbd2&limit=10&q="+ userSearch; //giphy API URL

    // Creating an AJAX call for the topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
      // Creating a div to hold the search topic
      //loop through array from ajax request

      for(var i=0; i<response.data.length; i++){

          var gifDiv = $("<div class='gif'>"); //

          // Storing the rating data
          var gifRating = response.data[i].rating;

          // Creating an element to have the rating displayed
          var ratingEL = $("<p>").text("Rating: " + gifRating); 

          // Displaying the rating
          gifDiv.append(ratingEL);

          // Retrieving the URL for the image
          var gifURL = response.data[i].images.fixed_height.url;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", gifURL).attr("class", "gif");

          // Appending the image
          gifDiv.append(image);

          // Putting search results above the previous results
          $("#gifCatcher").prepend(gifDiv);
        }
    });

  }

  // Function for displaying searchTopic data
  function makeButtons() {

    // Deleting topics prior to adding new topics
    $("#buttons").empty();

    // Looping through array of topics
    for (var i = 0; i < searchTopics.length; i++) {

      //Generating buttons for each movie in the array
      var newButton = $("<button>");

      // Adding a class of gifButton to button
      newButton.addClass("gifButton");

      // Adding data-attribute
      newButton.attr("data-name", searchTopics[i]);

      // Providing the initial button text
      newButton.text(searchTopics[i]);

      // Adding the button to the buttons div
      $("#buttons").append(newButton);
    }
  }

  // This function handles events where submit button is clicked
  $("#addSubject").on("click", function(event) {
    event.preventDefault();

    //Get the input from the textbox
    var newTopic = $("#searchInput").val().trim();

    // Adding movie from the textbox to our array
    searchTopics.push(newTopic);

    
    // displayGifs();

    //$("#searchInput").val("");

    // Calling renderButtons which handles the processing of our movie array
    makeButtons();
  });

  //runs ajax call when submit button is clicked 
  $(document).on("click", "#addSubject", searchAjax);

  function searchAjax(){

    console.log(this);
    $("#addSubject").attr("data-name", $("#searchInput").val().trim());

    var userSearch = $(this).attr("data-name");
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=sMbBIFdOSY8RMeb4uDjqPK1llahpCbd2&limit=10&q="+ userSearch; //giphy API URL

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){

      console.log(response)

      for(var i=0; i<response.data.length; i++){

      var gifDiv = $("<div class='gif'>"); //

      // Storing the rating data
      var gifRating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var ratingEL = $("<p>").text("Rating: " + gifRating); 

      // Displaying the rating
      gifDiv.append(ratingEL);

      // Retrieving the URL for the image
      var gifURL = response.data[i].images.fixed_height.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", gifURL).attr("class", "gif");

      // Appending the image
      gifDiv.append(image);

      // Putting search results above the previous results
      $("#gifCatcher").prepend(gifDiv);
      }
    });
    $("#searchInput").val("");
  };

  //on click function for starting and stopping gifs
  $(".gif").on("click", function() {
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
  });
  // Adding a click event listener to all elements with a class of gifButton
  $(document).on("click", ".gifButton", displayGifs);

  // Calling the makeButtons function to display intial buttons
  makeButtons();


