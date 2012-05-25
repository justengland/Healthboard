

module.exports = function(logglyResponse, fieldList, template) {
    this.title = "Timed Request";
    this.totalCount = logglyResponse.numFound;   
    this.bodyTemplate = template;
    this.records = trimFields(logglyResponse, fieldList);
    this.fields = fieldList;
    
    this.toCsv = function () {
        var csv = require('csv');
        var fs = require('fs');
        var writeStream = fs.createWriteStream('./output');
        var arr = [
          [1,2,3,4,5],
          [2,4,6,8,10]
        ];
        csv().from(arr).toStream(writeStream); 
        return writeStream;
    };
};

function trimFields(logglyResponse, fieldList) {    
    // Create a stub object that I can repopulate
    var rowJson = "{" 
    for(var i=0; i<fieldList.length; i++) {       
       rowJson += '"' + fieldList[i] + '":"notset1",';       
    }
    rowJson = rowJson.substring(0, rowJson.length - 1);
    rowJson += "}";
    var stub = JSON.parse(rowJson);
    
    // trim down the loggly response to its distilled parts
    var result = [];
    for(var i=0; i<logglyResponse.data.length; i++) {     
        var row = logglyResponse.data[i];
        // clone the stub response
        var newRecord = JSON.parse(JSON.stringify(stub));
        for(var j=0; j<fieldList.length; j++) {   
            var fieldname = fieldList[j];
            newRecord[fieldname] = getFieldVal(row, fieldname);  
        } 
        result.push(newRecord);
    }
    
    return result;
}

// Allow for json dot notation
function getFieldVal(source, fieldName) {
    if(fieldName.indexOf(".") === -1) {
        return source[fieldName];
    }    
    else {
        var firstChildName = fieldName.split(".")[0];
        var remainingFieldName = fieldName.substring(firstChildName.length + 1);
        return getFieldVal(source[firstChildName], remainingFieldName);
    }
}
