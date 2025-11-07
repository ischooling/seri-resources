$(document).ready(function() {
	$("#sendRequestForITIStudent").click(function(event) {
		event.preventDefault();
		callITIStudent();
	});
});

function validateRequestForITIStudent() {
	//add validation rule and display corresponding message
	return true;
}

function getRequestForITIStudent() {
	var itiStudentDTO = {};
	itiStudentDTO['email'] = $("#email").val();
	itiStudentDTO['phoneNo'] = $("#phoneNo").val();
	itiStudentDTO['stateId'] = $("#stateId").val();
	itiStudentDTO['cityId'] = $("#cityId").val();
	return itiStudentDTO;
}

function callITIStudent() {
	if (!validateRequestForITIStudent()) {
		return false;
	}
	$("#sendRequestForITIStudent").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('save-iti-studentData'),
		data : JSON.stringify(getRequestForITIStudent()),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#sendRequestForITIStudent").prop("disabled", false);
		}
	});
}