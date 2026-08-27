function getBatchListingForSession(formId, sessionId){
	if(sessionId==null || sessionId==undefined){
		sessionId = $('#batchSession').val();
	}
	if(sessionId==null || sessionId==0){
		showMessage(true, 'Please Select Session');
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','manage-batch-listing'),
		data : "sessionId="+sessionId,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
					showMessage(true, stringMessage[1]);
					if(stringMessage[0] == "SESSIONOUT"){
						redirectLoginPage();
					}
				} else {
					$('#'+formId+' #batchListingContainer').html(htmlContent);
				}
			}
		},
		error : function(e) {
			$('#'+formId+' #batchListingContainer').html(e.responseText);
		}
	});
}

function callForAddBatchDetails(){
	hideMessage('');
	var batchName = $('#newBatchName').val();
	if(batchName==null || $.trim(batchName)==""){
		showMessage(true, 'Batch Name is Mandatory');
		return false;
	}
	var sessionId = $('#batchSession').val();
	if(sessionId==null || sessionId==0){
		showMessage(true, 'Please Select Session');
		return false;
	}
	var duplicate = false;
	if($('#manageBatchList').data('sessionId')==sessionId){
		$('#manageBatchList tbody tr td:first-child + td').each(function(){
			if($.trim($(this).text()).toLowerCase() == $.trim(batchName).toLowerCase()){
				duplicate = true;
			}
		});
	}
	if(duplicate){
		showMessage(true, 'A batch with this name already exists for the selected session');
		return false;
	}
	var batchDTO = {};
	batchDTO['name'] = batchName;
	batchDTO['sessionId'] = sessionId;
	batchDTO['dateStatus'] = 'save';
	submitBatchRequest(batchDTO, sessionId);
}

function callForUpdateBatchStatus(src, batchId, dateStatus){
	hideMessage('');
	var batchDTO = {};
	batchDTO['id'] = batchId;
	batchDTO['dateStatus'] = dateStatus;
	submitBatchRequest(batchDTO, $('#manageBatchList').data('sessionId'));
}

function submitBatchRequest(batchDTO, refreshSessionId){
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','add-edit-batch'),
		data : encodeURI("request="+JSON.stringify(batchDTO)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if(stringMessage[0] == "SESSIONOUT"){
					redirectLoginPage();
				} else if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION"){
					showMessage(true, stringMessage[1]);
				} else {
					showMessage(false, stringMessage[1]);
					$('#newBatchName').val('');
					getBatchListingForSession('viewBatchList', refreshSessionId);
				}
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}
