var modelObject = require('../models/timedRequest.js');

this.loadModel = function (callback) {
        
    var logglyHelper = require('../utilities/logglyHelper.js');
    logglyHelper.getLogglyApi('json.requestId:Rbd9d84f40ef3cbd0', 2000, 
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
