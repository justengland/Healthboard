module.exports = function(logglyResponse, fieldList, template) {
    this.title = "Timed Request";
    this.totalCount = logglyResponse.numFound;   
    this.bodyTemplate = template;
    this.records = trimFields(logglyResponse, fieldList);
};

function trimFields(logglyResponse, fieldList) {
    return [
            {title: 'trimField', timeout:100, input:'test1'},
            {title: 'trimField1', timeout:50, input:'test2'},
            {title: 'trimField2', timeout:30, input:'test3'},
           ];
}