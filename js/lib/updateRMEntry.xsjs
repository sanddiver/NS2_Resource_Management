var message = "Update Successful";
var status = $.net.http.OK;

var body = $.request.body.asString();

var entryData = JSON.parse(body);

var ns2RMIDOrig = entryData.ns2RMIDOrig;
var ns2RMID = entryData.ns2RMID;
var sapRMID = entryData.sapRMID;
var requestorName = entryData.requestorName;
var customerName = entryData.customerName;
var roleDescription = entryData.roleDescription;
var comments = entryData.comments;
var roleStart = entryData.roleStart;
var roleEnd = entryData.roleEnd;
var noReqDays = entryData.noReqDays;
var requestStatus = entryData.requestStatus;
var sam = entryData.sam;
var lob = entryData.lob;
		
var argsArray = [ ns2RMID, sapRMID, requestorName, customerName, roleDescription, comments, roleStart, roleEnd, noReqDays, requestStatus, sam, lob, ns2RMIDOrig ];

var sql = 'UPDATE "NS2_Resource_Management.db::tables.requests" SET "ns2RMID"=?, "sapRMID"=?, "requestorName"=?, "customerName"=?, "roleDescription"=?, "comments"=?, "roleStart"=?, "roleEnd"=?, "noReqDays"=?, "requestStatus"=?, "sam"=?, "lob"=? WHERE "ns2RMID"=?';

var oConnection = $.hdb.getConnection();
	
try
{
	oConnection.executeUpdate(sql, argsArray);

	oConnection.commit();
}
catch(e)
{
	if (e.code === 301)
	{
		message = "Update Failed: Duplicate NS2 RM ID";
	}
	else
	{
		message = "Update Failed: Error Code = " + e.code + ".  Please see the SAP HANA SQL Reference Manual for error codes.";
	}
	status = $.net.http.BAD_REQUEST;
}

oConnection.close();
	
$.response.contentType = "application/json";
$.response.setBody(message);
$.response.status = status;
