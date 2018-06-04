function sam(withBlank) 
{
	var vData = {
    	samData : [ ]   
	}; 

	if (withBlank !== null && withBlank === "Y")
	{
		vData.samData.push({"samValue": ""});
	}
	
	var query = 'SELECT DISTINCT "sam" FROM "NS2_Resource_Management.db::tables.requests" ORDER BY "sam"';

	var oConnection = $.hdb.getConnection();
	
	var rs = oConnection.executeQuery(query);

	for (var i = 0; i < rs.length; i++)
	{
		if (rs[i]["sam"] !== "")
		{
			vData.samData.push({"samValue": rs[i]["sam"]});
		}
   }

	oConnection.close();

	var output = JSON.stringify(vData);
	
	return {body : output, status: $.net.http.OK};
}

var withBlank = $.request.parameters.get("withBlank");

var output = sam(withBlank);

$.response.contentType = "application/json";

$.response.setBody(output.body);

$.response.status = output.status;