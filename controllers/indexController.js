var modelObject = require('../models/timedRequest.js');

this.loadModel = function (request, callback) {
    var logglyHelper = require('../utilities/logglyHelper.js');
    
    // Compare json.requestId:Rbd9d84f40ef3cbd0
    //         json.requestId:R83df4ac0c2f02082
    
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
};

