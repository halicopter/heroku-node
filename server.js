function getEmailCount(stormpath, request, app) {
  var size = null;
    client = null
    homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME
    keyfile = homedir + '/.stormpath/apiKey.properties';

  stormpath.loadApiKey(keyfile, function apiKeyFileLoaded(err, apiKey) {
      if (err) throw err;
      client = new stormpath.Client({apiKey: apiKey});
      var app_url = 'https://api.stormpath.com/v1/applications/68pmLTnBHSvLhbbGIgn6Eb/';

      client.getApplication(app_url, function(err, app) {
        if (err) throw err;

          app.getAccounts(function(err, accounts) {
            size = accounts.size;
            postEmailCount(size, request);
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