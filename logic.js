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
      var artistImage = $("<img>").attr("src", response.artist.image[2]["#text"], "align", "right");
      var Bio = $("<p>").text(response.artist.bio.summary.substring(response.artist.bio.summary[0],response.artist.bio.summary.indexOf("<a")));
        
        $("#artist-div").empty();
        $("#similarArtist-div").empty();

       for ( var i = 0; i < 4; i++) {
        var similarArtists = $("<h3>").text(response.artist.similar.artist[i].name);
        var similarArtistsURL = $("<a>").attr("href", response.artist.similar.artist[i].url).append(similarArtists);

        console.log("similar artist link: " + response.artist.similar.artist[i].url);


      
      $("#artist-div").append(artistURL, artistImage, Bio);
      $("#similarArtist-div").append(similarArtistsURL);
      artistImage.css("float", "left");
      artistImage.css("margin-right", "10px");
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


  function searchAlbums(artist) {

   
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=8ce559d2fd9f4e234a3ac172db2d0ef6&format=json";


     $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);
      console.log(response.topalbums.album[0].name);
      console.log(response.topalbums.album[0].image[1]["#text"]);
      

         $("#albumDiv1").empty();
         $("#albumDiv2").empty();
         $("#albumDiv3").empty();


        var artistAlbum1 = $("<h4>").text(response.topalbums.album[0].name);
        var albumImage1 = $("<img>").attr("src", response.topalbums.album[0].image[2]["#text"]);

        var artistAlbum2 = $("<h4>").text(response.topalbums.album[1].name);
        var albumImage2 = $("<img>").attr("src", response.topalbums.album[1].image[2]["#text"]);

        var artistAlbum3 = $("<h4>").text(response.topalbums.album[2].name);
        var albumImage3 = $("<img>").attr("src", response.topalbums.album[2].image[2]["#text"]);

        


      $("#albumDiv1").append(artistAlbum1, albumImage1);
      $("#albumDiv2").append(artistAlbum2, albumImage2);
      $("#albumDiv3").append(artistAlbum3, albumImage3);
      

      });
  }




  function streamingAccounts(artist) {

    //Querying the MusicGraph api for the selected artist
    var queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=f195226f9a12a0b87eb1809dfa181da1&name=" + artist;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      console.log(response);


      // Receiving the spotify id
      var spotifyID = (response.data[0].spotify_id);

      // Make Spotify URL a variabel to plugin
      var spotifyPage = ("open.spotify.com/artist/"+ spotifyID);
      
      // Receiving the youtube id
      var youtubeID = (response.data[0].youtube_id);

      // Make Youtube Url a variable to plugin
      var youtubePage = ("youtube.com/channel/" + youtubeID);
    });
  }


  // Event handler for user clicking the select-artist button
  $(".select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    $("#artistCarousel").hide();
    $("#bioDiv").show();
    $("#similarDiv").show();
    $("#albums").show();
    $("#eventsDiv").show();
    // Storing the artist name
    var artist = $(".artist-input").val().trim();

    // Running the searchArtists function (passing in the artist as an argument)
    searchArtists(artist);
    searchUpcomingEvents(artist);

    searchAlbums(artist);

    streamingAccounts(artist);
  });
