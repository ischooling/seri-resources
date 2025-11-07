console.log('1');
function validateRequestForDuplicateCertificate(formId){
	if ($.isEmptyObject($("#"+formId+" #studentName").val().trim())) {
		showMessage(true, 'Student Name is Mandatory');
		return false
	}
	if ($("#"+formId+" #dob").val()==0 || $("#"+formId+" #dob").val()==null) {
		showMessage(true, 'Date of Birth is Mandatory');
		return false
	}
	if ($.isEmptyObject($("#"+formId+" #motherName").val().trim())) {
		showMessage(true, "Mother's name is Mandatory");
		return false
	}
	if ($.isEmptyObject($("#"+formId+" #fatherName").val().trim())) {
		showMessage(true, "Father's Name is Mandatory");
		return false
	}
	
	if ($.isEmptyObject($("#"+formId+" #schoolName").val().trim())) {
		showMessage(true, 'School Name is mandatory');
		return false
	}
	
	if ($("#"+formId+" #countryId").val()==0 || $("#"+formId+" #countryId").val()==null) {
		showMessage(true, 'Country is Mandatory');
		return false
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
		showMessage(true, 'State is Mandatory');
		return false
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
		showMessage(true, 'City is Mandatory');
		return false
	}
	
	if ($.isEmptyObject($("#"+formId+" #address").val().trim())) {
		showMessage(true, 'Address is mandatory');
		return false
	}
	
	if ($("#"+formId+" #pinCode").val()=='' || $("#"+formId+" #pinCode").val()==null) {
		showMessage(true, 'Pin Code is mandatory');
		return false
	}
	if ($("#"+formId+" #contactNo").val()=='' || $("#"+formId+" #contactNo").val()==null) {
		showMessage(true, 'Contact No is mandatory');
		return false
	}
	
	if ($("#"+formId+" #standardId").val()==0 || $("#"+formId+" #standardId").val()==null) {
		showMessage(true, 'Documents Required for is Mandatory');
		return false
	}
	
	if ($("#"+formId+" #rollNo").val()=='' || $("#"+formId+" #rollNo").val()==0) {
		showMessage(true, 'Roll No  is mandatory');
		return false
	}
	
if ($("#"+formId+" #selectAll").is(":checked")||$("#checkbox1").is(":checked")||$("#checkbox2").is(":checked")||$("#checkbox3").is(":checked")||$("#checkbox4").is(":checked")||$("#checkbox5").is(":checked")||$("#checkbox6").is(":checked")) {
		
	}else{
		showMessage(true, 'Please select atleast 1 document');
		return false
	}

	
	var imageName = $("#uploadDoc1").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName=='click here to upload') {
		showMessage(true, 'Upload Affidavit');
		return false
	}
	if(imageName!='' && imageName!='click here to upload'){
		if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg','pdf']) == -1){
			showMessage(true, 'Please upload Document in following formats (jpg, jpeg, png, pdf).');
			return false
		}
	}
	

	var imageName = $("#uploadDoc2").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName =='click here to upload') {
		showMessage(true, 'Upload Copy of FIR');
		return false
	}
	if(imageName!='' && imageName!='click here to upload'){
		if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg','pdf']) == -1){
			showMessage(true, 'Please upload Document in following formats (jpg, jpeg, png, pdf).');
			return false
		}
	}

	if (!validateEmail($("#" + formId + " #emailId").val().trim())) {
		showMessage(true, 'Either email-id  is blank or invalid');
		return false
	}
	
	if ($(" #terms").is(":checked")) {
		
	}else{
		showMessage(true, 'Please accept Terms & Conditions');
		return false
	}
	
	
	return true;
}

function validateRequestForSendEmail(formId){
	if ($("#"+formId+" #statusLog").val()==0 || $("#"+formId+" #statusLog").val()==null) {
		showMessage(true, 'Log Status is Mandatory');
		return false
	}
	if ($("#"+formId+" #commentLog").val()==0 || $("#"+formId+" #commentLog").val()==null) {
		showMessage(true, 'Comment is Mandatory');
		return false
	}
	return true;
}

function requestForDuplicateCertificate(formId,controlType) {
	if(!validateRequestForDuplicateCertificate(formId)){
		return false;
	}	

	 //("#saveRequest").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','add-duplicate-certificate-request'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddDuplicateCertificate(formId)))+"&controlType="+$('#controlType').val(),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		beforeSend: function() {
			$("#saveRequest").prop("disabled", true);
			$("#edit").prop("disabled", true);
		},
		success : function(htmlContent) {
			$("#saveRequest").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			if(stringMessage[1]!=""){
        			//	showMessage(true, stringMessage[1]);
        			}
        			//$('#duplicateCertificateRequest').show();
        			//$('#duplicateCertificateResponse').show();
        			//$('#duplicateReferenceNo').html(stringMessage[2])
        			$('#duplicateCertificateRequest').html(htmlContent);
        			$('#payLaterResponse').hide();
        			$('#duplicateEditModal').modal('hide');
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
console.log("edit");
function editRequestByAdmin(formId,controlType,referenceId) {

	hideMessage('');
	$("#adminEdit").prop("disabled",true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','duplicate-certificate-request'),
		data : "controlType="+controlType+"&referenceId="+referenceId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#adminEdit").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			if(controlType=='edit'){
    					$('#duplicateEditContent').html(htmlContent);
    					$('#duplicateEditModal').modal('show');
    				}
        		}
        		return false;
			}
		},
		error : function(e) {
			$("#adminEdit").prop("disabled", false);
			showMessage(true, e.responseText);
		}
	});
	return false;
}

function getRequestForAddDuplicateCertificate(formId){
	

var duplicateCertificateDTO = {};
duplicateCertificateDTO['requestId'] = $("#"+formId+" #requestId").val();
duplicateCertificateDTO['referenceNumber'] = $("#"+formId+" #referenceNumber").val();
duplicateCertificateDTO['studentName'] = $("#"+formId+" #studentName").val();
duplicateCertificateDTO['dob'] = $("#"+formId+" #dob").val();
duplicateCertificateDTO['motherName'] = $("#"+formId+" #motherName").val();
duplicateCertificateDTO['fatherName'] = $("#"+formId+" #fatherName").val();
duplicateCertificateDTO['schoolName'] = $("#"+formId+" #schoolName").val();
duplicateCertificateDTO['countryId'] = $("#"+formId+" #countryId").val();
duplicateCertificateDTO['stateId'] = $("#"+formId+" #stateId").val();
duplicateCertificateDTO['cityId'] = $("#"+formId+" #cityId").val();
duplicateCertificateDTO['address'] = encodeURIComponent($("#"+formId+" #address").val());
duplicateCertificateDTO['pinCode'] = $("#"+formId+" #pinCode").val();;
duplicateCertificateDTO['contactNo'] = $("#"+formId+" #contactNo").val();
duplicateCertificateDTO['controlType'] = $("#"+formId+" #controlType").val();
duplicateCertificateDTO['standardId'] = $("#"+formId+" #standardId").val();
duplicateCertificateDTO['rollNo'] = $("#"+formId+" #rollNo").val();
var checkVerify1 = "0";
if($("#checkbox1").is(":checked")){
	checkVerify1 = "1";
}
duplicateCertificateDTO['diplomaRequest'] = checkVerify1;

var checkVerify2 = "0";
if($("#checkbox2").is(":checked")){
	checkVerify2 = "1";
}
duplicateCertificateDTO['marksheetRequest'] = checkVerify2;

var checkVerify3 = "0";
if($("#checkbox3").is(":checked")){
	checkVerify3 = "1";
}
duplicateCertificateDTO['academicVerficationRequest'] = checkVerify3;


var checkVerify4 = "0";
if($("#checkbox4").is(":checked")){
	checkVerify4 = "1";
}
duplicateCertificateDTO['characterCertificateRequest'] = checkVerify4;

var checkVerify5 = "0";
if($("#checkbox5").is(":checked")){
	checkVerify5 = "1";
}
duplicateCertificateDTO['migrationCertificateReqeuest'] = checkVerify5;


var checkVerify6 = "0";
if($("#checkbox6").is(":checked")){
	checkVerify6 = "1";
}
duplicateCertificateDTO['transferCertificateRequest'] = checkVerify6;

if($("#checkbox0").is(":checked")){
	duplicateCertificateDTO['diplomaRequest']="1";
	duplicateCertificateDTO['marksheetRequest']="1";
	duplicateCertificateDTO['academicVerficationRequest']="1";
	duplicateCertificateDTO['characterCertificateRequest']="1";
	duplicateCertificateDTO['migrationCertificateReqeuest']="1";
	duplicateCertificateDTO['transferCertificateRequest']="1";
}

	
		var count = 0;
		for (i = 1; i < 7; i++) {
			if ($("#checkbox" + i).is(":checked")) {
				count = count + 1;
			}
		}

		if (count == 1) {
			duplicateCertificateDTO['totalFee'] = "3000";
		} else {
			duplicateCertificateDTO['totalFee'] = "7000";
		}
	
		var imageName = $("#uploadDoc1").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				duplicateCertificateDTO['uploadDoc1'] = imageName;
			}
		}
	    
	    var imageName = $("#uploadDoc2").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				duplicateCertificateDTO['uploadDoc2'] = imageName;
			}
		}
	  
	    var imageName = $("#uploadDoc3").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				duplicateCertificateDTO['uploadDoc3'] = imageName;
			}
		}
duplicateCertificateDTO['emailId'] = $("#"+formId+" #emailId").val().trim();
duplicateCertificateDTO['comment'] = encodeURIComponent($("#"+formId+" #comment").val());
duplicateCertificateDTO['isdCode'] = $("#"+formId+" #isdCode  option:selected").attr('isdCountryCode');
console.log("isdCode="+$("#isdCode  option:selected").attr('isdCountryCode'));
duplicateCertificateDTO['status'] = "1";
return duplicateCertificateDTO;
}


function resetRequestForm(formId){
$('#'+formId)[0].reset();
$("#"+formId+" #studentName").val('');
$("#"+formId+" #dob").val('');
$("#"+formId+" #motherName").val('');
$("#"+formId+" #fatherName").val('');
$("#"+formId+" #schoolName").val('');
$("#"+formId+" #countryId").val('');
$("#"+formId+" #stateId").val('');
$("#"+formId+" #cityId").val('');
$("#"+formId+" #address").val('');
$("#"+formId+" #pinCode").val('');
$("#"+formId+" #isdCode").val('');
$("#"+formId+" #contactNo").val('');
$("#"+formId+" #standardId").val('');
$("#"+formId+" #rollNo").val('');
$("#"+formId+" #selectAll").val('');
$("#"+formId+" #checkbox1").val('');
$("#"+formId+" #checkbox2").val('');
$("#"+formId+" #checkbox3").val('');
$("#"+formId+" #checkbox4").val('');
$("#"+formId+" #checkbox5").val('');
$("#"+formId+" #checkbox6").val('');

$('#uploadDoc1').prev('span').prev('label').removeClass('green');
$('#uploadDoc1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
$('#uploadDoc1').prev('span').html('');
$('#uploadDoc2').prev('span').prev('label').removeClass('green');
$('#uploadDoc2').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
$('#uploadDoc2').prev('span').html('');
$('#uploadDoc3').prev('span').prev('label').removeClass('green');
$('#uploadDoc3').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
$('#uploadDoc3').prev('span').html('');

$("#"+formId+" #emailId").val('');
$("#"+formId+" #terms").val('');

}


function onClickAddLog(formId) {
	if(!validateRequestForSendEmail(formId)){
		return false;
	}
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','add-duplicate-certificate-logs'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddDuplicateCertificateLogs(formId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#saveRequest").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(true, stringMessage[1]);
        			$('#duplicateViewModal').modal('hide');
        			//$('#duplicateCertificateRequest').show();
        			//$('#duplicateCertificateResponse').show();
        			//$('#duplicateReferenceNo').html(stringMessage[2])
        			//$('#duplicateCertificateRequest').html(htmlContent);
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

function getRequestForAddDuplicateCertificateLogs(formId){
	

	var duplicateCertificateLogsDTO = {};
	duplicateCertificateLogsDTO['requestId'] = $("#requestId").val();
	duplicateCertificateLogsDTO['descriptionId'] = $("#statusLog").val();
	duplicateCertificateLogsDTO['comments'] = encodeURIComponent($("#commentLog").val());
	duplicateCertificateLogsDTO['status'] = $("#status").val();
	duplicateCertificateLogsDTO['controlType']=$("#control").val();
	return duplicateCertificateLogsDTO;
}


function sendEmailEdit(formId) {
	
	if(!validateRequestForSendEmail(formId)){
		return false;
	}
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','send-email-for-edit'),
		data : encodeURI("request="+JSON.stringify(getRequestForSendEmail(formId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#saveRequest").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(true, stringMessage[1]);
        			$('#duplicateViewModal').modal('hide');
        			//$('#duplicateCertificateResponse').show();
        			//$('#duplicateReferenceNo').html(stringMessage[2])
        			//$('#duplicateCertificateRequest').html(htmlContent);
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

function getRequestForSendEmail(formId){
	

	var duplicateCertificateDTO = {};
	duplicateCertificateDTO['requestId'] = $("#"+formId+" #requestId").val();
	duplicateCertificateDTO['referenceNumber'] = $("#referenceNumber").val();
	duplicateCertificateDTO['emailId'] = $("#emailId").val();
	duplicateCertificateDTO['studentName'] = $("#studentName").val();
	duplicateCertificateDTO['statusLog'] = $("#"+formId+" #statusLog").val();
	duplicateCertificateDTO['commentLog'] = encodeURIComponent($("#"+formId+" #commentLog").val());
	return duplicateCertificateDTO;
}

function sendEmailPaymentDc(referenceId) {
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','send-email-for-payment'),
		data: 'referenceId='+referenceId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#saveRequest").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        		//  showMessage(true, stringMessage[1]);
        			$('#paymentResponse').hide();
        			$('#payLaterResponse').show();
        			//$('#duplicateCertificateResponse').show();
        			//$('#duplicateReferenceNo').html(stringMessage[2])
        			//$('#duplicateCertificateRequest').html(htmlContent);
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

function editDuplicateCertificate(formId) {
	if(!validateRequestForDuplicateCertificate(formId)){
		return false;
	}	

	 //("#saveRequest").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','update-duplicate-certificate-request'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddDuplicateCertificate(formId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#saveRequest").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(true, stringMessage[1]);
           			/*if(stringMessage[3]=="college"){
        			$('#duplicateReferenceNo').html(stringMessage[2]);
        			$('#verificationRequest').hide();
        			$('#externalVerificationResponse').show();
        			}
        			else{
        			$('#verificationRequest').hide();
        			$('#externalVerificationCompany').show();
        			$('#externalVerificationCompany').html(htmlContent);
        			}*/
        			
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