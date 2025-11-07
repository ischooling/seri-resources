$(document).ready(function() {
	$("#sendRequestForITICenter").click(function(event) {
		event.preventDefault();
		callITICenter();
	});
});

function validateRequestForITICenter() {
	//add validation rule and display corresponding message
	return true;
}

function getRequestForITICenter() {
	var itiStudentDTO = {};
	itiStudentDTO['itiCenterName'] = $("#itiCenterName").val();
	itiStudentDTO['stateId'] = $("#stateId").val();
	itiStudentDTO['cityId'] = $("#cityId").val();
	itiStudentDTO['ctPName'] = $("#ctPName").val();
	itiStudentDTO['email'] = $("#email").val();
	itiStudentDTO['phoneNo'] = $("#phoneNo").val();
	return itiStudentDTO;
}

function callITICenter() {
	if (!validateRequestForITICenter()) {
		return false;
	}
	$("#sendRequestForITICenter").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('save-iti-centerData'),
		data : JSON.stringify(getRequestForITICenter()),
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
			$("#sendRequestForITICenter").prop("disabled", false);
		}
	});
}