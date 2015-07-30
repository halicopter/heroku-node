function getEmailCount(stormpath, request, app) {
	var size = null
		client = null
		homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME
		keyfile = homedir + '/.stormpath/apiKey.properties';

	stormpath.loadApiKey(keyfile, function apiKeyFileLoaded(err, apiKey) {
    	if (err) throw err;
    	client = new stormpath.Client({apiKey: apiKey});
    	var app_url = 'https://api.stormpath.com/v1/applications/68pmLTnBHSvLhbbGIgn6Eb/';

    	client.getApplication(app_url, function(err, sp_app) {
     		if (err) throw err;

      		sp_app.getAccounts(function(err, accounts) {
            app.set('port', (process.env.PORT || 5000));
            app.get('/', function(req, res) {
              size = accounts.size;
              var payload = 
                {
                    "item": [
                      { "text": "Emails", value: size},
                      { "text": "", value: size}
                    ]
                };
              res.send(JSON.stringify(payload));
            });
            app.listen(app.get('port'), function() {
              console.log("running at localhost:" + app.get('port'))
            });
      	  });
    	});  
  	});
}

//need to add stuff to file so this can be run/tested on heroku
//how do I mimic sending a request?


(function(){
	var stormpath = require('stormpath')
	    app = require('express')()
	    request = require('request');
	getEmailCount(stormpath, request, app);
    //console.log(getEmailCount(stormpath));
}());
