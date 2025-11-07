function validateRequestForAddSubjectDetails(formId){
	if ($("#standardId").val()==null || $("#standardId option:selected").val()==0 ) {
		showMessage(true, 'Please Select standard is Mandatory');
		return false
	}
	if ($("#subjectName").val()=='' || $("#subjectName").val()==null) {
		showMessage(true, 'Subject Name is Mandatory');
		return false
	}
	if ($("#subjectCode").val()=='' || $("#subjectCode").val()==null) {
		showMessage(true, 'Subject Code is Mandatory');
		return false
	}
	
	if ($("#compulsaryStatus").val()=="" || $("#compulsaryStatus option:selected").val()==null) {
		showMessage(true, 'Compulsary Status Selection Mandatory');
		return false
	}
	if ($("#maxMarks").val()=='' || $("#maxMarks").val()==null) {
		showMessage(true, 'Theory Maximum Marks is mandatory');
		return false
	}
	if ($("#thPassingMarks").val()=='' || $("#thPassingMarks").val()==null) {
		showMessage(true, 'Theory Passing marks  is mandatory');
		return false
	}
	
	if ( parseInt($("#maxMarks").val()) < parseInt($("#thPassingMarks").val()) ){
		showMessage(true, 'Theory Passing Marks can not Greater than Max Marks');
		return false
	}
	
	if ($("#practReqStatus").val()=="" || $("#practReqStatus option:selected").val()==null) {
		showMessage(true, 'Practical Status Selection Mandatory');
		return false
	}
	
	if($("#practReqStatus option:selected").val() !=0){
			if ($("#maxPractMarks").val()=='' || $("#maxPractMarks").val()==null) {
				showMessage(true, 'Max Practical Marks is mandatory');
				return false
			}
			if ($("#practPasMarks").val()=='' || $("#practPasMarks").val()==null) {
				showMessage(true, 'Practical Passing Marks is mandatory');
				return false
			}
			if ( parseInt($("#maxPractMarks").val()) < parseInt($("#practPasMarks").val()) ){
				showMessage(true, 'Practical Passing Marks can not Greater than Practical Max Marks');
				return false
			}
			return true
	}
	return true;
}

function callForAddSubjectDetails(formId, moduleId) {
	hideMessage('');
	if(!validateRequestForAddSubjectDetails(formId)){
		return false;
	}
	//$("#saveSubject").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','add-edit-subject'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddSubject(formId, moduleId))),
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
        		}
        		return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#saveSubject").prop("disabled", false);
		}
	});
}



	function getRequestForAddSubject(formId){
		
			var manageSubjectDTO = {};
			manageSubjectDTO['subjectID'] = $("#subjectId").val();
			manageSubjectDTO['id'] = $("#standardId").val();
			manageSubjectDTO['subjectName'] = $("#subjectName").val();
			manageSubjectDTO['subjectCode'] = $("#subjectCode").val();
			manageSubjectDTO['compulsary'] = $("#compulsaryStatus").val();
			manageSubjectDTO['maximumMarks'] = $("#maxMarks").val();
			manageSubjectDTO['thoryPassingMarks'] = $("#thPassingMarks").val();
			manageSubjectDTO['controllType'] = $("#controllType").val();
			
			manageSubjectDTO['practicleReq'] = $("#practReqStatus").val();
			manageSubjectDTO['maxPracticleMarks'] = $("#maxPractMarks").val();
			manageSubjectDTO['practiclePassingMarks'] = $("#practPasMarks").val();
			
			return manageSubjectDTO;
		}


