function validateRequestForAllExaminationDetails(formId){
	if ($("#countryId").val()==null || $("#countryId option:selected").val()==0 ) {
		showMessage(true, 'Please Select Country is Mandatory');
		return false
	}
	if ($("#session").val()==null || $("#session option:selected").val()==0) {
		showMessage(true, 'Session  is Mandatory');
		return false
	}
	return true;
}

function getAllExaminationDetails(formId){
	hideMessage('');
	if(!validateRequestForAllExaminationDetails(formId)){
		return false;
	}
	var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
	var sessionYear = sessionValue[0];
	var sessionMonth = sessionValue[1];
	
	//$("#callExaminationDetails").prop("disabled", true);
	var postData="standardId="+$('#standardId').val()
			+"&countryId="+$('#countryId').val()
			+"&sessionYear="+sessionYear
			+"&sessionMonth="+sessionMonth;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','manage-exams-subject-list'),
		data : postData,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			showMessage(true, stringMessage[1]);
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}
        		} else {
        			$('#'+formId+' #examinationList').html(htmlContent);
        		}
        		$("#callExaminationDetails").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$('#'+formId+' #examinationList').html(e.responseText);
			$("#callExaminationDetails").prop("disabled", false);
		}
	});
}
	
function validateRequestForAddExamsDetails(src, examsId, standardId, subjectID, practicleReq, dateStatus){
	
	var exDate = $(src).closest('tr').find("input.exmDate").val();
	if(exDate==null ||exDate==""){
		showMessage(true, 'Exam Date is  Mandatory');
		return false
	}
	var exStartT=parseInt($(src).closest('tr').find("select.exmSTime option:selected").val());
	if(exStartT==null || exStartT==0){
		showMessage(true, 'Exam Start time is Mandatory');
		return false
	}
	var exEndTime = parseInt($(src).closest('tr').find("select.exmETime option:selected").val());
	if(exEndTime==null || exEndTime==0){
		showMessage(true, 'Exam End time is Mandatory');
		return false
	}
	if(exStartT>=exEndTime){
		showMessage(true, 'Exam End time cannot be Less than Exam Start Time');
		return false
	}
	if(practicleReq!=0){
		var prctDate = $(src).closest('tr').find("input.practDate").val();
		if(prctDate==null || prctDate==""){
				showMessage(true, 'Practical Exam Date is  Mandatory');
				return false
			}
		var prctSTime= parseInt($(src).closest('tr').find("select.practSTime option:selected").val());
		var prctETime= parseInt($(src).closest('tr').find("select.practETime option:selected").val());
		if(prctSTime==null || prctSTime==0){	
				showMessage(true, 'Practical Exam Start time is Mandatory');
				return false
			}
//		if(exDate==prctDate){
//	//		if(exStartT<= prctETime && prctETime <= exEndTime){
//			if( prctSTime <= exEndTime){
//			showMessage(true, 'Practical Exam always be after Theory Exam On same day');
//			return false
//			}
//		}
		if(prctETime==null || prctETime==0){
				showMessage(true, 'Practical Exam End time is Mandatory');
				return false
			}
		if(prctSTime>=prctETime){
			showMessage(true, 'Practical Exam End time cannot be Less than Practical Exam Start Time');
			return false
		}
	}	
	return true;
}
function callForAddExamsDetails(src, examsId, standardId, subjectID, practicleReq, dateStatus) {
	
	hideMessage('');
	if(!validateRequestForAddExamsDetails(src, examsId, standardId, subjectID, practicleReq, dateStatus)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','add-edit-exams'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddExams(src, examsId, standardId, subjectID, practicleReq, dateStatus))),
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
        			if(dateStatus=="save"){
        				$(src).closest('tr').find("button.update").prop("disabled", false);
        			}
        			if(dateStatus=="delete"){
        				resetExamDetails(src, examsId, standardId, subjectID, practicleReq, dateStatus);
        			}
        		}
        		return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#saveExams").prop("disabled", false);
		}
	});
}


function getRequestForAddExams(src, examsId, standardId, subjectID, practicleReq, dateStatus){
	var  manageExamsDTOList = {};
	manageExamsDTOList['examsId'] = examsId;
	manageExamsDTOList['standardId'] = standardId;
	manageExamsDTOList['subjectID'] = subjectID;
	manageExamsDTOList['practicleReq'] = practicleReq;
	manageExamsDTOList['countryId'] = $("#countryId").val();
	manageExamsDTOList['subjectName'] = $(".subjectName").val();
	manageExamsDTOList['compulsary'] = $("#compulsaryStatus").val();
	manageExamsDTOList['dateStatus'] = dateStatus;
	if($('#session').val()!=undefined){
		var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
		manageExamsDTOList['sessionYear'] = sessionValue[0];
		manageExamsDTOList['sessionMonth'] = sessionValue[1];
	}
	
	if(manageExamsDTOList['practicleReq']!='' && manageExamsDTOList['practicleReq']!=0){
		$(src).find("input.practReqStatus").val(manageExamsDTOList['practicleReq']);
	}
	manageExamsDTOList['examDate']= $(src).closest('tr').find("input.exmDate").val();
	manageExamsDTOList['examSTime']=$(src).closest('tr').find("select.exmSTime option:selected").text();
	manageExamsDTOList['examETime']=$(src).closest('tr').find("select.exmETime option:selected").text();
	manageExamsDTOList['practExamDate']=$(src).closest('tr').find("input.practDate").val();
	manageExamsDTOList['practExamSTime']=$(src).closest('tr').find("select.practSTime option:selected").text();
	manageExamsDTOList['practExamETime']=$(src).closest('tr').find("select.practETime option:selected").text();

	return manageExamsDTOList;
}

function resetExamDetails(src, examsId, standardId, subjectID, practicleReq, dateStatus){
	$(src).closest('tr').find("input.exmDate").val('');
	$(src).closest('tr').find("select.exmSTime").val(0);
	$(src).closest('tr').find("select.exmETime").val(0);
	$(src).closest('tr').find("input.practDate").val('');
	$(src).closest('tr').find("select.practSTime").val(0);
	$(src).closest('tr').find("select.practETime").val(0);
	$(src).closest('tr').find("button.update").prop("disabled", true);
}
