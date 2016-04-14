
var express = require('express')
  , http = require('http')
  , path = require('path')
  , conn = require('./db/conn');

var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('port', 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

conn.conn();

app.post('/test', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

app.post('/', conn.processRes);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/test',function(req,res){
	res.send({"a":"Hello"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

