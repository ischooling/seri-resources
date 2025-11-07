$(document).ready(function() {

});
function submitAccountDetails(formId,moduleId, modelName) {
	hideMessage('');
	if(!validateRequestForAccountDetails(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','account-submit-content'),
		data : JSON.stringify(getRequestForAccountDetails(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
				$('#'+modelName).modal('toggle');
				setTimeout(function(){
    				location.reload();
    			}, 2000);
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForAccountDetails(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageAccountsDTO = {};
	manageAccountsDTO['paymentId'] = $("#"+formId+" #paymentId").val();
	manageAccountsDTO['accountId'] = $("#"+formId+" #accountId option:selected").val();
	manageAccountsDTO['paymentFromId'] = $("#"+formId+" #entityId").val();
	if($('#'+formId+' #session').val()!=undefined){
		var sessionValue = $('#'+formId+' #session option:selected').attr('sessionValue').split("-");
		manageAccountsDTO['paymentSessionYear'] = sessionValue[0];
		manageAccountsDTO['paymentSessionMonth'] = sessionValue[1];
	}
	manageAccountsDTO['paymentFrom'] = $("#"+formId+" #entityName").val();
	manageAccountsDTO['paymentPreAmount'] = $("#"+formId+" #preamount").val();
	manageAccountsDTO['paymentAmount'] = $("#"+formId+" #amount").val();
	manageAccountsDTO['paymentMode'] = $("#"+formId+" #paymentMode").val();
	manageAccountsDTO['paymentReference'] = $("#"+formId+" #paymentReference").val();
	manageAccountsDTO['bankState'] = $("#"+formId+" #bankState option:selected").val();
	manageAccountsDTO['paymentDate'] = $("#"+formId+" #paymentTransaction").val();
	manageAccountsDTO['paymentFeeType'] = $("#"+formId+" #feeType option:selected").val();
	var imageName = $("#fileDemandDraft").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			manageAccountsDTO['demandDraftDoc'] = imageName;
		}
	}
	
	requestData['manageAccountsDTO'] = manageAccountsDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForAccountDetails(formId,moduleId){
	
	if ($("#"+formId+" #accountId").val()==0 || $("#"+formId+" #accountId").val()==null) {
		showMessage(true, 'Accounts is required');
		return false
	}
	if ($("#"+formId+" #amount").val()=="") {
		showMessage(true, 'amount is required');
		return false
	}
	if ($("#"+formId+" #paymentMode").val()==null || $("#"+formId+" #paymentMode").val()==0) {
		showMessage(true, 'Payment Mode is required');
		return false
	}
	if ($("#"+formId+" #paymentReference").val()=="") {
		showMessage(true, 'Payment Reference is required');
		return false
	}
	if ($("#"+formId+" #bankState").val()==0 || $("#"+formId+" #bankState").val()==null) {
		showMessage(true, 'Bank state is required');
		return false
	}
	if ($("#"+formId+" #paymentTransaction").val()=="") {
		showMessage(true, 'Payment Transaction is required');
		return false
	}
	
	return true;
	
}



