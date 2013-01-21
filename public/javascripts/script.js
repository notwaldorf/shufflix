function hideEverything() {
	$('#list-of-shows').hide()
	$('#list-of-eps').hide()
	$('#waiting').hide()			
}

function makeClickersGo() {
	$('#search').click(doASearch);
	$('#what').keypress(function(e) {
	    if(e.which == 13) {
	        doASearch();
		}
	});

	$('#redisplay').click(displayAnEpisode);
	$(".a-show").live("click", function () { 
		var id = this.dataset["num"];
		getMeARandomEpisodeFromShow(id);
	});		
}

function doASearch() {
	hideEverything()
	var what = $('#what').val();
	var country = $("input[name=country]:checked").val();
	if (what == "")
		return;
	$('#waiting').show()
	$.get('/shows', {title : what, country:country}, dealWithSearchResults);
}

function dealWithSearchResults(data) {
	$('#waiting').hide();

	$('#shows li').remove();
	var shows = data.shows;
	var whereShowsGo = $('#shows');

	if (shows.length == 0)
	{
		whereShowsGo.append('<li>No shows match your query...:(</li>')
		$('#waiting').hide()
		$('#list-of-shows').show();
		$('#list-of-shows h2').hide();
		return;
	}
	else if (shows.length == 1 )
	{
		getMeARandomEpisodeFromShow(shows[0].url);
	}
	else {
		for (var i = 0; i < shows.length; i++)
		{
			whereShowsGo.append('<li><a class="a-show" href="#" data-num="' + shows[i].url + 
				'">' + shows[i].title + '</a></li>')
		}
		$('#waiting').hide()
		$('#list-of-shows').show();	
	}
}

function getMeARandomEpisodeFromShow(id) {
	$('#waiting').show()
	$('#list-of-shows').hide()
	var country = $("input[name=country]:checked").val();
	$.get('/episodes', { id:id, country:country },
		function(data) {
			episodes = data.episodes;
			displayAnEpisode();
		});
}

function displayAnEpisode()
{
	$('#random li').remove();
	var randomEpisode = Math.floor(Math.random() * episodes.length)

	$('#random').append('<li><a target="_blank" href="' + episodes[randomEpisode].url + '">' + 
		episodes[randomEpisode].title + '</a></li>')

	$('#waiting').hide()
	$('#list-of-shows').hide()
	$('#list-of-eps').show();
}