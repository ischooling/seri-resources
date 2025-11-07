$(document).ready(function() {

});
function revertAccountDetails() {
	hideMessage('');
	if(!validateRequestForRevertAccountDetails()){
		return false;
	}
	$("#revertAmt").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','payment-reversal-details'),
		data : encodeURI("request="+JSON.stringify(getRequestForRevertAccountDetails())),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(true, stringMessage[1]);
        			setTimeout(function(){
        				location.reload();
        			}, 2000);
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#revertAmt").prop("disabled", false);

			return false;
		}
	});
}

function getRequestForRevertAccountDetails(){
	var paymentRevertDTO=[];
	$("#tbl_rev_amt tr").each(function() {
		var paymentRevert = {};
		if($(this).find(".checkbox-consultant-school")!=undefined && $(this).find(".checkbox-consultant-school").is(":checked")){
			paymentRevert['finnaceAccId'] =$(this).find(".checkbox-consultant-school").attr("finnaceAccId");
			paymentRevert['entityId'] =$(this).find(".checkbox-consultant-school").attr("entityId");
			paymentRevert['entityName'] =$(this).find(".checkbox-consultant-school").attr("entityName");
			paymentRevertDTO.push(paymentRevert);
		}
		if($(this).find(".checkbox-student")!=undefined && $(this).find(".checkbox-student").is(":checked")){
			paymentRevert['finnaceAccId'] = $(this).find(".checkbox-student").attr("finnaceAccId");
			paymentRevert['entityId'] = $(this).find(".checkbox-student").attr("entityId");
			paymentRevert['entityName'] = $(this).find(".checkbox-student").attr("entityName");
			paymentRevertDTO.push(paymentRevert);
		}
	});
	var paymentRevertOuter={};
	paymentRevertOuter['paymentRevert']=paymentRevertDTO;
	return  paymentRevertOuter;
}

function validateRequestForRevertAccountDetails(){
	
	if ($('input[type="checkbox"]:checked').length>1) {
		showMessage(true, 'You can not select more than one checkbox');
		return false
	}
	/*if ($("#entityIdStudent").val()==0 || $("#entityIdStudent").val()==null) {
		//showMessage(true, 'Accounts is required');
		return false
	}
	if ($("#finnanceId").val()==0 || $("#finnanceId").val()==null) {
		//showMessage(true, 'Accounts is required');
		return false
	}
	if ($("#entityName").val()=="") {
		//showMessage(true, 'amount is required');
		return false
	}
	if ($("#entityNameStudent").val()=="") {
		//showMessage(true, 'Payment Mode is required');
		return false
	}
	*/
	return true;
}
