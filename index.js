/////////////////////////////////////////
//
// Scraping tweets d'un compte Twitter
// (Licence MIT)
// Par @demangejeremy
//
/////////////////////////////////////////

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '@demangejeremy',
  count: 10,
  result_type: 'recent',
  lang: 'fr'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].text }
      console.log(id);
    }
  } else {
    console.log(err);
  }
})