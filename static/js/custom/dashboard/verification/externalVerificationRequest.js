function validateRequestForExternalVerification(formId,verificationFor){
if ($.isEmptyObject($("#"+formId+" #studentName").val().trim())) {
	showMessage(true, 'Student Name is Mandatory');
	return false
}
if ($("#"+formId+" #dob").val()==0 || $("#"+formId+" #dob").val()==null) {
	showMessage(true, 'Date of Birth is Mandatory');
	return false
}

if ($.isEmptyObject($("#"+formId+" #fatherName").val().trim())) {
	showMessage(true, 'Fathers Name is Mandatory');
	return false
}

if ($.isEmptyObject($("#"+formId+" #schoolName").val().trim())) {
	showMessage(true, 'School Name is mandatory');
	return false
}

if(verificationFor==3){
if ($.isEmptyObject($("#"+formId+" #collegeName").val().trim())) {
	showMessage(true, 'College Name is mandatory');
	return false
	}
}

if(verificationFor==4){
	if ($.isEmptyObject($("#"+formId+" #companyName").val().trim())) {
		showMessage(true, 'Company Name is mandatory');
		return false
	}
}

if ($.isEmptyObject($("#"+formId+" #purposeOfVerification").val().trim())) {
	showMessage(true, 'Purpose of Verification is mandatory');
	return false
}

if (!validateEmail($("#" + formId + " #emailId").val().trim())) {
	showMessage(true, 'Either email-id  is blank or invalid');
	return false
}

if ($("#"+formId+" #contactNo").val()=='' || $("#"+formId+" #contactNo").val()==null) {
	showMessage(true, 'Contact No is mandatory');
	return false
}


if ($("#selectAll").is(":checked")||$("#checkbox1").is(":checked")||$("#checkbox2").is(":checked")||$("#checkbox3").is(":checked")||$("#checkbox4").is(":checked")||$("#checkbox5").is(":checked")||$("#checkbox6").is(":checked")) {
	
}else{
	showMessage(true, 'Please select atleast 1 document');
	return false
}
if($("#checkbox1").is(":checked")){
	var imageName = $("#upload1").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName == 'click here to upload') {
		showMessage(true, 'Upload Diploma Certificate');
		return false
	}
}
if($("#checkbox2").is(":checked")){
	var imageName = $("#upload2").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName == 'click here to upload') {
		showMessage(true, 'Upload Marksheet');
		return false
	}
}
if($("#checkbox3").is(":checked")){
	var imageName = $("#upload3").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName == 'click here to upload') {
		showMessage(true, 'Upload Academic Verification');
		return false
	}
}
if($("#checkbox4").is(":checked")){
	var imageName = $("#upload4").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName == 'click here to upload') {
		showMessage(true, 'Upload Character Certificate');
		return false
	}
}
if($("#checkbox5").is(":checked")){
	var imageName = $("#upload5").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName == 'click here to upload') {
		showMessage(true, 'Upload Migration Certificate');
		return false
	}
}
if($("#checkbox6").is(":checked")){
	var imageName = $("#upload6").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
	if (imageName == '' || imageName == 'click here to upload') {
		showMessage(true, 'Upload Transfer Certificate');
		return false
	}
}
var imageName = $("#uploadDoc1").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
if (imageName == '' || imageName == 'click here to upload') {
	showMessage(true, 'Upload Cover Letter');
	return false
}
if(imageName!='' && imageName!='click here to upload'){
	if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg','pdf']) == -1){
		showMessage(true, 'Please upload Document in following formats (jpg, jpeg, png or pdf).');
		return false
	}
}

if ($("#comment").val()=='' || $("#comment").val()==null) {
	showMessage(true, 'Comment is mandatory');
	return false
}


if ($("#tc").is(":checked")) {
	
}else{
	showMessage(true, 'Please accept Terms & Conditions');
	return false
}



return true;
}
console.log("data");

function requestForExternalVerification(formId,verificationFor,controlType) {
	if(!validateRequestForExternalVerification(formId,verificationFor)){
		return false;
	}	

	 //("#saveRequest").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','add-external-verification-request'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddExternalVerification(verificationFor,formId)))+"&controlType="+$('#controlType').val(),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		beforeSend: function() {
			$("#saveRequestCompany").prop("disabled", true);
			$("#saveRequestCollege").prop("disabled", true);
			$("#editRequestCompany").prop("disabled", true);
		},
		success : function(htmlContent) {
			
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
//        			console.log('1..stringMessage[1] :  '+stringMessage[1])
//        			if(stringMessage[1]!=""){
//        				showMessage(true, stringMessage[1]);
//        			}
           			if(stringMessage[3]=="college"){
           				$('#duplicateReferenceNo').html(stringMessage[2]);
           				$('#verificationRequest').hide();
           				$('#externalVerificationResponse').show();
	        			if(controlType=='edit'){
	        				$('#verificationRequest').hide();
	        				$('#externalVerificationEdit').show();
	        			}
        			}else {
        				$('#verificationRequest').hide();
        				$('#externalVerificationCompany').show();
        				$('#externalVerificationCompany').html(htmlContent);
        			}
           			$('#externalVerificationEditModal').modal('hide');
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

function getRequestForAddExternalVerification(verificationFor,formId){

	var externalVerificationDTO = {};
	externalVerificationDTO['requestId'] = $("#"+formId+" #requestId").val();
	externalVerificationDTO['referenceNumber'] = $("#"+formId+" #referenceNumber").val();
	externalVerificationDTO['studentName'] = $("#"+formId+" #studentName").val();
	externalVerificationDTO['dob'] = $("#"+formId+" #dob").val();
	externalVerificationDTO['fatherName'] = $("#"+formId+" #fatherName").val();
	externalVerificationDTO['schoolName'] = encodeURIComponent($("#"+formId+" #schoolName").val());
	if(verificationFor==3){
		externalVerificationDTO['collegeName'] =encodeURIComponent($("#"+formId+" #collegeName").val());
		externalVerificationDTO['companyName'] ="";
	}
	if(verificationFor==4){
		externalVerificationDTO['collegeName'] ="";
		externalVerificationDTO['companyName'] =encodeURIComponent($("#"+formId+" #companyName").val());
	}
	externalVerificationDTO['purposeOfVerification'] = encodeURIComponent($("#"+formId+" #purposeOfVerification").val());
	externalVerificationDTO['controlType'] = $("#controlType").val();
	
	externalVerificationDTO['contactNo'] = $("#"+formId+" #contactNo").val();
	
	var checkVerify1 = "0";
	if($("#"+formId+" #checkbox1").is(":checked")){
		checkVerify1 = "1";
	}
	externalVerificationDTO['diplomaRequest'] = checkVerify1;
	console.log("diploma"+checkVerify1);

	var checkVerify2 = "0";
	if($("#"+formId+" #checkbox2").is(":checked")){
		checkVerify2 = "1";
	}
	externalVerificationDTO['marksheetRequest'] = checkVerify2;

	var checkVerify3 = "0";
	if($("#"+formId+" #checkbox3").is(":checked")){
		checkVerify3 = "1";
	}
	externalVerificationDTO['academicVerficationRequest'] = checkVerify3;


	var checkVerify4 = "0";
	if($("#"+formId+" #checkbox4").is(":checked")){
		checkVerify4 = "1";
	}
	externalVerificationDTO['characterCertificateRequest'] = checkVerify4;

	var checkVerify5 = "0";
	if($("#"+formId+" #checkbox5").is(":checked")){
		checkVerify5 = "1";
	}
	externalVerificationDTO['migrationCertificateReqeuest'] = checkVerify5;


	var checkVerify6 = "0";
	if($("#"+formId+" #checkbox6").is(":checked")){
		checkVerify6 = "1";
	}
	externalVerificationDTO['transferCertificateRequest'] = checkVerify6;

	if($("#"+formId+" #checkbox0").is(":checked")){
		externalVerificationDTO['diplomaRequest']="1";
		externalVerificationDTO['marksheetRequest']="1";
		externalVerificationDTO['academicVerficationRequest']="1";
		externalVerificationDTO['characterCertificateRequest']="1";
		externalVerificationDTO['migrationCertificateReqeuest']="1";
		externalVerificationDTO['transferCertificateRequest']="1";
		
	}
	
if ($("#"+formId+" #collegeName").val()=='' || $("#"+formId+" #collegeName").val()==null) {

		if ($("#checkbox0").is(":checked")||$("#checkbox1").is(":checked")||$("#checkbox2").is(":checked")||$("#checkbox3").is(":checked")
				||$("#checkbox4").is(":checked")||$("#checkbox5").is(":checked")||$("#checkbox6").is(":checked")) {
			externalVerificationDTO['totalFee'] = "1500";
		}
	}

			var imageName = $("#upload1").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['upload1'] = imageName;
					console.log("upload1 " +imageName);
				}
			}
		    
		    var imageName = $("#upload2").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['upload2'] = imageName;
				}
			}
		    
		    var imageName = $("#upload3").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['upload3'] = imageName;
				}
			} 
			
			var imageName = $("#upload4").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['upload4'] = imageName;
				}
			}
		    
		    var imageName = $("#upload5").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['upload5'] = imageName;
				}
			}
		    
		    var imageName = $("#upload6").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['upload6'] = imageName;
				}
			} 
	  		var imageName = $("#uploadDoc1").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['uploadDoc1'] = imageName;
				}
			}
		    
		    var imageName = $("#uploadDoc2").prev('span').prev('label').text().trim()
			if(imageName!='' && imageName!='Click here to upload'){
				if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
					
				}else{
					externalVerificationDTO['uploadDoc2'] = imageName;
				}
			}
		    
		
		    
	externalVerificationDTO['emailId'] = $("#"+formId+" #emailId").val().trim();
	externalVerificationDTO['comment'] = encodeURIComponent($("#"+formId+" #comment").val());
	externalVerificationDTO['status'] = "1";
	//duplicateCertificateDTO['totalFee'] = "7000";


	return externalVerificationDTO;
	}

function onClickAddLogEv(formId) {
	if(!validateRequestForSendEmail(formId)){
		return false;
	}
		$.ajax({
		type : "POST",
		url : getURLForHTML('service','add-external-verification-logs'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddExternalVerificationLogs(formId))),
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
        			$("#externalVerificationModal").modal('hide');
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

function getRequestForAddExternalVerificationLogs(formId){
	

	var externalVerificationLogsDTO = {};
	externalVerificationLogsDTO['requestId'] = $("#"+formId+" #requestId").val();
	externalVerificationLogsDTO['controlType'] = $("#"+formId+" #controlType").val();
	externalVerificationLogsDTO['descriptionId'] = $("#statusLog").val();
	externalVerificationLogsDTO['comments'] = encodeURIComponent($("#"+formId+" #commentLog").val());
	externalVerificationLogsDTO['status'] = $("#"+formId+" #status").val();
	return externalVerificationLogsDTO;
}

function editRequestByAdminEv(formId,controlType,referenceId) {

	hideMessage('');
	//$("#adminEdit").prop("disabled",true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','external-verification'),
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
    					$('#externalVerificationEditContent').html(htmlContent);
    					$('#externalVerificationEditModal').modal('show');
    				}
        		}
        		return false;
			}
		},
		error : function(e) {
			//$("#adminEdit").prop("disabled", false);
			showMessage(true, e.responseText);
		}
	});
	return false;
}

function sendEmailEdit(formId) {	
	if(!validateRequestForSendEmail(formId)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','send-email-for-edit-verification'),
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
        			$("#externalVerificationModal").modal('hide');
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
console.log("EVedit");
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

function getRequestForSendEmail(formId){
	
	var externalVerificationDTO = {};
	externalVerificationDTO['requestId'] = $("#"+formId+" #requestId").val();
	externalVerificationDTO['referenceNumber'] = $("#"+formId+" #referenceNumber").val();
	externalVerificationDTO['emailId'] = $("#"+formId+" #emailId").val();
	externalVerificationDTO['studentName'] = $("#"+formId+" #studentName").val();
	externalVerificationDTO['collegeName']= $("#"+formId+" #collegeName").val();
	externalVerificationDTO['companyName']= $("#"+formId+" #companyName").val();
	externalVerificationDTO['statusLog'] = $("#"+formId+" #statusLog").val();
	externalVerificationDTO['commentLog'] = encodeURIComponent($("#"+formId+" #commentLog").val());
	return externalVerificationDTO;
}

function sendEmailPaymentEv(referenceId) {
	/*if(!validateRequestForDuplicateCertificate(formId)){
		return false;
	}*/
	var data='referenceId='+$('#referenceId').val();
	console.log(data);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','send-email-for-payment-ev'),
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
        		//	showMessage(true, stringMessage[1]);
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
function editExternalVerification(formId) {
	if(!validateRequestForExternalVerification(formId)){
		return false;
	}	

	 //("#saveRequest").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('service','update-external-verification-request'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddExternalVerification(formId))),
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