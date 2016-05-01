
var express = require('express'),
    http = require('http'),
    path = require('path'),
    conn = require('./db/conn'),
    myUtils = require('./utils/utils.js'),
    webservice = require('./WebServices/webservice');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 
 
var app = express();

var staticPath = "public";  //default path;
if (process.argv.length > 1) {
	staticPath = process.argv[2];
}


// all environments
app.set('port', server_port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, staticPath)));

conn.requestConn();
// myUtils.saveEnv({server: server_ip_address, port: server_port});


app.post('/test', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

app.post('/', webservice.processRes);

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/geturl', function(req, res){
	res.send({url: server_ip_address, port: server_port});
});

http.createServer(app).listen(app.get('port'), server_ip_address, function(){
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port + " Static Path:" + staticPath);
});

