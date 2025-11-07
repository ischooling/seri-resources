//function getPaymentGateway(formId, module){
//	$.ajax({
//		dataType : 'json',
//		type : "POST",
//		contentType : "application/json",
//		url : getURLForHTML('payment','call-payment-gateway'),
//		data : JSON.stringify(getPaymentGatewayDetails(formId, module)),
//		dataType : 'json',
//		cache : false,
//		timeout : 600000,
//		success : function(data) {
//			console.log('data '+data);
//			if (data['status'] == '0' || data['status'] == '2') {
//				showMessage(true, data['message']);
//			} else {
////				showMessage(false, data['message']);
//				$('#paymentForm').attr('action', data.endpointUrl);
//				$('#encRequest').val(data.encRequest);
//				$('#access_code').val(data.accessCode);
//				$('#paymentForm').submit();
//			}
//			return false;
//		},
//		error : function(e) {
//			showMessage(true, e.responseText);
//			return false;
//		}
//	});
//}
//
//function getPaymentGatewayDetails(formId, module){
//	var request = {};
//	var requestData = {};
//	requestData['requestKey'] = module;
//	requestData['requestValue'] = $("#"+formId+" #referenceNumber").val();
//	request['requestData'] = requestData;
//	return request;
//}