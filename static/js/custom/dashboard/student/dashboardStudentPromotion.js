$(document).ready(function() {
});
console.log('dashboardStudentPromotion.js')

function callPromotionAll(){
	var checked = false;
	if($('#promotionAll').is(':checked')){
		checked = true;
	}
	$(".promotion").each(function() {
		if(checked){
			$(this).prop('checked',true);
		}else{
			$(this).prop('checked',false);
		}
	});
}
function callPromotionSingle(){
	var checkAllFlag=true;
	$(".promotion").each(function() {
		if(!$(this).is(':checked')){
			checkAllFlag=false;
		}
		if(checkAllFlag){
			$('#promotionAll').prop('checked',true);
		}else{
			$('#promotionAll').prop('checked',false);
		}
	});
}
function getSessionMigration(formId){
	var value = "";
	if($('#fromSession').val()!=undefined){
		var sessionValue = $('#'+formId+' #fromSession option:selected').attr('sessionValue').split("-");
		value = sessionValue[0]+'-'+sessionValue[1];
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'SESSION_MASTER_MIGRATION', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdownSingle(data['mastersData']['data'], $('#'+formId+' #toSession'), 'Select session');
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
function buildDropdownSingle(result, dropdown, emptyMessage) {
	dropdown.html('');
	if (result != '') {
		dropdown.append('<option disabled selected> </option>');
		$.each(result, function(k, v) {
			dropdown.append('<option sessionValue="' + v.extra + '" value="' + v.key + '">' + v.value + '</option>');
			return false;
		});
	}
}
function callStudentPromotionList(formId) {
	hideMessage('');
	if (!validateRequestForStudentPromotionList()) {
		return false;
	}
	var fromSession = $('#'+formId+' #fromSession option:selected').attr('sessionValue').split("-");
	var toSession = $('#'+formId+' #toSession option:selected').attr('sessionValue').split("-");
	var data =    'sessionYear=' + fromSession[0] 
				+ '&sessionMonth=' + fromSession[1] 
				+ '&sessionToYear=' + toSession[0] 
				+ '&sessionToMonth=' + toSession[1] 
				+ '&standardId='+ $("#standardId").val()
				+ '&resultStatus='+ $("#resultStatus").val()
				+ '&listSize='+ $("#listSize").val();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard', 'student-promotion-content'),
		data : data,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if (htmlContent != "") {
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if (stringMessage[0] == "FAILED"
						|| stringMessage[0] == "EXCEPTION"
						|| stringMessage[0] == "SESSIONOUT") {
					if (stringMessage[0] == "SESSIONOUT") {
						redirectLoginPage();
					} else {
						showMessage(true, stringMessage[1]);
					}
				} else {
					$('#studentPromotionList').html(htmlContent);
				}
				return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
function validateRequestForStudentPromotionList(){
	return true;
}
