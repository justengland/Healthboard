// var modelObject = require('../models/searchModel.js');
// Sample - http://everydaypow.web711.discountasp.net/logglyproxy.ashx?callType=facets&facetType=date&q=json.errorcode:[0%20TO%20403]%20OR%20json.errorcode:[405%20TO%201000]%20AND%20inputname:hgone&from=NOW-1HOUR&resultFormat=gauge
// Example Result - {"item":153,"min":{"text":"Min Value","value":0},"max":{"text":"Max Value","value":1000}}

this.loadModel = function (request, callback) {
    callback( {"item":153,"min":{"text":"Min Value","value":0},"max":{"text":"Max Value","value":1000}} );
};
