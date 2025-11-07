function validateStatusForDuplicateCertificate(formId) {
	if ($("#" + formId + " #referenceNumber").val() == ''
			|| $("#" + formId + " #referenceNumber").val() == null) {
		showMessage(true, 'Reference Number is Mandatory');
		return false
	}
	if ($("#" + formId + " #dob").val() == ''
			|| $("#" + formId + " #dob").val() == null) {
		showMessage(true, 'Date of Birth is Mandatory');
		return false
	}
	if ($("#terms").is(":checked")) {

	} else {
		showMessage(true, 'Please accept Terms & Conditions');
		return false
	}
	return true
}

function statusForDuplicateCertificate(formId) {
	if (!validateStatusForDuplicateCertificate(formId)) {
		return false;
	}

// ("#saveRequest").prop("disabled", true);
	var data = 'referenceNumber='+$("#referenceNumber").val()+'&dob='+$("#dob").val();
	$.ajax({
				type : "GET",
				url : getURLForHTML('service','find-duplicate-certificate-status'),
				data :data,
				dataType : 'html',
				cache : false,
				timeout : 600000,
				success : function(htmlContent) {
					$("#saveRequest").prop("disabled", false);
					if (htmlContent != "") {
						var stringMessage = [];
						stringMessage = htmlContent.split("|");
						if (stringMessage[0] == "FAILED"
								|| stringMessage[0] == "EXCEPTION"
								|| stringMessage[0] == "SESSIONOUT") {
							if (stringMessage[0] == "SESSIONOUT") {
							} else {
								showMessage(true, stringMessage[1]);
							}
						} else {
							//showMessage(true, stringMessage[1]);
							/*$('#duplicate').hide();*/
							//$('#duplicateCertificateStatusResponse').show();*/
							$('#duplicateCertificateStatus').html(htmlContent);

						}
						return false;
					}
				},
				error : function(e) {
					showMessage(true, e.responseText);
					$("#saveRequest").prop("disabled", false);
				}
			});
}

function getRequestForfindDuplicateCertificateStatus(formId){
	
	var referenceNumber = $("#"+formId+" #referenceNumber").val();
	var dob = $("#"+formId+" #dob").val();
	
}
