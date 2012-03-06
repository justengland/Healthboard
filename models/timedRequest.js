
module.exports = function(logglyResponse) {
    this.title = "Time Request Title";
    this.totalCount = logglyResponse.numFound;    
    this.requestId = "requestId";
    this.sessionId = "sessionId";
    this.records = getRecords(logglyResponse);
};

function getRecords(logglyResponse) {
    var results = [];
    var jsonSerializer = require('JSON');
    for(var i=0; i<logglyResponse.data.length; i++) {
        var message = "";
        if(logglyResponse.data[i].isjson)
            message = jsonSerializer.stringify(logglyResponse.data[i].json.message);
        else
            message = logglyResponse.data[i].json.message;
            
        results.push({
            messageType: logglyResponse.data[i].json.messageType,
            clientIp: logglyResponse.data[i].json.ip,
            message: message,
            elapsedTime: logglyResponse.data[i].json.elaspedTime,
        });
    }
    return results;
}