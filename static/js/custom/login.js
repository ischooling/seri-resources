$(document).ready(function() {
	
	$("#loginButton").click(function(event) {
		event.preventDefault();
		callUserLogin('loginForm', moduleId);
	});
	$("#forgotSubmit").click(function(){
		callForEmailForgot('forgetForm', moduleId);
	});
	
	$("#resetPassword").click(function(){
		callForResetPassword('changeForm', moduleId);
	});
	$("#notVerify").click(function(){
		callForEmailResend($("#loginForm #email").val(), moduleId,'false');
	});
	
});

function validateRequestForLogin(formId) {
//	if (!validateEmail($("#" + formId + " #email").val())) {
//		showMessage(false, 'Either email is empty or invalid');
//		return false
//	}
	if (!validUser($("#" + formId + " #loginId").val())) {
		showMessage(false, 'Either user name is empty or invalid');
		return false
	}
	if (!validPassword($("#" + formId + " #password").val())) {
		showMessage(false, 'Either password is empty or invalid');
		return false
	}
	if (!validateCaptcha($("#" + formId + " #captcha").val())) {
		showMessage(false, 'Either captcha is empty or invalid');
		return false
	}
	return true;
}

function getRequestForLogin(formId, moduleId) {
	var request = {};
	var authentication = {};
	var requestData = {};
	var loginDTO = {};
//	loginDTO['email'] = $("#" + formId + " #email").val();
	loginDTO['loginId'] = $("#" + formId + " #loginId").val();
	loginDTO['password'] = $("#" + formId + " #password").val();
	loginDTO['captcha'] = $("#" + formId + " #captcha").val();
	loginDTO['location'] = $("#" + formId + " #location").val();
	requestData['loginDTO'] = loginDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callUserLogin(formId, moduleId) {
	hideMessage('');
	if (!validateRequestForLogin(formId)) {
		return false;
	}
	$("#"+formId+" #login").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('login'),
		data : JSON.stringify(getRequestForLogin(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				refreshCaptcha('captchaImage');
				if(data['statusCode'] == '0043') {
					$('#allReadyEmail #emailNotVerify').show();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').hide();
					$('#allReadyEmail').modal('toggle');
				}else if(data['statusCode'] == '02') {
					$('#allReadyEmail #emailNotVerify').hide();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').show();
					$('#allReadyEmail').modal('toggle');
				}else{
					showMessage(true, data['message']);
				}
			} else {
				customLoader(true);
				showMessage(false, data['message']);
				// LOGIC TO DISPLAY DASHBOARD
				// LOGIC TO DISPLAY SIGN-PROCESS
				
				var url = "";
				if(data['responseLoginDTO']['userType'] == 1){
					url = CONTEXT_PATH+"dashboard/admin-super";
				}else if(data['responseLoginDTO']['userType'] == 2){
					url = CONTEXT_PATH+"dashboard/counselors";
				}else if(data['responseLoginDTO']['userType'] == 3){
					url = CONTEXT_PATH+"dashboard/counsultants";
				}else if(data['responseLoginDTO']['userType'] == 4){
					url = CONTEXT_PATH+"dashboard/school";
				}else if(data['responseLoginDTO']['userType'] == 5){
					url = CONTEXT_PATH+"dashboard/director";
				}else if(data['responseLoginDTO']['userType'] == 6){
					url = CONTEXT_PATH+"dashboard/admin";
				}else if(data['responseLoginDTO']['userType'] == 7){
					url = CONTEXT_PATH+"dashboard/account";
				}else if(data['responseLoginDTO']['userType'] == 8){
					url = CONTEXT_PATH+"dashboard/user";
				}else if(data['responseLoginDTO']['userType'] == 9){
					url = CONTEXT_PATH+"dashboard/user";
				}else if(data['responseLoginDTO']['userType'] == 10){
					url = CONTEXT_PATH+"dashboard/user";
				}else if(data['responseLoginDTO']['userType'] == 13){
					url = CONTEXT_PATH+"dashboard/front-desk";
				}else{
					showMessage(true, 'Sorry for inconvenience, system has encountered technical glitch');
					return false;
				}
				if($("#" + formId + " #loginId").val() != 'kedar@seriindia.org'){
					goAhead(url, data['responseLoginDTO']['userLoginHash'], '');
				}else{
					goAhead(url, data['responseLoginDTO']['userLoginHash'], '');
				}
			}
			$("#"+formId+" #login").prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#"+formId+" #login").prop("disabled", false);
		}
	});
}

function callForEmailForgot(formId, moduleId) {
	hideMessage('');
	if(!validateForEmailForgot(formId)){
		return false;
	}
	//$("#resendEmail").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('forgot-password'),
		data : JSON.stringify(getRequestForForgot(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				//showMessage(true, data['message']);
				if(data['statusCode'] == '0047') {
					showMessage(true, data['message']);
					/*$('#allReadyEmail #emailNotVerify').html(data['message']);
					$('#allReadyEmail #emailNotVerify').show();
					$('#allReadyEmail #emailVerify').hide();
					$('#allReadyEmail #userDeclined').hide();
					$('#allReadyEmail').modal('toggle');*/
				}else{
					showMessage(true, data['message']);
				}
			} else {
				$("#forgotPassword #emailid").val('');
				$("#forgotPassword").modal('hide');
				showMessage(false, data['message']);
				
			}
			//$("#resendEmail").prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			//$("#resendEmail").prop("disabled", false);
		}
	});
}

function validateForEmailForgot(formId){
	//GLOBAL_EMAIL
	if (!validateEmail($("#"+formId+" #emailid").val())) {
		$("#"+formId+" #emailid").css('color', '#a9a9a9');
		showMessage(false, 'PLEASE PROVIDE VALID EMAIL ADDRESS.');
		return false
	}
	return true;
}

function getRequestForForgot(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'FORGOT-PASSWORD';
	requestData['requestValue'] = $("#"+formId+" #emailid").val();
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function callForEmailResend(emailId, moduleId, sendStatus) {
	hideMessage('');
	if(!validateForEmailResend(emailId)){
		return false;
	}
	$("#resendEmail").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('resend-email-verification'),
		data : JSON.stringify(getRequestForEmailResend(emailId,moduleId, sendStatus)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				if (data['statusCode'] == '0022') {
					$('#emialLimit #emailLimitText').html(data['message']);
					$('#emialLimit').modal('toggle');
				}else{
					showMessage(true, data['message']);
				}
			}else {
				showMessage(false, data['message']);
			}
			$("#resendEmail").prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#resendEmail").prop("disabled", false);
		}
	});
}

function validateForEmailResend(emailId){
	//GLOBAL_EMAIL
	if (!validateEmail(emailId)) {
		showMessage(false, 'Either email is empty or invalid');
		return false
	}
	return true;
}

function getRequestForEmailResend(emailId, moduleId, sendStatus){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = 'EMAIL-RESEND';
	requestData['requestValue'] =emailId;
	requestData['requestExtra'] =sendStatus;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request
}