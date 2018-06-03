function searchRM(ns2RMIDValue, sapRMIDValue, requestorNameValue, customerNameValue, requestStatusValue, samValue, lobValue) 
{
	var vData = {
    	searchRMResults : [ ]   
	}; 
	 
	var placeHolder = ' WHERE';
	var query = 'SELECT "ns2RMID", "sapRMID", "createdOn", "requestorName", "customerName", "roleDescription", "comments", "roleStart", "roleEnd", "noReqDays", "requestStatus", "sam", "lob" FROM "NS2_Resource_Management.db::tables.requests"';

	if (ns2RMIDValue !== "")
	{
		query = query + placeHolder + ' "ns2RMID" =\'' + ns2RMIDValue + '\'';
		placeHolder = " AND";
	}

	if (sapRMIDValue !== "")
	{
		query = query + placeHolder + ' "sapRMID" =\'' + sapRMIDValue + '\'';
		placeHolder = " AND";
	}
	
	if (requestorNameValue !== "")
	{
		query = query + placeHolder + ' "requestorName" =\'' + requestorNameValue + '\'';
		placeHolder = " AND";
	}

	if (customerNameValue !== "")
	{
		query = query + placeHolder + ' "customerName" =\'' + customerNameValue + '\'';
		placeHolder = " AND";
	}

	if (requestStatusValue !== "")
	{
		query = query + placeHolder + ' "requestStatus" =\'' + requestStatusValue + '\'';
		placeHolder = " AND";
	}
	
	if (samValue !== "")
	{
		query = query + placeHolder + ' "sam" =\'' + samValue + '\'';
		placeHolder = " AND";
	}
	
	if (lobValue !== "")
	{
		query = query + placeHolder + ' "lob" =\'' + lobValue + '\'';
		placeHolder = " AND";
	}
	
	query = query + ' order by "ns2RMID"';
	
	var oConnection = $.hdb.getConnection();
	
	var rs = oConnection.executeQuery(query);

	for (var i = 0; i < rs.length; i++)
	{
		vData.searchRMResults.push({"ns2RMID": rs[i]["ns2RMID"],"sapRMID": rs[i]["sapRMID"],"createdOn": rs[i]["createdOn"],"requestorName": rs[i]["requestorName"],"customerName": rs[i]["customerName"],"roleDescription": rs[i]["roleDescription"],"comments": rs[i]["comments"],"roleStart": rs[i]["roleStart"],"roleEnd": rs[i]["roleEnd"],"noReqDays": rs[i]["noReqDays"],"requestStatus": rs[i]["requestStatus"],"sam": rs[i]["sam"],"lob": rs[i]["lob"]}); 
   }

	oConnection.close();

	var output = JSON.stringify(vData);

	return {body : output, status: $.net.http.OK};
}

var ns2RMIDValue = $.request.parameters.get("ns2RMIDValue");
var sapRMIDValue = $.request.parameters.get("sapRMIDValue");
var requestorNameValue = $.request.parameters.get("requestorNameValue");
var customerNameValue = $.request.parameters.get("customerNameValue");
var requestStatusValue = $.request.parameters.get("requestStatusValue");
var samValue = $.request.parameters.get("samValue");
var lobValue = $.request.parameters.get("lobValue");

var output = searchRM(ns2RMIDValue, sapRMIDValue, requestorNameValue, customerNameValue, requestStatusValue, samValue, lobValue);

$.response.contentType = "application/json";

$.response.setBody(output.body);

$.response.status = output.status;