// var modelObject = require('../models/searchModel.js');
// Sample - http://everydaypow.web711.discountasp.net/logglyproxy.ashx?callType=facets&facetType=date&q=json.errorcode:[0%20TO%20403]%20OR%20json.errorcode:[405%20TO%201000]%20AND%20inputname:hgone&from=NOW-1HOUR&resultFormat=gauge
// Example Result - {"item":153,"min":{"text":"Min Value","value":0},"max":{"text":"Max Value","value":1000}}

this.loadModel = function (request, callback) {    
    var logglyHelper = require('../utilities/logglyHelper.js');
    
    logglyHelper.facet(null, null, request, 
        // Vaild Response from Loggly
        function(response) {            
            var modelObject = require('../models/geckoMeter.js');
            var model = new modelObject(
                response, 
                request.query.minText,
                request.query.minVal,
                request.query.maxText,
                request.query.maxVal);
            callback(model);
        },
        // Invaild Response from loggly
        function(errorResponse) {
            // todo: show error page
            callback({title: "Loggly Error", err: errorResponse, bodyTemplate: 'error.ejs'});
        });
};

