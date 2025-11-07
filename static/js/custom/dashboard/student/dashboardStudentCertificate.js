function addStudentCertificate(formId,moduleId, msg, openMode) {
	if(!validateRequestForStudentCertificate(formId,moduleId)){
		return false;
	}
	var certificateWise = "";
	var sessionYear="";
	var sessionMonth="";
	if($('#preSession').val()!=undefined){
		var sessionValue = $('#preSession option:selected').attr('sessionValue').split("-");
		sessionYear = sessionValue[0];
		sessionMonth = sessionValue[1];
	}
	var issuedate = $("#issueDate").val();
	var graduateDate = $("#graduateDate").val();
	var rollNo = $("#rollNo").val();
	var certificate = $("#certificate").val();
	var certificateFormat = $("#certificateFormat").val();
	var gradingSystem = $("#gradingSystem").val();
	var certificateWise = $("#certificateWise").val();
	var typeId = "0";
	if($("#certificateWise").val()=='consultant'){
		typeId = $('#recommendBy').val();
	}
	if($("#certificateWise").val()=='school'){
		typeId = $('#schoolId').val();
	}
	var chkWithout11 = "N";
	if($("#withOut11th").is(":checked")){
		chkWithout11 = "Y";
	}
	var startFrom = $('#startFrom').val();
	var counts = $('#counts').val();
	var data = "typeId="+typeId+"&certificateWise="+certificateWise+"&sessionYear="+sessionYear+"&sessionMonth="+sessionMonth+"&issuedate="+issuedate+"&graduateDate="+graduateDate+"&rollNo="+rollNo+"&certificate="+certificate+"&certificateFormat="+certificateFormat+"&gradingSystem="+gradingSystem+"&chkWithout11="+chkWithout11+"&startPaging="+startFrom+"&endPaging="+counts;
	window.open(window.location.origin+CONTEXT_PATH+'/dashboard/generate-certificates?'+data);	
}	

function validateRequestForStudentCertificate(formId,moduleId){
	
		if ($("#certificateWise").val()==0 || $("#certificateWise").val()==null) {
			showMessage(true, 'Select Certificate wise is Required');
			return false
		}
		if($("#certificateWise").val()=='school'){
			if ($("#schoolId").val()==null || $("#schoolId").val()==0 ) {
				showMessage(true, 'Please Select School Name');
				return false
			}
		}else if($("#certificateWise").val()=='consultant'){
			if ($("#recommendBy").val()==null || $("#recommendBy").val()==0 ) {
				showMessage(true, 'Please Select Consultant Name');
				return false
			}
		}else if($("#certificateWise").val()=='role'){
			if ($("#rollNo").val()=="") {
				showMessage(true, 'Please Fill Rollno is Required');
				return false
			}
		}
		if ($("#preSession").val()==0 || $("#preSession").val()==null) {
			showMessage(true, 'Session is Required');
			return false
		}
		if ($("#certificate").val()==0 || $("#certificate").val()==null) {
			showMessage(true, 'Please Select Type of certificate');
			return false
		}
		if ($("#issueDate").val()=="") {
			showMessage(true, 'Issue Date is Required');
			return false
		}

		if ($("#graduateDate").val()=="") {
			showMessage(true, 'Graduation Date is Required');
			return false
		}
		
	return true;
}

function studentMarksList(formId,moduleId, msg, openMode) {
	if(!validateRequestForStudentMarks(formId,moduleId)){
		return false;
	}
	var certificateWise = "";
	var sessionYear="";
	var sessionMonth="";
	if($('#preSession').val()!=undefined){
		var sessionValue = $('#preSession option:selected').attr('sessionValue').split("-");
		sessionYear = sessionValue[0];
		sessionMonth = sessionValue[1];
	}
	var rollNo = $("#rollNo").val();
	var certificateWise = $("#certificateWise").val();
	var typeId = "0";
	if($("#certificateWise").val()=='consultant'){
		typeId = $('#recommendBy').val();
	}else if($("#certificateWise").val()=='school'){
		typeId = $('#schoolId').val();
	}
	var myArray = [];
    $("#standardIds :checkbox:checked").each(function() {
        myArray.push(this.value);
    });
	var data = "typeId="+typeId+"&certificateWise="+certificateWise+"&sessionYear="+sessionYear+"&sessionMonth="+sessionMonth+"&rollNo="+rollNo+"&standard="+myArray+"&openMode="+openMode;
	if(openMode==''){
		window.open(window.location.origin+CONTEXT_PATH+'dashboard/generate-marks-list?'+data);
	}else if(openMode!=''){
		var completeUrl='dashboard/download-aiu-reports-pdf/'+certificateWise+'/'+typeId+'/'+sessionYear+'/'+sessionMonth+'/'+rollNo+'/'+myArray+'/'+openMode;
		window.open(window.location.origin+CONTEXT_PATH+completeUrl);
	}
}	

function validateRequestForStudentMarks(formId,moduleId){
	if ($("#certificateWise").val()==0 || $("#certificateWise").val()==null) {
		showMessage(true, 'Select certificate wise is required');
		return false
	}
	if ($("#preSession").val()==0 || $("#preSession").val()==null) {
		showMessage(true, 'Session is required');
		return false
	}
		
	if($("#certificateWise").val()=='consultant' || $("#certificateWise").val()=='school' || $("#certificateWise").val()=='standard'){
		if($("#certificateWise").val()=='standard'){
			var myArray = [];
		    $("#standardIds :checkbox:checked").each(function() {
		        myArray.push(this.value);
		    });
		    console.log(myArray.length);
		    if(myArray.length==0){
	    		showMessage(true, 'Please check standard is required');
				return false
		    }
		}
	}else if($("#certificateWise").val()=='role'){
		if ($("#rollNo").val()=="") {
			showMessage(true, 'Please fill rollNo is required');
			return false
		}
	}
	return true;
}

