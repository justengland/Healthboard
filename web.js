/**
 * Setup the webserver.
 * Using the express webframework, and ejs templating.
 * I am trying to follow the MVC pattern.
 */
 
var express = require('express'); 
var app = module.exports = express.createServer(); 
// Configuration

app.configure(function(){
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

// Routes
app.get('/', function(req, res){
    var indexController = require('./controllers/indexController');
    indexController.loadModel(req, function(model) {        
        res.render('index', model);
    });    
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on: " + port);