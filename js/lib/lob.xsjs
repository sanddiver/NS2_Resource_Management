function lob(withBlank) 
{
	var vData = {
    	lobData : [ ]   
	}; 
	
	if (withBlank !== null && withBlank === "Y")
	{
		vData.lobData.push({"lobValue": ""});
	}
	
	var query = 'SELECT DISTINCT "lob" FROM "NS2_Resource_Management.db::tables.requests" ORDER BY "lob"';

	var oConnection = $.hdb.getConnection();
	
	var rs = oConnection.executeQuery(query);

	for (var i = 0; i < rs.length; i++)
	{
		vData.lobData.push({"lobValue": rs[i]["lob"]}); 
   }

	oConnection.close();

	var output = JSON.stringify(vData);
	
	return {body : output, status: $.net.http.OK};
}

var withBlank = $.request.parameters.get("withBlank");

var output = lob(withBlank);

$.response.contentType = "application/json";

$.response.setBody(output.body);

$.response.status = output.status;