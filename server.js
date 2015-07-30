function getEmailCount(stormpath, request, app) {
	var size = null
		client = null
		homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME
		keyfile = homedir + '/.stormpath/apiKey.properties';

  app.use(stormpath.init(app, {
    apiKeyId:     process.env.STORMPATH_API_KEY_ID,
    apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
    secretKey:    process.env.STORMPATH_SECRET_KEY,
    application:  process.env.STORMPATH_URL,
  }));
  var apiKey = new stormpath.ApiKey(
    process.env['STORMPATH_API_KEY_ID'],
    process.env['STORMPATH_API_KEY_SECRET']
  );
  
  var client = new stormpath.client({apikey: apikey});

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

}

//need to add stuff to file so this can be run/tested on heroku
//how do I mimic sending a request?


(function(){
	var stormpath = require('express-stormpath')
	    app = require('express')()
	    request = require('request');
	getEmailCount(stormpath, request, app);
    //console.log(getEmailCount(stormpath));
}());
