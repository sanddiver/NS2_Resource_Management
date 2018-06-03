var message = "Create Successful";
var status = $.net.http.OK;

var body = $.request.body.asString();

var entryData = JSON.parse(body);

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
		
var dt = new Date();
var month = dt.getMonth()+1;
if (month < 10)
{
	month = "0" + month;
}
var day = dt.getDate();
if (day < 10)
{
	day = "0" + day;
}
var year = dt.getFullYear();
var createdOn = month + "/" + day + "/" + year;

var argsArray = [ ns2RMID, sapRMID, createdOn, requestorName, customerName, roleDescription, comments, roleStart, roleEnd, noReqDays, requestStatus, sam, lob ];

var sql = 'INSERT INTO "NS2_Resource_Management.db::tables.requests" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';

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
		message = "Create Failed: Duplicate NS2 RM ID";
	}
	else
	{
		message = "Create Failed: Error Code = " + e.code + ".  Please see the SAP HANA SQL Reference Manual for error codes.";
	}
	status = $.net.http.BAD_REQUEST;
}

oConnection.close();
	
$.response.contentType = "application/json";
$.response.setBody(message);
$.response.status = status;
