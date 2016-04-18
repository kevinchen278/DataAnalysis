
var conn = require("./conn");

var Data = {error: 'error', message: "error on getting data before request.", data: null};

var DBProvider = function(option) {
	if (option) {
		this.setting(option);
	} else {
		this.collection = null;
		this.method = null;
		this.query = null;
	}
};

DBProvider.prototype.setting = function(option){
	this.collection = option.collection;
	this.method = option.method;
	this.query = option.query;
};


DBProvider.prototype.requestQuery = function(option){
	if (option) {this.setting(option);}
	var cursor;

	var collection = conn.getDB().db.collection(this.collection);

	console.log("1:" + this.method);
	console.log("2:" + JSON.stringify(this.query));

	switch (this.method) {
		case 'find':
			cursor = collection.find(this.query).toArray();
			break;
		case 'aggregate':
			console.log("aggregate");
			cursor = collection.aggregate(this.query).toArray();
			break;
		case 'distinct': 
			console.log("distinct");
			cursor = collection.distinct(this.query);
			break;
		default:
			console.log("cursor is null.");
			cursor = null;
			break;
	}

	return cursor;

};


// do not use the getData
DBProvider.prototype.getData = function(){
	return Data;
};


exports.DBProvider = DBProvider;

