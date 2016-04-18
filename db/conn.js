
var MongoClient = require('mongodb').MongoClient;

var defaultConnStr = "mongodb://tcsedison:abc123456@ds017070.mlab.com:17070/kevinchen278";

var Database = {error: 'error', message: "DB has not been connected.", db: null};

exports.getDB = function(){
	return Database;
};


exports.requestConn = function(connStr) {
	if (!connStr) {connStr = defaultConnStr;}

	MongoClient.connect(connStr, function(err, db) {
		if (err) {
			Database = {error: "error", message: "DB connected Fail.", db: null};
			console.log(Database.message);
		} else {
			Database = {error: null, message: "DB connected successfully.", db: db};
			console.log(Database.message);
		}
	});
};


