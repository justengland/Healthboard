// Constructor
module.exports = function(fieldList, logglyResponse) {
    this.title = "Loggly Field List";
    this.totalCount = logglyResponse.numFound;   
    this.records = getRecords(fieldList, logglyResponse);
};

// Load the request from loggly
function getRecords(fieldList, logglyResponse) {
    var results = [];
    for(var i=0; i<logglyResponse.data.length; i++) {
        
    }
    return results;
}
