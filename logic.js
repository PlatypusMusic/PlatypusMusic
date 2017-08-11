// var lastFmApiKey = "6a39f3465b8cc8531c8558573311b265";

 function searchArtists(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=8ce559d2fd9f4e234a3ac172db2d0ef6&format=json";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);
      console.log(response.artist.name);
      console.log(response.artist.bio);
      console.log(response.artist.image[0]);

      // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(response.artist.name);
      var artistURL = $("<a>").attr("href", response.artist.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.artist.image[3]["#text"]);
      var Bio = $("<h2>").text("Bio: " + response.artist.bio.summary);
        
        $("#artist-div").empty();
        $("#similarArtist-div").empty();

       for ( var i = 0; i < 4; i++) {
        var similarArtists = $("<h2>").text(response.artist.similar.artist[i].name);
        similarArtists.css("color", "white");


      
      $("#artist-div").append(artistURL, artistImage, Bio);
      $("#similarArtist-div").append(similarArtists);
      Bio.css("color", "white");
      }
      
      
    });
  }

  function searchUpcomingEvents(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=playtapus";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      
      var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#upcomingEventsDiv").empty();
      $("#upcomingEventsDiv").append(upcomingEvents, goToArtist);
    });
  }

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function (passing in the artist as an argument)
    searchArtists(artist);
    searchUpcomingEvents(artist)
  });