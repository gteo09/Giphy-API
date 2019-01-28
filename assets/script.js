/////////////GLOBAL VARIABLES/////////////
var searchTopics = ["burger", "sushi", "pretzel", "beer", "pasta", "wine", "cheese", "tofu", "steak", "vegetable"];
//var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=sMbBIFdOSY8RMeb4uDjqPK1llahpCbd2&tag="+ userSearch; //giphy API URL


/////////////FUNCTIONS/////////////

// function to manipulate dom to display gifs from clicked button
function displayGifs() {

    var userSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=sMbBIFdOSY8RMeb4uDjqPK1llahpCbd2&limit=10&tag="+ userSearch; //giphy API URL

    // Creating an AJAX call for the topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
      // Creating a div to hold the search topic
      var gifDiv = $("<div class='gif'>"); //

      // Storing the rating data
      var gifTitle = response.data.title;

      // Creating an element to have the rating displayed
      var titleEL = $("<p>").text("Title: " + gifTitle); 

      // Displaying the rating
      gifDiv.append(titleEL);

      // Retrieving the URL for the image
      var gifURL = response.data.url;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", gifURL);

      // Appending the image
      gifDiv.append(image);

      // Putting search results above the previous results
      $("#gifCatcher").append(gifDiv);
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

  // This function handles events where a movie button is clicked
  $("#addSubject").on("click", function(event) {
    event.preventDefault();

    //Get the input from the textbox
    var newTopic = $("#searchInput").val().trim();

    // Adding movie from the textbox to our array
    searchTopics.push(newTopic);

    // Calling renderButtons which handles the processing of our movie array
    makeButtons();
  });

  // Adding a click event listener to all elements with a class of gifButton
  $(document).on("click", ".gifButton", displayGifs);

  // Calling the makeButtons function to display intial buttons
  makeButtons();


