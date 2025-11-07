function callLocationDetails(formId, divId){
	var timezoneValue='';
	var cityName='';
	$.getJSON("https://pro.ip-api.com/json/?key=9908tZlRhI0pK5W", function(data) {
		var table_body = "";
		table_body = "{";
		$.each(data, function(k, v) {
			table_body += "\"" + k + "\":" + "\"" + v + "\",";
		});
		table_body = table_body.substr(0, table_body.length - 1);
		table_body += "}";
		$("#"+formId+" #location").val(table_body);
		if(divId!=''){
			callForInquiryLocation(formId, divId, table_body)
		}
	});
}
function callForInquiryLocation(formId, divId, location) {
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','inquiry-location'),
		data : "location="+location,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
    			$("#"+formId+" #"+divId).html(htmlContent);			
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}