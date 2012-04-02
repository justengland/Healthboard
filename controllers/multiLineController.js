// var modelObject = require('../models/searchModel.js');
// Sample - http://everydaypow.web711.discountasp.net/SiteStatusProxy.ashx?&input=hgone&days=7
// Sample - /multiline?qhello=*:*&qworld=*:*&gap=1DAY&rows=10&from=NOW-15DAYS
this.loadModel = function (request, callback) {    
    var logglyHelper = require('../utilities/logglyHelper.js');    
    var modelObject = require('../models/multiLineHighChart.js');    
    var async = require('async');   
    
    if (typeof request.query !== "undefined") {
        // Has querystring
        
        var logglyCalls = [];    
        // Loop through query string to create calls
        for(var queryStringKey in request.query) {
            var queryStringValue = request.query[queryStringKey];            
            if( "q" === queryStringKey.toLowerCase().substr(0, 1) ) {
                var queryName = queryStringKey.substr(1);
                logglyCalls.push({
                    name: queryName, 
                    q:queryStringValue, 
                    response:{}
                });
            }
        }
        
        var asyncArray = [];
        
        // for (var i=0;i<logglyCalls.length;i++) {
        async.forEach(logglyCalls, function (call) {
            // Prepare an async call to loggly
            asyncArray.push(function(asyncCallback){
                var query = call.q;
                logglyHelper.facet(query, null, request, 
                // Vaild Response from Loggly
                function(logglyResponse) {              
                    call.response = logglyResponse;
                    asyncCallback(null, call);
                    // logglyCalls[logglyCallIndex -1].response = logglyResponse;
                    
                },
                // Invaild Response from loggly
                function(errorResponse) {
                    // todo: show error page
                    callback({title: "Loggly API Call Error", err: errorResponse, bodyTemplate: 'error.ejs'});
                });
            });    
        }, null);
                             
        // Call loggly
        
        async.series(asyncArray, function (err, results) {
            var model = new modelObject(results);
            
            callback(model.chart);
        }); 
    }
    else {
        // No querystring
        callback({title: "Multichart needs query strings", err: errorResponse, bodyTemplate: 'error.ejs'});
    }
};

