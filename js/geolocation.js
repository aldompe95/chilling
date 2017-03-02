/* You dont need JQUERY lml */

    let geolocation = '';
    const locationData = []; // Create array where the geolocation json will be saved
    const endpoint = 'https://gist.githubusercontent.com/aldompe95/076f3665938df9d8342cac553f27bc7a/raw/306c075736729f9ee2e5c0b9839e592faba7bdb3/movies.json'; // Assign the json movies url
    const movies = []; // Create array where the json will be saved
    let locationMovies; // Define location movies variable

    function getLocation(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(setPosition);
        }else{alert("Geolocation is not supported by this browser.");}
    }
    
    function setPosition(position){
      geolocation = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBn-efsvIZ0_4w4zNu_ZL1beaJwiE-KpTw`; // get specified cordinates
      getLocationJson();
    }  
    
    /* ES7, just testing...
    (async() => {
      var response = await fetch(endpoint);
      var data = await response.json(); // Load and extract the json content
      await movies.push(...data); // Save the data into array
    })();*/   

    //ES6
    function getLocationJson(){
      fetch(geolocation)
        .then(blob => blob.json())
        .then(data => locationData.push(data.results))
        .then(call => {
          const city = ((locationData[0])[0].address_components[5].long_name); // Get the city name of the array
          console.log(city);
          getMoviesJson(city); // Change the string for the city const (I have to get the cordenates first) 
        });
    }

    function getMoviesJson(city){
      fetch(endpoint)
        .then(blob => blob.json()) // Load and extract the json content
        .then(data => movies.push(...data)) // Save the data into array
        .then(call => findMovies(city, movies)); // Find the movies of the city
    }

    // Find location movies
    function findMovies(city, movies){
      locationMovies = [];
      movies.forEach(movie =>{
        movie.cities.forEach(cities=>{
          const regex = new RegExp(city, 'gi');
          if(cities.city.match(regex)){locationMovies.push(movie);}
        });
      });
    }

    // Builder
    function initialize(){
      getLocation();
    }

    initialize();