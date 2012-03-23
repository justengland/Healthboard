// var modelObject = require('../models/searchModel.js');
// Sample - http://everydaypow.web711.discountasp.net/SiteStatusProxy.ashx?&input=hgone&days=7

this.loadModel = function (request, callback) {    
    var logglyHelper = require('../utilities/logglyHelper.js');
    
    var model = createChartOutput();
    model.series = {};
    callback(model);
        
    /*
    logglyHelper.facet(null, null, request, 
        // Vaild Response from Loggly
        function(response) {            
            var modelObject = require('../models/geckoMeter.js');
            var model = new modelObject(
                response, 
                request.query.minText,
                request.query.minVal,
                request.query.maxText,
                request.query.maxVal);
            callback(model);
        },
        // Invaild Response from loggly
        function(errorResponse) {
            // todo: show error page
            callback({title: "Loggly Error", err: errorResponse, bodyTemplate: 'error.ejs'});
        });
    */
};

function createChartOutput() {
    return {
        chart: {
         renderTo: 'container',
         plotBackgroundColor: 'rgba(35,37,38,0)',
    	 backgroundColor: 'rgba(35,37,38,100)',
		 borderColor: 'rgba(35,37,38,100)',
		 lineColor: 'rgba(35,37,38,100)',
		 plotBorderColor: 'rgba(35,37,38,100)',
         plotBorderWidth: null,
         plotShadow: false,
		 height: 170
         defaultSeriesType: ""line""
      },
      title: {
         text: ""Site Overview"",
         x: -20 //center
      },
      xAxis: {
		 type: 'datetime',
         tickWidth: 2,
         labels: {
            align: 'left',
            x: 3,
            y: -3 
         }
      },
      yAxis: {
         title: {
            text: ""Errors""
         },
         plotLines: [{
            value: 0,
            width: 1,
            color: ""#808080""
         }]
      },
      tooltip: {
          shared: true       
      },
      legend: {
         layout: ""vertical"",
         align: ""right"",
         verticalAlign: ""top"",
         x: -10,
         y: 100,
         borderWidth: 0
      },
	  series: {}  
    };
}
