var nodeflix = require('nodeflix')
var config = require('./config')

var netflixApi = new nodeflix({
    consumer_key:       config.apiKey,
    consumer_secret:    config.apiSecret,
});

/*
 * GET shows that match input
 */

exports.shows = function(req, res){
  var params = {term: req.query["title"], max_results: "20"};
  var url = '/catalog/titles';
  console.log("[find show: " + req.query["title"] + "]")
  var relevantShows = {shows: []};

  netflixApi.get(url, params).end(function(data){
  	var json = JSON.parse(data);
    var titles = json.catalog_titles.catalog_title;
    console.log("[api response: " + titles.length + "]");
	
    for (var i = 0; i < titles.length; i++) {
        var title = titles[i].title.regular;
        var link = titles[i].id;
        // if one of the links is "episodes" then this is a show
        for (var j = 0; j < titles[i].link.length; j++) {
          if (titles[i].link[j].title == "episodes")
          {
            // parse the url out
            var id = link.split("http://api-public.netflix.com/catalog/titles/series/")[1]
            relevantShows.shows.push({title:title, url:id});
            break;
          }
        }
    }
    console.log("[returned: " + relevantShows.shows.length + "]");
	res.json(relevantShows);
  });
};

/*
 * GET episodes for a show
 */

exports.episodes = function(req, res){
	var showId = req.query["id"]
	var url = '/catalog/titles/series/' + showId + "/episodes"; 
	console.log("[find episodes: " + showId + "]")
  
  	var relevantEpisodes = {episodes: []};

  	netflixApi.get(url, {}).end(function(data) {
  		var json = JSON.parse(data);
      	var episodes = json.catalog_titles.catalog_title;
      	console.log("[api response: " + episodes.length + "]");

      	for (var i = 0; i < episodes.length; i++) {
	        var title = episodes[i].title.regular;
	        var link = "";
	        // wtf netflix
	        for (var j = 0; j < episodes[i].link.length; j++) {
	          if (episodes[i].link[j].title == "web page")
	          {
	            link = episodes[i].link[j].href;
	            break;
	          }
	        }
	        relevantEpisodes.episodes.push({title:title, url:link});
      	}
      	console.log("[returned: " + relevantEpisodes.episodes.length + "]");
      	res.json(relevantEpisodes);
  	});
};




