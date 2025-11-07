$(document).ready(function() {
	/*$("#inquiryOther").hide();*/
	$("#inquiry").click(function(){
		 callForInquiryForm('inquiryForm', 'COMMON');
	});
	
	/*$("select#countryId").on("change",function(){
		callStates('inquiryForm', this.value, 'countryId');
		$('.divState').removeClass("is-empty");
		$('.divStdIsdCode').removeClass("is-empty");
		$('#isdcode option:selected').text($('#countryId option:selected').attr('dailcode'));
	});
	$("select#stateId").on("change",function(){
		callCities('inquiryForm', this.value, 'stateId');
		$('.divCity').removeClass("is-empty");
	});
	$("select#inquiryId").on("change",function(){
		var inquiryType  = $('#inquiryId option:selected').val();
		if(inquiryType =='OTHER'){
			$("#inquiryOther").show();
		}else{
			$("#inquiryOther").hide();
		}
	});*/
});
function validateRequestForInquiryDetails(formId){
	
	if ($("#firstname").val()=='' || $("#firstname").val()==null) {
		showMessage(true, 'First name is required');
		return false
	}
	if ($("#lastname").val()==0 || $("#lastname").val()==null) {
		showMessage(true, 'Last name is required');
		return false
	}
	if (!validateEmail($("#email").val())) {
		showMessage(false, 'Either email is empty or invalid');
		return false
	}
	if ($("#countryId").val()==0 || $("#countryId").val()==null) {
		showMessage(true, 'Country is required');
		return false
	}
	if ($("#stateId").val()==0 || $("#stateId").val()==null) {
		showMessage(true, 'State is required');
		return false
	}
	if ($("#cityId").val()==0 || $("#cityId").val()==null) {
		showMessage(true, 'City is required');
		return false
	}
	if ($("#isdCodeMobileNo").val()==0 || $("#isdCodeMobileNo").val()==null) {
		showMessage(true, 'ISD Code is required');
		return false
	}
	if ($("#phone").val()==0 || $("#phone").val()==null) {
		showMessage(true, 'Phone Number is required');
		return false
	}
	if ($("#inquiryType").val()==0 || $("#inquiryType").val()==null) {
		showMessage(true, 'Inquiry Type is required');
		return false
	}
	if ($("#message").val()==undefined ||$("#message").val()=='' || $("#message").val()==null) {
		showMessage(true, 'Message is required');
		return false
	}
	
	/*if ($("#countryId").val()==0 || $("#countryId").val()==null) {
		showMessage(true, 'Country is required');
		return false
	}
	if ($("#stateId").val()==0 || $("#stateId").val()==null) {
		showMessage(true, 'State is required');
		return false
	}
	if ($("#cityId").val()==0 || $("#cityId").val()==null) {
		showMessage(true, 'City is required');
		return false
	}
	if ($("#stateId").val()==0 || $("#stateId").val()==null) {
		showMessage(true, 'State is required');
		return false
	}
	if ($("#username").val()=='' || $("#username").val()==null) {
		showMessage(true, 'Name is required');
		return false
	}
	if (!validateEmail($("#email").val())) {
		showMessage(false, 'Either email is empty or invalid');
		return false
	}
	if ($("#userphone").val()=='' || $("#userphone").val()==null) {
		showMessage(true, 'Phone Number is required');
		return false
	}
	if ($("#description").val()=='' || $("#description").val()==null) {
		showMessage(true, 'Description is required');
		return false
	}
	if ($("#inquiryId option:selected").val()==0 || $("#inquiryId option:selected").val()==null) {
		showMessage(true, 'Please Select your Type');
		return false
	}
	if ($("#inquiryId option:selected").val()=='OTHER') {
		if ($("#otherType").val()=='') {
			showMessage(true, 'Please enter other');
			return false
		}
	}*/
	if (!validateCaptcha($("#captcha").val())) {
		showMessage(false, 'Either captcha is empty or invalid');
		return false
	}
	return true;
}

function callForInquiryForm(formId, moduleId) {
	hideMessage('');
	if(!validateRequestForInquiryDetails(formId)){
		return false;
	}
	$("#inquiry").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','inquiry-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForInquiry(formId, moduleId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#inquiry").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			showMessage(true, stringMessage[1]);
        			$("#refrenceNumber").val(stringMessage[2]);			
        			openOtpForm(formId);
        			disableEnquiryForm(formId);
        		}
        		return false;
			}
			
		},
		error : function(e) {
			$("#inquiry").prop("disabled", false);
			showMessage(true, e.responseText);
		}
	});
}
function getRequestForInquiry(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var enquiryHistoryListDTO = {};
	enquiryHistoryListDTO['countryId'] = $("#countryId").val();
	enquiryHistoryListDTO['stateId'] = $("#stateId").val();
	enquiryHistoryListDTO['cityId'] = $("#cityId").val();
	enquiryHistoryListDTO['firstName'] = $("#firstname").val();
	enquiryHistoryListDTO['lastName'] = $("#lastname").val();
	enquiryHistoryListDTO['email'] = $("#email").val();
	enquiryHistoryListDTO['isdCode'] = $('#inquiryForm #isdCodeMobileNo :selected').text().split(" ")[0];
	enquiryHistoryListDTO['contactNo'] = $("#phone").val();
	enquiryHistoryListDTO['inquiryType'] = $("#inquiryType").val();
	//enquiryHistoryListDTO['city'] = $("#city").val();
	//enquiryHistoryListDTO['country'] = $("#country").val();
	//enquiryHistoryListDTO['contactDescription'] = encodeURIComponent($("#description").val());
	/*enquiryHistoryListDTO['remark'] = $("#message").val();*/
	
	 if ( $("#message").val() != undefined &&  $("#message").val() != '') {
			enquiryHistoryListDTO['remark']  = encodeURIComponent($("#message").val());
		}
	//enquiryHistoryListDTO['inquiryOther'] = $("#otherType").val();
	enquiryHistoryListDTO['captcha'] = $("#captcha").val();
	requestData['enquiryHistoryListDTO'] = enquiryHistoryListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function resetEnquiryForm(formId){
	//$('#'+formId)[0].reset();
	$("#firstname").val('');
	$("#lastname").val('');
	$("#email").val('');
	$("#phone").val('');
	$("#message").val('');
	$("#captcha").val('');
	$("#otpNumber1").val('');
	$("#otpNumber2").val('');
	$("#otpNumber3").val('');
	$("#otpNumber4").val('');
	$("#otpNumber5").val('');
	$("#otpNumber6").val('');
	$("#location").val('');
	$("#refrenceNumber").val('');
	$("#isdCodeMobileNo").val('0');
	$("#cityId").val('0');
	$("#stateId").val('0');
	$("#countryId").val('0');
	$("#inquiryType").val('0');
}

function disableEnquiryForm(formId){
	//$('#'+formId)[0].reset();
	$("#countryId").prop("disabled", true);
	$("#firstname").prop("disabled", true);
	$("#lastname").prop("disabled", true);
	$("#email").prop("disabled", true);
	$("#phone").prop("disabled", true);
	$("#message").prop("disabled", true);
	$("#captcha").prop("disabled", true);
	$("#isdCodeMobileNo").prop("disabled", true);
	$("#cityId").prop("disabled", true);
	$("#stateId").prop("disabled", true);
	$("#inquiryType").prop("disabled", true);
}
function enableEnquiryForm(formId){
	//$('#'+formId)[0].reset();
	$("#countryId").prop("disabled", false);
	$("#firstname").prop("disabled", false);
	$("#lastname").prop("disabled", false);
	$("#email").prop("disabled", false);
	$("#phone").prop("disabled", false);
	$("#message").prop("disabled", false);
	$("#captcha").prop("disabled", false);
	$("#isdCodeMobileNo").prop("disabled", false);
	$("#cityId").prop("disabled", false);
	$("#stateId").prop("disabled", false);
	$("#inquiryType").prop("disabled", false);
}

function openOtpForm(formId){
	$("#inquiry").hide();
	$("#otpFormDiv").show();
	
}	

function closeOtpForm(formId){
	$("#inquiry").show();
	$("#otpFormDiv").hide();
	
}	

function verifyOtp(formId,moduleId){
	hideMessage('');
	if(!validateRequestForVerifyOtp(formId)){
		return false;
	}
	$("#confirmOtp").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','verify-otp-for-inquiry'),
		data : 'refrenceNumber='+$('#refrenceNumber').val()+'&otpCode='+$("#otpNumber1").val() + $("#otpNumber2").val() + $("#otpNumber3").val() + $("#otpNumber4").val() + $("#otpNumber5").val() + $("#otpNumber6").val(),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#confirmOtp").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			showMessage(true, stringMessage[1]);
        			resetEnquiryForm(formId);
        			closeOtpForm(formId);
        			enableEnquiryForm(formId);
        		}
        		return false;
			}
			
		},
		error : function(e) {
			$("#inquiry").prop("disabled", false);
			showMessage(true, e.responseText);
		}
	});
}
function validateRequestForVerifyOtp(formId){
	
	if ($("#otpNumber1").val()=='' || $("#otpNumber1").val()==null) {
		showMessage(true, 'Either OTP is blank or invalid');
		return false
	}
	if ($("#otpNumber2").val()=='' || $("#otpNumber2").val()==null) {
		showMessage(true, 'Either OTP is blank or invalid');
		return false
	}
	if ($("#otpNumber3").val()=='' || $("#otpNumber3").val()==null) {
		showMessage(true, 'Either OTP is blank or invalid');
		return false
	}
	if ($("#otpNumber4").val()=='' || $("#otpNumber4").val()==null) {
		showMessage(true, 'Either OTP is blank or invalid');
		return false
	}
	if ($("#otpNumber5").val()=='' || $("#otpNumber5").val()==null) {
		showMessage(true, 'Either OTP is blank or invalid');
		return false
	}
	if ($("#otpNumber6").val()=='' || $("#otpNumber6").val()==null) {
		showMessage(true, 'Either OTP is blank or invalid');
		return false
	}
	return true;
}

function resendOtpForInquiry(formId,moduleId){
	hideMessage('');
	$("#resendOtp").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','resend-otp-for-inquiry'),
		data : 'refrenceNumber='+$('#refrenceNumber').val(),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#resendOtp").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        		} else {
        			showMessage(true, stringMessage[1]);
        		}
        		return false;
			}
			
		},
		error : function(e) {
			$("#inquiry").prop("disabled", false);
			showMessage(true, e.responseText);
		}
	});
}

function movetoNext(formId,current, nextFieldID) {
	if ($("#"+current).val().length == 1) {
		$("#"+nextFieldID).focus();
	}
}