//TODO: add code to read and set any environment variables with the dotenv package.
//"dotenv": "^6.2.0",
require("dotenv").config();

//"axios": "^0.18.0",
const axios = require("axios");

//"moment": "^2.24.0",
const moment = require("moment");

//"node-spotify-api": "^1.0.7"
const Spotify = require("node-spotify-api");

//TODO: import the keys.js file and store it in a variable.
const keys = require("./keys.js");

//TODO: access your keys.
const spotify = new Spotify(keys.spotify);

//Node.js File System Module
const fs = require('fs');

//#######################################################
//User Input
const command = process.argv[2];
const value = process.argv.slice(3).join(" ");
console.log(`
    ========================
    Command: ${command}
    Value: ${value}
    Process: ${process.argv.slice(2)}
    ========================
`);
//#######################################################
//TODO: Run user input to switch case to check which command to run
let cmdChecker = (command, value) => {
    //TODO: Review command from user input and run function
    switch (command) {
        case 'concert-this':
            bitFunc(value)
            break;
        case 'spotify-this-song':
            spotifyFunc(value)
            break;
        case 'movie-this':
            ombdFunc(value)
            break;
        case 'do-what-it-says':
            fsFunc()
            break;
        default:
            console.log(`
Sorry, Command: "${command}" is not in our system.
===================
Try these commands:
concert-this
spotify-this-song
movie-this
do-what-it-says
===================
        `);
    }
}
//Commands:
//#######################################################
//TODO:node liri.js concert-this <artist/band name here>
// - https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp
// - Name of the venue
// - Venue location
// - Date of the Event (use moment to format this as "MM/DD/YYYY")
let bitFunc = value => {
    axios
        .get("https://rest.bandsintown.com/artists/" +
            value
            + "/events?app_id=codingbootcamp")
        .then(
            function (res) {
                let dataArr = res.data;
                for (let i = 0; i < dataArr.length; i++) console.log(`
    =========================================================
    Lineup: ${dataArr[i].lineup}
    Venue: ${dataArr[i].venue.name}
    Location: ${dataArr[i].venue.city},${dataArr[i].venue.region},${dataArr[i].venue.country}
    Date: ${moment(dataArr[i].datetime).format("MM/DD/YY")}
    =========================================================
    `)
            })
        .catch(
            function (error) {
                console.log(error.response.data.message);
            });
};
//#######################################################
// TODO:node liri.js spotify-this-song '<song name here>'
// - Artist(s)
// - The song's name
// - A preview link of the song from Spotify
// - The album that the song is from
// - If no song is provided then your program will default to "The Sign" by Ace of Base.
let spotifyFunc = value => {

    //TODO: If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!value) {
        value = "The Sign"
        let artist = 'Ace of Base'
        spotify
            .search({ type: 'artis', type: 'track', query: value, query: artist, limit: 1 })
            .then(function (res) {
                let dataArr = res.tracks.items;
                console.log(`
    Default Searh: ${value} by ${artist}
    =========================================================
    Artist: ${dataArr[0].album.artists[0].name}
    Album: ${dataArr[0].album.name}
    Song: ${dataArr[0].name}
    Play the song: ${dataArr[0].external_urls.spotify}
    =========================================================
    `);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    //TODO: Search user input song
    else {
        spotify
            .search({ type: 'track', query: value, limit: 5 })
            .then(function (res) {
                let dataArr = res.tracks.items;
                // console.log(dataArr);

                for (let i = 0; i < dataArr.length; i++)
                    console.log(`
    =========================================================
    Artist: ${dataArr[i].album.artists[0].name}
    Album: ${dataArr[i].album.name}
    Song: ${dataArr[i].name}
    Play the song: ${dataArr[i].external_urls.spotify}
    =========================================================
    `);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
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
let ombdFunc = value => {
    if (!value) value = 'Mr. Nobody'
    axios
        .get("http://www.omdbapi.com/?t="
            + value +
            "&apikey=trilogy")
        .then(
            function (res) {
                // console.log(res.data);
                let dataArr = res.data;
                console.log(`
    =========================================================
    Title: ${dataArr.Title}
    Released Date: ${dataArr.Released}
    Ratings: ${dataArr.Ratings[1].Source}: ${dataArr.Ratings[1].Value}
    Country of production: ${dataArr.Country}
    Language: ${dataArr.Language}
    Actors: ${dataArr.Actors}
    Plot: ${dataArr.Plot}
    =========================================================
                `)

            })
}
//#######################################################
//TODO: node liri.js do-what-it-says
// - Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// - It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// - Edit the text in random.txt to test out the feature for movie-this and concert-this.
let fsFunc = () => {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log("Command from file: " + data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        // console.log(dataArr);
        //run through function
        cmdChecker(dataArr[0], dataArr[1])
    })
}
//#######################################################
cmdChecker(command, value)
