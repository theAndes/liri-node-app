//"axios": "^0.18.0",
const axios = require("axios");
//"moment": "^2.24.0",
const moment = require("moment");
//"node-spotify-api": "^1.0.7"
const Spotify = require("node-spotify-api");
//TODO: add code to read and set any environment variables with the dotenv package.
//"dotenv": "^6.2.0",
require("dotenv").config();

//TODO: import the keys.js file and store it in a variable.
const keys = require("./keys.js");
//TODO: access your keys.
var spotify = new Spotify(keys.spotify);

//Commands:
//#######################################################
//TODO:node liri.js concert-this <artist/band name here>
// - https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp
// - Name of the venue
// - Venue location
// - Date of the Event (use moment to format this as "MM/DD/YYYY")
//#######################################################
// TODO:node liri.js spotify-this-song '<song name here>'
// - Artist(s)
// - The song's name
// - A preview link of the song from Spotify
// - The album that the song is from
// - If no song is provided then your program will default to "The Sign" by Ace of Base.
//#######################################################
//TODO: node liri.js movie-this '<movie name here>'
// - http://www.omdbapi.com/?t='+ value+ '&apikey=trilogy
// - Title of the movie.
// - Year the movie came out.
// - IMDB Rating of the movie.
// - Rotten Tomatoes Rating of the movie.
// - Country where the movie was produced.
// - Language of the movie.
// - Plot of the movie.
// - Actors in the movie.
// - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//#######################################################
//TODO:node liri.js do-what-it-says
// - Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// - It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// - Edit the text in random.txt to test out the feature for movie-this and concert-this.
//#######################################################

const command = process.argv[2];
const value = process.argv.slice(3).join("");
console.log(`
========================
========================
Command: ${command}
Value: ${value}
Process: ${process.argv}
========================
========================
`);
