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

exports.getLogglyApi = function(searchQuery, request, responseCallback, errorCallback) {
    var client = loggly.createClient(config);
    var searchContext = createLogglyRequestContext(request);
    if (typeof request.query.query !== "undefined") {
        searchQuery = request.query.query;
    } else if (typeof request.query.q !== "undefined") {
        searchQuery = request.query.q;
    }
    client.search(searchQuery)
          .meta({ inputname: 'hgphoenix' })
          .context(searchContext)
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

function createLogglyRequestContext(request) {
    //var urlObj = url.parse(request.url, true);
    //var rowCount = request.query['rows'];    
    var result = {        
        // from: 'NOW-15MIN',
        // query: '*:*',
        rows: 2,  
        //start: 0,
        // until: 'NOW'
    };
    if (typeof request.query.rows !== "undefined") {
        result.rows = request.query.rows;
    }
    
    if (typeof request.query.from !== "undefined") {
        result.from = request.query.from;
    }
    /*
    if (typeof request.query.query !== "undefined") {
        result.query = request.query.query;
    }
    if (typeof request.query.rows !== "undefined") {
        result.rows = request.query.rows;
    }
    if (typeof request.query.start !== "undefined") {
        result.start = request.query.start;
    }
    if (typeof request.query.until !== "undefined") {
        result.until = request.query.until;
    }
    */
    
    return result;
}


/* Call Loggly raw
exports.getLogglyApi = function(searchQuery, responseCallback) {
    var request = require('request');
    request('https://user:pass@healthgrades.loggly.com/api/' + searchQuery, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        responseCallback(body);
        }
    });
};
*/