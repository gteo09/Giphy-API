/////////////GLOBAL VARIABLES/////////////
var searchTopics = ["burger", "sushi", "pretzel", "beer", "pasta", "wine", "cheese", "tofu", "steak", "vegetable"];



/////////////FUNCTIONS/////////////

// function to manipulate dom to display gifs from clicked button
function displayGifs() {

    var userSearch = $(this).attr("data-name");
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=sMbBIFdOSY8RMeb4uDjqPK1llahpCbd2&limit=10&q="+ userSearch; //giphy API URL

    // AJAX call for the topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);
      // Creating a div to hold the search topic
      //loop through array in response from ajax request

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

          // Retrieve static gif image
          var staticURL = response.data[i].images.original_still.url;


          // Creating an element to hold the image and assign relevant attributes
          //this line of code should attach these attributes to the image element but the attributes are not being attached when the code runs,no errors in console.

          var image = $("<img>").attr("src", gifURL).attr("class", "gif").attr("data-still", staticURL).attr("data-active",gifURL).attr("data-state", "animate");

          // Appending the image
          gifDiv.append(image);

          // Putting search results above the previous results
          $("#gifCatcher").prepend(gifDiv);
        }
    });

  }

  // Function for displaying searchTopic data
  function makeButtons() {

    
    $("#buttons").empty();

    // Looping through array of topics
    for (var i = 0; i < searchTopics.length; i++) {

      //Generating buttons for each topic in the array
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

    //Get the input from search bar
    var newTopic = $("#searchInput").val().trim();

    // Adding category from the searchbar to our array
    searchTopics.push(newTopic);


    // Calling renderButtons which handles the processing of our topic array
    makeButtons();
  });

  //runs ajax call when submit button is clicked 
  $(document).on("click", "#addSubject", searchAjax);

  //function to be called whenever submit button is clicked
  function searchAjax(){

    
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

      // Retrieving the URL for the gif
      var gifURL = response.data[i].images.fixed_height.url;

      // Retrieve static gif image
      var staticURL = response.data[i].images.original_still.url;


      // Creating an element to hold the image and assign relevant attributes
      //this line of code should attach these attributes to the image element but the attributes are not being attached when the code runs,no errors in console.
      var image = $("<img>").attr("src", gifURL).attr("class", "gif").attr("data-still", staticURL).attr("data-active",gifURL).attr("data-state", "animate");

      // Appending the image
      gifDiv.append(image);

      // Putting search results above the previous results
      $("#gifCatcher").prepend(gifDiv);
      }
    });
    $("#searchInput").val("");
  };

  //on click function for starting and stopping gifs
  //attributes are being attached but .on click isn't working, data-state isn't being assigned to variable
  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);

    //if else statement to freeze the gif or to make it play depending on current state
    //not currently working 
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    } else {
      $(this).attr("src", $(this).attr("data-active"));
      $(this).attr("data-state", "animate");
    }
  });
  // Adding a click event listener to all elements with a class of gifButton
  $(document).on("click", ".gifButton", displayGifs);

  // Calling the makeButtons function to display intial buttons
  makeButtons();


