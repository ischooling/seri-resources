function callForDashboardAddDepositer(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForAddDepositer(formId,moduleId)){
		return false;
	}
	$("#saveDepositer").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','depositer-payment-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddDepositer(formId, moduleId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(true, stringMessage[1]);
        			$('#'+formId)[0].reset();
        			$("#depositerName").val('');
        			$("#depositerContact").val('');
        			$("#depositerEmail").val('');
        			$("#depositerAddress").val('');
        			$("#selectStatus").val('');
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#saveDepositer").prop("disabled", false);
			return false;
		}
	});
	
}	
function getRequestForAddDepositer(formId,moduleId){
	var addepositerListDTO = {};
	addepositerListDTO['depositerName'] = $("#"+formId+" #depositerName").val();
	/*addepositerListDTO['id'] = $("#"+formId+" #counselerId").val();*/
	addepositerListDTO['depositerContact'] = $("#"+formId+" #depositerContact").val();
	addepositerListDTO['depositerEmail'] = $("#"+formId+" #depositerEmail").val();
	addepositerListDTO['depositerAddress'] = $("#"+formId+" #depositerAddress").val();
	addepositerListDTO['typeId'] = $("#"+formId+" #selectStatus option:selected").val();
	addepositerListDTO['depositerTypeName'] = $("#"+formId+" #selectStatus option:selected").text();
	return addepositerListDTO;
}

function validateRequestForAddDepositer(formId,moduleId){
	if ($("#"+formId+" #depositerName").val()=="") {
		showMessage(true, 'DEPOSITER NAME IS REQUIRED');
		return false
	}
	if ($("#"+formId+" #selectStatus").val()=="" ) {
		showMessage(true, 'PLEASE CHOOSE TYPE');
		return false
	}
	if ($("#"+formId+" #depositerEmail").val()=="" && !validateEmail($("#" + formId + " #depositerEmail").val())) {
		showMessage(true, 'PLEASE ENTER EMAIL ID');
		return false
	}
	if ($("#"+formId+" #depositerAddress").val()=="") {
		showMessage(true, 'DEPOSITER ADDRESS IS REQUIRED');
		return false
	}
	if ($("#"+formId+" #depositerContact").val()=="") {
		showMessage(true, 'DEPOSITER CONTACT NO IS REQUIRED');
		return false
	}
	
	
	return true;
}
