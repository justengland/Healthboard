
module.exports = function(logglyResponse, template) {
    this.title = "Timed Request";
    this.totalCount = logglyResponse.numFound;   
    this.bodyTemplate = template;
    this.records = getRecords(logglyResponse);
};

function getRecords(logglyResponse) {
    var results = [];
    var jsonSerializer = require('JSON');
    
    if(logglyResponse.data.length == 0) {        
        // todo: return null and create a graceful zero results view.
        return results;
    }
        
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
            elapsedTime: Math.round(logglyResponse.data[i].json.elaspedTime),
            timeStamp: logglyResponse.data[i].timestamp,
            requestId: logglyResponse.data[i].json.requestId,
            sessionId: logglyResponse.data[i].json.sessionId,
    		timeSinceLast: 0
        });
    }
	
	results = results.sort(
        function(a, b) {
              if (a.elapsedTime < b.elapsedTime)
                 return -1;
              if (a.elapsedTime > b.elapsedTime)
                return 1;
                
              if (a.timeStamp < b.timeStamp)
                 return -1;
              if (a.timeStamp > b.timeStamp)
                return 1;
                 
              return 0;
        });
   
    return addTimeSinceLast(results);
}

function addTimeSinceLast(records){
	for(var i=1; i<records.length; i++) {
		records[i].timeSinceLast = records[i].elapsedTime - records[i-1].elapsedTime;
	}
	return records;
}