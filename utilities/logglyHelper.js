// https://github.com/nodejitsu/node-loggly

var util = require('util');
var loggly = require('loggly');
var config = {
    subdomain: "healthgrades",
    auth: {
        username: "hgadmin",
        password: "hg.loggly"
    }
};

exports.getLogglyApi = function(searchQuery, rowCount, responseCallback, errorCallback) {
    var client = loggly.createClient(config);
    client.search(searchQuery)
          .meta({ inputname: 'hgphoenix' })
          .context({ rows: rowCount })
          .run(function (error, results) {
                // Inspect the result set
                if(error !== null) {
                    errorCallback(error);
                } else {                    
                    util.inspect(results); 
                    responseCallback(results);            
                }         
           });
};

/* Call Loggly raw
exports.getLogglyApi = function(searchQuery, responseCallback) {
    var request = require('request');
    request('https://hgadmin:hg.loggly@healthgrades.loggly.com/api/' + searchQuery, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        responseCallback(body);
        }
    });
};
*/