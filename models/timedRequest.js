
module.exports = function(logglyResponse) {
    this.title = "Time Request Title";
    this.totalCount = logglyResponse.numFound;   

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
            timeStamp: logglyResponse.data[i].timestamp,
            requestId: logglyResponse.data[i].json.requestId,
            sessionId: logglyResponse.data[i].json.sessionId,
        });
    }
    return results.sort(function(recordA, recordB) {
                            var timeA = new Number(recordA.elapsedTime);
                            var timeB = new Number(recordB.elapsedTime);
                            return timeA > timeB;
                        });
}
