this.loadModel = function (request, callback) {    
    var logglyHelper = require('../utilities/logglyHelper.js');
    logglyHelper.search('*:*', request,
        // I though this was simple enogh for no formal model.
        function(response) {
            var modelObject = require('../models/searchModel.js');
            var fields = loadFileds(request);
            var model = new modelObject(response, fields , 'search.ejs');
            callback(model);
        },
        // Invaild Response from loggly
        function(errorResponse) {
            // todo: show error page
            callback({title: "Loggly Error", err: errorResponse, bodyTemplate: 'error.ejs'});
        }
    );
};

function loadFileds(request) {
    var fields = request.query.fl.split(',');
    var result = [];
    for(var i=0; i<fields.length; i++) { 
        result.push(fields[i].trim());  
    }
    return result;    
}



