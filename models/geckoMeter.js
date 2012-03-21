
/*
{
    "item":153,
    "min":{ 
        "text":"Min Value", 
        value":0},
    "max":{
        "text":"Max Value",
        "value":1000}
} 
*/

module.exports = function(logglyResponse, minText, minVal, maxText, maxValue) {
    this.item = logglyResponse.numFound;
    this.min = { text : "Min Val", value : 0 };  
    this.max = { text : "Min Val", value : 1000 };
    
    if (typeof minText !== "undefined") {
         this.min.text = minText;
    }
    
    if (typeof minVal !== "undefined") {
         this.min.value = minVal;
    }
    
    if (typeof maxText !== "undefined") {
         this.max.text = maxText;
    }
    
    if (typeof maxValue !== "undefined") {
         this.max.value = maxValue;
    }  
};