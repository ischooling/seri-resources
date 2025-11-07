console.log("dasdas");
$(document).ready(function() {
	/*$("#inquiryOther").hide();*/
	$("#accreditation").click(function(){
		 callForAccreditationForm('accreditationForm', 'COMMON');
	});
	
});
function validateRequestForInquiryDetails(formId){
	if ($("#"+formId+" #sname").val()==undefined || $("#"+formId+" #sname").val()=='' || $("#"+formId+" #sname").val()==null) {
		showMessage(true, 'School name is required');
		/*$("#"+formId+" #sname").removeClass("school").addClass("error");*/
		return false
	}
	if ($("#"+formId+" #cpersone").val()==0 || $("#"+formId+" #cpersone").val()==null) {
		showMessage(true, 'Contact person name is required');
		return false
	}
	if ($("#"+formId+" #cpersoneDesig").val()=='' || $("#"+formId+" #cpersoneDesig").val()==null) {
		showMessage(true, 'Designation is required');
		return false
	}
	if ($("#"+formId+" #schoolAddress").val()=='' || $("#"+formId+" #schoolAddress").val()==null) {
		showMessage(true, 'School Address is required');
		return false
	}
	if (!validateEmail($("#" + formId + " #email").val())) {
		showMessage(false, 'Either email is empty or invalid');
		return false
	}
	if($("#"+formId+" #controllType").val()=="ACCREDITATION"){
		if ($("#"+formId+" #countryId").val()=='' || $("#"+formId+" #countryId").val()==null) {
			showMessage(true, 'Country is required');
			return false
		}
		if ($("#"+formId+" #stateId").val()=='' || $("#"+formId+" #stateId").val()==null) {
			showMessage(true, 'State is required');
			return false
		}
		if ($("#"+formId+" #cityId").val()=='' || $("#"+formId+" #cityId").val()==null) {
			showMessage(true, 'City is required');
			return false
		}
		
		if ($("#"+formId+" #schoolWebsite").val().trim()=="" && !validUrl($("#" + formId + " #schoolWebsite").val().trim())) {
			showMessage(true, 'School Website is required');
			return false
		}
		
		
		if ($("#"+formId+" #phone").val()=='' || $("#"+formId+" #phone").val()==null) {
			showMessage(true, 'Phone Number is required');
			return false
		}
		
		if ($("#"+formId+" #eremark").val()==undefined || $("#"+formId+" #eremark").val()=='' || $("#"+formId+" #eremark").val()==null) {
			showMessage(true, 'Remark is required');
			return false
		}
	}else if($("#"+formId+" #controllType").val()=="AFFILIATION"){
		
		if ($("#"+formId+" #countryId").val()=='' || $("#"+formId+" #countryIds").val()==null) {
			showMessage(true, 'Country is required');
			return false
		}
		if ($("#"+formId+" #stateId").val()=='' || $("#"+formId+" #stateId").val()==null) {
			showMessage(true, 'State is required');
			return false
		}
		if ($("#"+formId+" #cityId").val()=='' || $("#"+formId+" #cityId").val()==null) {
			showMessage(true, 'City is required');
			return false
		}
		if ($("#"+formId+" #contactno").val()=='' || $("#"+formId+" #contactno").val()==null) {
			showMessage(true, 'Contact no is required');
			return false
		}
		
		/*if ($("#"+formId+" #schoolWebsite").val().trim()=="" && !validUrl($("#" + formId + " #schoolWebsite").val().trim())) {
			showMessage(true, 'School Website is required');
			return false
		}*/
		
	}
	if (!validateCaptcha($("#" + formId + " #captcha").val())) {
		showMessage(false, 'Either captcha is empty or invalid');
		return false
	}
	return true;
}

function callForAccreditationForm(formId, moduleId) {
	hideMessage('');
	/*$(".error").remove();*/
	if(!validateRequestForInquiryDetails(formId)){
		return false;
	}
	$("#accreditation").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('common','accreditation-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForAccreditation(formId, moduleId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#accreditation").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			showMessage(true, stringMessage[1]);
        			if(stringMessage[1] == "Please enter valid captcha"){
        				refreshCaptcha('captchaImages');
        			}
        		} else {
        			/*setTimeout(function(){ showMessage(true, stringMessage[1]); }, 10000);*/
        			 if($("#"+formId+" #controllType").val()=="AFFILIATION"){
        				 $('#affiliationSuccessId').modal('show');
        			 }else{
        				 showMessage(true, stringMessage[1]);
        			 }
        			$('#preliminary-form-modal').modal('hide');
        			resetAccreditationForm(formId);
        		}
        		return false;
			}
			
		},
		error : function(e) {
			$("#accreditation").prop("disabled", false);
			showMessage(true, e.responseText);
		}
	});
}
		
		
function getRequestForAccreditation(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var accrediationListDTO = {};
	accrediationListDTO['controllType'] = $("#" + formId + " #controllType").val();
	if ($("#" + formId + " #sname").val() != undefined &&  $("#" + formId + " #sname").val() != '') {
		 accrediationListDTO['schoolName']  = encodeURIComponent($("#" + formId + " #sname").val());
	}
	accrediationListDTO['contactPersonName'] = $("#" + formId + " #cpersone").val();
	accrediationListDTO['contactPersonDesignation'] = $("#" + formId + " #cpersoneDesig").val();
	accrediationListDTO['email'] = $("#" + formId + " #email").val();
	
	if($("#"+formId+" #controllType").val()=="ACCREDITATION"){
		accrediationListDTO['country'] = $("#" + formId + " #countryId").val();
		accrediationListDTO['state'] = $("#" + formId + " #stateId").val();
		accrediationListDTO['city'] = $("#" + formId + " #cityId").val();
		accrediationListDTO['contactNo'] = $("#" + formId + " #phone").val();
		accrediationListDTO['schoolAddress'] = $("#" + formId + " #schoolAddress").val(); 
		accrediationListDTO['schoolWebsite'] = $("#" + formId + " #schoolWebsite").val();
	}else if($("#"+formId+" #controllType").val()=="AFFILIATION"){
		accrediationListDTO['country'] = $("#" + formId + " #countryIds").val();
		accrediationListDTO['state'] = $("#" + formId + " #stateId").val();
		accrediationListDTO['city'] = $("#" + formId + " #cityId").val();
		accrediationListDTO['schoolWebsite'] = $("#" + formId + " #schoolWebsite").val();
		if ( $("#" + formId + " #schoolAddress").val() != undefined && $("#" + formId + " #schoolAddress").val() != '') {
			 accrediationListDTO['schoolAddress']  = encodeURIComponent($("#" + formId + " #schoolAddress").val());
			}
		accrediationListDTO['contactNo'] = $("#" + formId + " #contactno").val();
	}
	accrediationListDTO['remarks'] = $("#" + formId + " #eremark").val();
	 if ( $("#" + formId + " #eremark").val() != undefined && $("#" + formId + " #eremark").val() != '') {
		 accrediationListDTO['remarks']  = encodeURIComponent($("#" + formId + " #eremark").val());
		}
	accrediationListDTO['captcha'] = $("#" + formId + " #captcha").val();
	requestData['accrediationListDTO'] = accrediationListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function resetAccreditationForm(formId){
	//$('#'+formId)[0].reset();
	$("#"+formId+" #sname").val('');
	$("#"+formId+" #cpersone").val('');
	$("#"+formId+" #cpersoneDesig").val('');
	$("#"+formId+" #email").val('');
	$("#"+formId+" #stateId").html('');
	$("#"+formId+" #stateId").html('<option value="">State</option>');
	$("#"+formId+" #stateId").val('');
	$("#"+formId+" #cityId").html('');
	$("#"+formId+" #cityId").html('<option value="">City</option>');
	$("#"+formId+" #cityId").val('');
	$("#"+formId+" #country").val('');
	$("#"+formId+" #eremark").val('');
	$("#"+formId+" #phone").val('');
	$("#"+formId+" #captcha").val('');
	$("#"+formId+" #schoolWebsite").val('');
	$("#"+formId+" #schoolAddress").val('');
}

function validUrl(url) {
    var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!regexp.test(url)) {
        return false;
    }else{
    	 return true;
    } 
  
}
