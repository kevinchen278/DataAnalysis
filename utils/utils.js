var DBProvider = require("../db/DBProvider");
var jsonfile = require("jsonfile");
var path = require("path");
var geoip = require('geoip-lite');



var saveLog = function(req){

	var ip = req.headers['x-forwarded-for'] || 
	     req.connection.remoteAddress || 
	     req.socket.remoteAddress ||
	     req.connection.socket.remoteAddress;


	var reqDesc = req.body;
    var curTime = new Date();
    var geo = geoip.lookup(ip);

    var doc = {ip: ip,
               behavor: req.body,
               location: geo, 
               time: new Date()
           };

    dbCmd = {collection: 'logs', method: 'insert', query: doc};

    var requestQuery = new DBProvider.DBProvider(dbCmd).requestQuery();
    requestQuery.then(function(items){
     		console.log("log saved.");
     	},
     	function(err){
     		console.log("log error.");

    });
};


var saveJsonFile = function(fileName, jsonData){
	jsonfile.writeFile(fileName,jsonData,function(err) {
	  if (err) {console.error(err);}
	});
};


var saveEnv =function(jsonData){
	saveJsonFile(path.join(__dirname, '../public/Env.json'), jsonData);
};


exports.saveLog = saveLog;
exports.saveEnv = saveEnv;
exports.saveJsonFile = saveJsonFile;


