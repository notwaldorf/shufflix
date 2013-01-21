var config = {}

// if you're running this locally
//config.apiKey = 'batman';			// <---- fill this in unless you're batman
//config.apiSecret = 'batman';		// <---- this one too

// alternatively, if you're running this from heroku:
config.apiKey = process.env.API_KEY
config.apiSecret = process.env.API_SECRET

module.exports = config;