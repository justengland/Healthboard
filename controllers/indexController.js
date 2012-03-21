this.loadModel = function (request, callback) {    
    var logglyHelper = require('../utilities/logglyHelper.js');
    
    logglyHelper.search('*:*', request, 
        // Vaild Response from Loggly
        function(response) {
            var modelObject = require('../models/timedRequest.js');
            var model = new modelObject(response, 'index.ejs');
            callback(model);
        },
        // Invaild Response from loggly
        function(errorResponse) {
            // todo: show error page
            callback({title: "Loggly Error", err: errorResponse, bodyTemplate: 'error.ejs'});
        });
};

