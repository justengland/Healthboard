/**
 * Setup the webserver.
 * Using the express webframework, and ejs templating.
 * I am trying to follow the MVC pattern.
 */
 
var express = require('express'); 
var app = module.exports = express.createServer(); 
// Configuration

app.configure(function(){
  app.enable("jsonp callback");
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

/**
 * Route Section
 */
// Base Route
app.get('/', function(req, res){
    var controller = require('./controllers/indexController.js');
    controller.loadModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

// Search Route
app.get('/search', function(req, res){
    var controller = require('./controllers/searchController.js');
    controller.loadModel(req, function(model) {  
        res.render(model.bodyTemplate, model);
    });    
});

// Guage Route
app.get('/gauge', function(req, res){
    var controller = require('./controllers/gaugeController.js');
    controller.loadModel(req, function(model) {  
        res.json(model);
    });    
});

// multiline Route
app.get('/multiline', function(req, res){
    var controller = require('./controllers/multiLineController.js');
    controller.loadModel(req, function(model) {  
        // todo: handle jsonp requests - jsonp = this.app.enabled('jsonp callback');
        res.json(model);
    });    
});

/**
 * Start Web Server
 */
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on: " + port);