BASE_URL = '';
if (ENVIRONMENT == 'uat') {
	BASE_URL = 'http://164.52.198.42:8080/istest/';
} else if (ENVIRONMENT == 'dev') {
	BASE_URL = 'http://localhost:8080/istest/';
} else if (ENVIRONMENT == 'dev-staging') {
	BASE_URL = 'http://192.168.1.75:8080/istest/';
} else {
	BASE_URL = 'https://sms.internationalschooling.org/';
}
var API_VERSION = CONTEXT_PATH+'api/v1/';
function getURLForCommon(suffixUrl){
	return  API_VERSION + 'common' + '/' + suffixUrl;
}
function hideMessage(elementId){
	
}
function showMessage(isError, message, elementId){
	
}
function buildDropdown(result, dropdown, emptyMessage) {
	dropdown.html('');
	
	if (result != '') {
		//dropdown.append('<option value="0">' + emptyMessage + '</option>');
		dropdown.append('<option disabled selected> </option>');
		$.each(result, function(k, v) {
			if(v.extra!=null && v.extra1 !=null){
				dropdown.append('<option value="' + v.key + '">' + v.extra + ' - ' + v.extra1 + '</option>');
			}else if(v.extra!=null){
				dropdown.append('<option value="' + v.key + '">(' + v.extra + ') ' + v.value + '</option>');
			}else{
				dropdown.append('<option value="' + v.key + '">' + v.value + '</option>');
			}
			
		});
	}
}
function resetDropdown(dropdown, emptyMessage) {
	dropdown.html('');
	//dropdown.append('<option value="0">' + emptyMessage + '</option>');
	dropdown.append('<option disabled selected> </option>');
}
function callStates(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #stateId").val(0);
		resetDropdown($("#"+formId+" #stateId"), 'Select state');
		$("#"+formId+" #cityId").val(0);
		resetDropdown($("#"+formId+" #cityId"), 'Select city');
		return false;
	}
	$("#stateId").prop("disabled", true);
	resetDropdown($("#"+formId+" #cityId"), 'Select city');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'STATES-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['data'], $('#'+formId+' #stateId'), 'Select state');
			}
			$("#stateId").prop("disabled", false);
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#stateId").prop("disabled", false);
		}
	});
}
function callCities(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #cityId").val(0);
		resetDropdown($("#"+formId+" #cityId"), 'Select city');
		return false;
	}
	$("#"+formId+" #cityId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'CITIES-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['data'], $('#'+formId+' #cityId'), 'Select city');
			}
			$('#'+formId+' #cityId').prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#cityId").prop("disabled", false);
		}
	});
}
function validateRequestForMaster(formId, elementId) {
	if($('#'+formId+ ' #'+elementId).val()=='' || $('#'+formId+ ' #'+elementId).val()<=0){
		return false;
	}
	return true;
}
function getRequestForMaster(formId, key, value, requestExtra) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	if(requestExtra!=undefined){
		requestData['requestExtra'] = requestExtra;
	}
	authentication['hash'] = getHash();
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}