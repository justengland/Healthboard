module.exports = function(downloadResults) {
    this.chart = createChartOutput();
    
    for (var i=0;i<downloadResults.length;i++) {
        this.chart.series.push(createSeries(
            downloadResults[i].name,
            downloadResults[i].response));
    }
    
};

function createSeries(seriesName, logglyResponse) {
    var result = {
        name: seriesName,
        data: []
    };
    
    for(var facetKey in logglyResponse.data) {
        var facetCount = logglyResponse.data[facetKey];
        result.data.push(createFacetBucket(facetKey, facetCount));
        // result.data.push(createBucket(100, 2012, 2, 22, 12));
    }
    
    /*
    result.data.push(createBucket(100, 2012, 2, 22, 12));
    result.data.push(createBucket(12, 2012, 2, 23, 12));
    result.data.push(createBucket(13, 2012, 2, 24, 12));
    result.data.push(createBucket(16, 2012, 2, 25, 12));
    result.data.push(createBucket(17, 2012, 2, 26, 12));
    */
    
    return result;
}

function createBucket(count, year, month, day, hours) {
    return [ Date.UTC(year, month, day, hours), count ];
}

function createFacetBucket(key, count) {
    var facetDate = new Date(key);
    if (typeof facetDate !== "undefined") {
        return createBucket(
            count,
            facetDate.getFullYear(),            
        	facetDate.getMonth(),
            facetDate.getDate(),
    		facetDate.getHours()
        );        
    }
    
    return [ key, count ];
}

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
        height: 170,
        defaultSeriesType: "line"
      },
      
      title: {
         text: "Site Overview",
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
            text: "Errors"
         },
         plotLines: [{
            value: 0,
            width: 1,
            color: "#808080"
         }]
      },
      tooltip: {
          shared: true       
      },
      legend: {
         layout: "vertical",
         align: "right",
         verticalAlign: "top",
         x: -10,
         y: 100,
         borderWidth: 0
      },
      
      series: []
  };
}