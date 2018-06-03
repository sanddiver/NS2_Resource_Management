function requestStatus(withBlank) 
{
	var vData = {
    	requestStatusData : [ ]   
	}; 

	if (withBlank !== null && withBlank === "Y")
	{
		vData.requestStatusData.push({"requestStatusValue": ""});
	}
	
	var query = 'SELECT "requestStatus" FROM "NS2_Resource_Management.db::tables.requestStatus" ORDER BY "requestStatus"';

	var oConnection = $.hdb.getConnection();
	
	var rs = oConnection.executeQuery(query);

	for (var i = 0; i < rs.length; i++)
	{
		vData.requestStatusData.push({"requestStatusValue": rs[i]["requestStatus"]}); 
   }

	oConnection.close();

	var output = JSON.stringify(vData);
	
	return {body : output, status: $.net.http.OK};
}

var withBlank = $.request.parameters.get("withBlank");

var output = requestStatus(withBlank);

$.response.contentType = "application/json";

$.response.setBody(output.body);

$.response.status = output.status;