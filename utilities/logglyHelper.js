// https://github.com/nodejitsu/node-loggly

var util = require('util');
var loggly = require('loggly');
var config = {
    subdomain: "healthgrades",
    auth: {
        username: "user",
        password: "hg.user"
    }
};

exports.search = function(searchQuery, request, responseCallback, errorCallback) {
    var client = loggly.createClient(config);
    var searchContext = createLogglySearchContext(request);
    if (typeof request.query.query !== "undefined") {
        searchQuery = request.query.query;
    } else if (typeof request.query.q !== "undefined") {
        searchQuery = request.query.q;
    }
    client.search(searchQuery)
          //.meta({ inputname: 'hgphoenix' })
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

exports.facet = function(facetQuery, facetBy, request, responseCallback, errorCallback) {
    var client = loggly.createClient(config);    
    var facetContext = createLogglyFacetContext(request);
    // Set the query from the query string
    var fQuery = '*:*';
    if(facetQuery !== null) {
        fQuery = facetQuery;
    } else if (typeof request.query.q !== 'undefined') {
        fQuery = request.query.q;
    }
    
    // Set the query from the query string
    var fBy = 'date';
    if(facetQuery !== null) {
        fBy = facetBy;
    } else if (typeof request.query.facetby !== 'undefined') {
        fBy = request.query.facetby;
    }   
    
    client.facet(fBy, fQuery)
          .context(facetContext)
          .run(function (error, results) {
            if(error !== null) {
                errorCallback(error);
            } else {                    
                util.inspect(results); 
                responseCallback(results);            
            }  
          });
              
};

function createLogglyFacetContext(request) {
    var result = {       
        //facetby: 'date',
        from: 'NOW-1HOUR',
        // query: '*:*',
        buckets: 5,          
        // gap: '+1HOUR'        
        // start: 0,
        // until: 'NOW'
    };
    
    if (typeof request.query.buckets !== "undefined") {
        result.buckets = request.query.buckets;
    }
    
    if (typeof request.query.from !== "undefined") {
        result.from = request.query.from;
    }
    
    if (typeof request.query.gap !== "undefined") {
        result.gap = request.query.gap;
    }
    
    return result;
}

function createLogglySearchContext(request) {
    //var urlObj = url.parse(request.url, true);
    //var rowCount = request.query['rows'];    
    var result = {        
        // from: 'NOW-15MIN',
        // query: '*:*',
        rows: 5,  
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