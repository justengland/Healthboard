var modelObject = require('../models/timedRequest.js');

this.loadModel = function (callback) {
        
    var logglyHelper = require('../utilities/logglyHelper.js');
    logglyHelper.getLogglyApi('json.url:x74n8', 3, 
        // Vaild Response from Loggly
        function(response) {
            var model = new modelObject(response);
            callback(model);
        },
        // Invaild Response from loggly
        function(errorResponse) {
            // todo: show error page
            callback({title: "Loggly Error"});
        });
};
