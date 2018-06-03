function customerName(withBlank) 
{
	var vData = {
    	customerNameData : [ ]   
	}; 
	
	if (withBlank !== null && withBlank === "Y")
	{
		vData.customerNameData.push({"customerNameValue": ""}); 
	}
	
	var query = 'SELECT DISTINCT "customerName" FROM "NS2_Resource_Management.db::tables.requests" ORDER BY "customerName"';

	var oConnection = $.hdb.getConnection();
	
	var rs = oConnection.executeQuery(query);

	for (var i = 0; i < rs.length; i++)
	{
		vData.customerNameData.push({"customerNameValue": rs[i]["customerName"]}); 
   }

	oConnection.close();

	var output = JSON.stringify(vData);
	
	return {body : output, status: $.net.http.OK};
}

var withBlank = $.request.parameters.get("withBlank");

var output = customerName(withBlank);

$.response.contentType = "application/json";

$.response.setBody(output.body);

$.response.status = output.status;