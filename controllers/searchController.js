// var modelObject = require('../models/searchModel.js');

this.loadModel = function (request, callback) {
    callback({title: 'Search Page', bodyTemplate: 'search.ejs'});
    
    /*
    var logglyHelper = require('../utilities/logglyHelper.js');
    
    logglyHelper.getLogglyApi('*:*', request, 
        // Vaild Response from Loggly
        function(response) {
            var model = new modelObject(response);
            callback(model);
        },
        // Invaild Response from loggly
        function(errorResponse) {
            // todo: show error page
            callback({title: "Loggly Error", err: errorResponse});
        });
    */
};

