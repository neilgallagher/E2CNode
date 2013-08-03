/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , workouts = require('./routes/workouts')
    ,systems = require('./routes/systems')
    ,device_status = require('./routes/device_status')
  , mongoose = require('mongoose');

//var jade = require('jade') ;

// MongoDB Connection 
mongoose.connect('mongodb://localhost/workout_tracker');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});




app.get('/', routes.index);
app.get('/workouts', workouts.index);
app.get('/workouts/:id', workouts.show);
app.post('/workouts', workouts.create);
app.put('/workouts', workouts.update);
app.del('/workouts', workouts.delete);
app.get('/systems', systems.index);
app.get('/systems/:id', systems.show);
app.post('/systems', systems.create);
app.put('/systems', systems.update);
app.del('/systems', systems.delete);
app.get('/device_status', device_status.index);


app.get('/status', function (req, res)
{
    res.sendfile(__dirname + '/public/device_status.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s in %s mode.",  app.get('port'), app.settings.env);
});
