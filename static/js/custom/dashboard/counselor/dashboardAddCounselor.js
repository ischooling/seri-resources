function callForDashboardAddCounselor(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForAddCounselor(formId,moduleId)){
		return false;
	}
	//$("#saveCounselor").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','save-counseler-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddCounselor(formId, moduleId))),
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
        			$("#counselId").val('');
        			$("#counselName").val('');
        			$("#counselEmail").val('');
        			$("#counselContact").val('');
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#saveCounselor").prop("disabled", false);
			return false;
		}
	});
	
}	
function getRequestForAddCounselor(formId,moduleId){
	var addCounselorListDTO = {};
	addCounselorListDTO['counselorName'] = $("#"+formId+" #counselName").val();
	addCounselorListDTO['id'] = $("#"+formId+" #counselerId").val();
	addCounselorListDTO['counselorContact'] = $("#"+formId+" #counselContact").val();
	addCounselorListDTO['counselorEmail'] = $("#"+formId+" #counselEmail").val().trim();
	addCounselorListDTO['counselorId'] = $("#"+formId+" #counselId").val();
	addCounselorListDTO['status'] = $("#"+formId+" #selectStatus ").val();
	return addCounselorListDTO;
}

function validateRequestForAddCounselor(formId,moduleId){
	if ($("#"+formId+" #counselId").val()=="") {
		showMessage(true, 'Counselor id is required');
		return false
	}
	if ($("#"+formId+" #counselName").val()=="") {
		showMessage(true, 'Counselor name is required');
		return false
	}
	if (!validateEmail($("#" + formId + " #counselEmail").val().trim())) {
		showMessage(false, 'Either email-id  is blank or invalid');
		return false
	}
	
	if ($("#"+formId+" #counselContact").val()=="") {
		showMessage(true, 'Counselor contact-no is required');
		return false
	}
	if ($("#"+formId+" #selectStatus").val()=="" ) {
		showMessage(true, 'Please choose status');
		return false
	}
	
	return true;
}
