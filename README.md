#shufflix

You know when you want to watch a random episode of TNG, but can't figure out which one, and then you have to go and try to google random episodes, but then you just end up watching The Best Episodes Ever and nothing from season 1? No, it's just me? Anyway, here's a thing that does that.

The deets
-----
This uses the Netflix [API](http://developer.netflix.com/), so if you want to clone and use this, you'll have to register for one.

The API key/secret go into the routes/config.js file. At the moment, it's set up to pull it from the heroku config variables, but you can change that.

Todos
-----
- add the episode description
- connect to the IMDB API and maybe suggest the "best" and "worst" episodes, rather than purely random 

### <3,
monica
