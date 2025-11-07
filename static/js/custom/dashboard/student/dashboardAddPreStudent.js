function addPreStudentWarning(formId,moduleId, msg, openMode){
	if(!validateRequestForAddPreStudent(formId,moduleId)){
		return false;
	}
	var warningYes = "addPreStudentContent('"+formId+"','"+moduleId+"','"+msg+"','"+openMode+"')";
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text(msg);
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}


function addPreStudentContent(formId,moduleId, msg, openMode) {
	hideMessage('');
	$("#addPreStudent").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','save-pre-student-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddPreStudent(formId, moduleId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$('#warningMessageId').modal('hide');
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
        			resetPreStudentForm(formId);
   				 	if(openMode=='new'){
   						setTimeout(function(){
   							window.close();
   						}, 2000);
   					}else{
   						callDashboardPageSupAdmin('15a','dashboardContentInHTML','?moduleId=studentPre&controllType=list&searchInput=0&openMode=');
   						showMessage(true, stringMessage[1]);
   					}
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#addPreStudent").prop("disabled", false);
			return false;
		}
	});
	
}	
function getRequestForAddPreStudent(formId,moduleId){
	var addStudentListDTO = {};
	var controllType = $("#actiontype").val();
	addStudentListDTO['actionType'] = controllType;
	addStudentListDTO['studentId'] = $("#studentId").val();
	/*addStudentListDTO['userId'] = $("#userId").val();*/
	addStudentListDTO['enrollmentNo'] = $("#preEnrollmentNo").text();
	if($('#preSession').val()!=undefined){
		addStudentListDTO['sessionValue'] = $("#preSession").val();
		var sessionValue = $('#preSession option:selected').attr('sessionValue').split("-");
		addStudentListDTO['sessionYear'] = sessionValue[0];
		addStudentListDTO['sessionMonth'] = sessionValue[1];
	}
	addStudentListDTO['studentName'] = $("#studentName").val();
	addStudentListDTO['gender'] = $("#gender").val();
	addStudentListDTO['category'] = $("#category").val();
	addStudentListDTO['countryId'] = $("#countryId").val();
	addStudentListDTO['stateId'] = $("#stateId").val();
	addStudentListDTO['cityId'] = $("#cityId").val();
	addStudentListDTO['pincode'] = $("#pincode").val();
	if ($("#address").val() != undefined && $("#address").val() != '') {
		addStudentListDTO['address'] = encodeURIComponent($("#address").val());
	}
	if ($("#fatherName").val() != undefined && $("#fatherName").val() != '') {
		addStudentListDTO['fathername'] = encodeURIComponent($("#fatherName").val());
	}
	if ($("#motherName").val() != undefined && $("#motherName").val() != '') {
		addStudentListDTO['motherName'] = encodeURIComponent($("#motherName").val());
	}
	addStudentListDTO['dob'] = $("#studentDob").val();
	addStudentListDTO['nationalityId'] = $("#nationalty").val();
	addStudentListDTO['contactNumber'] = $("#contactPNumber").val();
	addStudentListDTO['isdCode'] = $("#contactCode").val();
	addStudentListDTO['studentPreId'] = $("#studentPreId").val();
	
	return addStudentListDTO;
	
}

function validateRequestForAddPreStudent(formId,moduleId){
	if($("#actiontype").val()!="view"){
		if ($("#preEnrollmentNo").text()=="") {
			showMessage(true, 'Enrolment number is required');
			return false
		}
		if ($("#preSession").val()==0 || $("#preSession").val()==null) {
			showMessage(true, 'Session is required');
			return false
		}
		if ($("#studentName").val()=="") {
			showMessage(true, 'Student name is required');
			return false
		}
//		if ($("#fatherName").val()==undefined || $("#fatherName").val()=="") {
//			showMessage(true, 'fathername is required');
//			return false
//		}
		if ($("#motherName").val()==undefined || $("#motherName").val()=="") {
			showMessage(true, 'Mother Name is required');
			return false
		}
		if ($("#studentDob").val()=="") {
			showMessage(true, 'Date of birth is required');
			return false
		}
		if ($("#gender").val()==null || $("#gender").val()==0 ) {
			showMessage(true, 'Gender is required');
			return false
		}
//		if ($("#category").val()==null ||  $("#category").val()==0 ) {
//			showMessage(true, 'Category is required');
//			return false
//		}
		if ($("#nationalty").val()==null || $("#nationalty").val()==0 ) {
			showMessage(true, 'Nationality is required');
			return false
		}
		if ($("#countryId").val()==null || $("#countryId").val()==0 ) {
			showMessage(true, 'Country is required');
			return false
		}
		if ($("#stateId").val()==null || $("#stateId").val()==0 ) {
			showMessage(true, 'State is required');
			return false
		}
		if ($("#cityId").val()==null || $("#cityId").val()==0 ) {
			showMessage(true, 'City is required');
			return false
		}
//		if ($("#pincode").val()=="") {
//			showMessage(true, 'Zipcode is required');
//			return false
//		}
//		if ($("#address").val()==undefined  || $("#address").val()=="") {
//			showMessage(true, 'Address is required');
//			return false
//		}
	}
	return true;
}

function resetPreStudentForm(formId){
	var sessionValue = $("#preSession").val();
	var studentId = $("#studentId").val();
	var userId=$("#userId").val();
	var actiontype=$("#actiontype").val();
	$('#'+formId)[0].reset();
	$('#studentName').val('');
	$('#pincode').val('');
	$('#address').val('');
	$('#studentDob').val('');
	$('#motherName').val('');
	$('#fatherName').val('');
	$('#nationalty').val('0');
	$('#contactPNumber').val('');
	$('#contactCode').val('');
	$("#studentId").val('');
	$("#userId").val(userId);
	$("#actiontype").val(actiontype);
	$("#preSession").val(sessionValue);
	$("#preEnrollmentNo").text('');
}