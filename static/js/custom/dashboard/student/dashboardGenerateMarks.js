$(document).ready(function() {

});
function submitMarks(formId,moduleId, modelName) {
	hideMessage('');
	if(!validateRequestForMarksDetails(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','marks-submit-content'),
		data : JSON.stringify(getRequestForMarksDetails(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#marksModal').modal('toggle');
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForMarksDetails(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var studentGenerateMarksDTO = {};
	var previousMarksDTO = [];
	var studentId=0;
	$("#tbl_gen_marks tbody tr").each(function() {
		var prevMarksDTO = {};
		if($(this).find("input.marksId").val()!=undefined){
			prevMarksDTO['marksId'] = parseInt($(this).find("input.marksId").val());
		}else{
			prevMarksDTO['marksId'] = 0;
		}
		if(studentId==0){
			studentId = parseInt($(this).find("input.student_id").val());
		}
		prevMarksDTO['studentId'] = parseInt($(this).find("input.student_id").val());
		prevMarksDTO['subjectId'] = parseInt($(this).find("input.marksSubjectId").val());
		
		prevMarksDTO['subjectCode'] = $(this).find("input.marksSubjectCode").val();
		prevMarksDTO['subjectName'] = $(this).find("input.marksSubjectName").val();
		
		var theoryMarks = 0;
		var practicalMarks = 0;
		var attendance = parseInt($(this).find("select.attendance option:selected").val());
		
		if(attendance==1 || attendance==2 || attendance==3){
			if(attendance==1 || attendance==3){
				var theoryMarks = parseInt($(this).find("input.e_t_marks").val());
				if(theoryMarks!=''){
					theoryMarks = parseInt(theoryMarks);
				}
			}
			if(attendance==1 || attendance==2){
				if($(this).find("input.e_p_marks").val() != undefined){
					if($(this).find("input.e_p_marks").val()!=''){
						practicalMarks = parseInt($(this).find("input.e_p_marks").val());
					}
				}
			}
		}
		prevMarksDTO['theoryMarks'] = theoryMarks;
		prevMarksDTO['practicalMarks'] = practicalMarks;
		prevMarksDTO['attendanceStatus'] = parseInt($(this).find("select.attendance option:selected").val());
		previousMarksDTO.push(prevMarksDTO);
	});
	
	requestData['resultStatus'] = $("span.fin_result").html();
	requestData['studentGenerateMarksDTO'] = previousMarksDTO;
	authentication['hash'] = getHash();
	authentication['studentId'] = studentId;
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForMarksDetails(formId,moduleId){
	var attendanceCount=0;
	$("#tbl_gen_marks tbody tr").each(function() {
		attendanceCount += parseInt($(this).find("select.attendance option:selected").val());
	});
	if(attendanceCount==0){
		showMessage(false, 'Student is absent in all paper, if yes then mark absent from edit student section.');
		return false;
	}
	return true;
}
