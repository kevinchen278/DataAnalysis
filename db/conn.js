var  database = null;


exports.conn = function(){
	var MongoClient = require('mongodb').MongoClient;
	var db=null;

	MongoClient.connect("mongodb://tcsedison:abc123456@ds017070.mlab.com:17070/kevinchen278", function(err, db) {
	  if(!err) {
	  	database = db;
	    console.log("DB connected successfully.");
	  }
	});

};


var getHailData = function(res,agg_qry){
		var db = database;

	  	var hail = db.collection("hail");

	  	hail.aggregate(agg_qry).toArray(function(err,items){
		  	 	res.send(items);
		 });

};


exports.processRes  = function(req, res){

		console.log("1:" + req);
		console.log("2:" + req.data);

		var qry = [];
	  	switch (req.body.byType) {
	  		case "state":
	  			qry = [{$group: {_id: "$State", total: {$sum: "$Population Affected"}}},{$sort: {_id:1}}];
	  			break;
	  		case "date":
	  			qry = [{$group: {_id: "$Data", total: {$sum: "$Population Affected"}}},{$sort: {_id:1}}];
	  			break;
	  		case "stateDays":
	  		    qry = [{$match: {"Population Affected": {$gt:0}}},{$group: {_id: "$State", total: {$sum: 1}}},{$sort: {_id:1}}];

	  	}

	  	getHailData(res,qry);

};







