function requestorName(withBlank) 
{
	var vData = {
    	requestorNameData : [ ]   
	}; 
	
	if (withBlank !== null && withBlank === "Y")
	{
		vData.requestorNameData.push({"requestorNameValue": ""});
	}
	
	var query = 'SELECT DISTINCT "requestorName" FROM "NS2_Resource_Management.db::tables.requests" ORDER BY "requestorName"';

	var oConnection = $.hdb.getConnection();
	
	var rs = oConnection.executeQuery(query);

	for (var i = 0; i < rs.length; i++)
	{
		vData.requestorNameData.push({"requestorNameValue": rs[i]["requestorName"]}); 
   }

	oConnection.close();

	var output = JSON.stringify(vData);
	
	return {body : output, status: $.net.http.OK};
}

var withBlank = $.request.parameters.get("withBlank");

var output = requestorName(withBlank);

$.response.contentType = "application/json";

$.response.setBody(output.body);

$.response.status = output.status;