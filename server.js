function getEmailCount(stormpath, request, app) {
	var size = null
		client = null;

  var apiKey = new stormpath.ApiKey(process.env.STORMPATH_API_KEY_ID, process.env.STORMPATH_API_KEY_SECRET);



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
}

(function(){
	var stormpath = require('stormpath')
	    app = require('express')()
	    request = require('request');
	getEmailCount(stormpath, request, app);
    //console.log(getEmailCount(stormpath));
}());
