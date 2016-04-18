var DBProvider = require("../db/DBProvider");


processRes  = function(req, res){

		var query = [], Params = req.body.Params;
		var dbCmd=[];

	  	switch (req.body.MethodName) {
	  		case "getHailRawData":
	  			if (Params.hasOwnProperty('state') && (Params.state !== "all")) {
  					query = {State:{$eq:  Params.state}};
  				} else {
  					query = [];
  				}
  				dbCmd = {collection:'hail', method: 'find', query:query};

	  			break;

	  		case "getStates":

  				dbCmd = {collection:'hail', method: 'distinct', query:'State'};
  				break;

	  		case "getStateCodes":

  				dbCmd = {collection:'states', method: 'find', query:[]};
  				break;

	  		case "tallyByState":
	  			query = [{$group: {_id: "$State", total: {$sum: "$Population Affected"}}},{$sort: {_id:1}}];
		  		dbCmd = {collection:'hail', method: 'aggregate', query:query};
		  		break;

	  		case "tallyByDay":
	  			query = [{$group: {_id: "$Data", total: {$sum: "$Population Affected"}}},{$sort: {_id:1}}];
		  		dbCmd = {collection:'hail', method: 'aggregate', query:query};
	  			break;

	  		case "tallyDaysByState":
	  			query = [{$match: {"Population Affected": {$gt:0}}},{$group: {_id: "$State", total: {$sum: 1}}},{$sort: {_id:1}}];
		  		dbCmd = {collection:'hail', method: 'aggregate', query:query};
	  			break;

	  		case "getRawClaims":
	  			if (Params.hasOwnProperty('state')) {
  					query = {State:{$eq:  Params.state}};
  				}

	  			if (Params.hasOwnProperty('education')) {
  					query = {Education:{$eq:  Params.education}};
  				}

  				if (Params.hasOwnProperty('ClaimAmount')) {
  					query = {"Claim Amount":{$lte: Params.ClaimAmount.upValue, $gte: Params.ClaimAmount.downValue}};
  				}

  				if (Params.hasOwnProperty('MaritalStatus')) {
  					query = {"Marital Status":{$eq:  Params.MaritalStatus}};
  				}


  				if (Params.hasOwnProperty('EmploymentStatus')) {
  					query = {"EmploymentStatus":{$eq:  Params.EmploymentStatus}};
  				}

  				if (Params.hasOwnProperty('gender')) {
  					query = {"Gender":{$eq:  Params.gender}};
  				}

  				dbCmd = {collection:'weather', method: 'find', query:query};
  				break;

  			case "getAverageClaimByState":
	  			query = [{$group: {_id: "$State", average: {$avg: "$Claim Amount"}}},{$sort: {average:1}}];
  				dbCmd = {collection:'weather', method: 'aggregate', query:query};
  				break;

  			case "getDistinct":
  				query = Params.FieldName;
  				dbCmd = {collection:'weather', method: 'distinct', query:query};
  				break;

	  	}


		var HailProvider = new DBProvider.DBProvider(dbCmd);
		var requestQuery = HailProvider.requestQuery();

		if (requestQuery) {
			requestQuery.then(
				function(items){
					res.send({error: null, message: "Getting Data Sucessfully.", data: items});
				},

			function(err) {
				res.send({error: 'error', message: "Getting Data Error.", data: err});
			});
		} else {
			res.send({error: 'error', message: "Request params is not correct.", data: null});
		}

};

exports.processRes = processRes;