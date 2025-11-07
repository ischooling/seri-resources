//$(document).ready(function() {
	function validateRequestForAppointmentDetails(formId){
		
		if ($("#name").val()=='' || $("#name").val()==null) {
			showMessage(true, 'Name is required');
			return false;
		}
		if (!validateEmail($("#emailId").val().trim())) {
			showMessage(true, 'Either email-id is empty or invalid');
			return false;
		}
		if ($("#contactNo").val()=='' || $("#contactNo").val()==null) {
			showMessage(true, 'Contact Number is required');
			return false;
		}
		if ($("#countryId").val()==0 || $("#countryId").val()==null) {
			showMessage(true, 'Country is required');
			return false;
		}
		if ($("#stateId").val()==0 || $("#stateId").val()==null) {
			showMessage(true, 'State is required');
			return false;
		}
		if ($("#cityId").val()==0 || $("#cityId").val()==null) {
			showMessage(true, 'City is required');
			return false;
		}
		if($("#controlType").val()=='add'){
			if($("input[name='selectSlot']:checked").val()==0 || $("input[name='selectSlot']:checked").val()==null){
				showMessage(true, 'You need to select a slot');
				return false;
			}
		}
		
		return true
	}
	function callForAppointmentForm(formId) {
		hideMessage('');
		if(!validateRequestForAppointmentDetails(formId)){
			return false;
		}
		/*$("#appointment").prop("disabled", true);*/
		$.ajax({
			type : "POST",
			url : getURLForHTML('service','add-appointment-request'),
			data : encodeURI("request="+JSON.stringify(getRequestForAppointment(formId)))+"&controlType="+$('#controlType').val(),
			dataType : 'html',
			cache : false,
			timeout : 600000,
			success : function(htmlContent) {
				$("#appointment").prop("disabled", false);
				if(htmlContent!=""){
	            	var stringMessage = [];
	            	stringMessage = htmlContent.split("|");
	        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
	        			showMessage(true, stringMessage[1]);
	        		} else {
	        			showMessage(true, stringMessage[1]);
	        			resetAppointmentForm(formId);
	        			$('#appointmentModal').modal('hide');
	        			$('#apptForm').hide();
	        			$('#appointmentResponse').show();
	        			$('#appointmentReferenceNo').html(stringMessage[2]);
	        			$('#modalResponse').show();
	        			//$('#form').hide();
	        		}
	        		return false;
				}
				
			},
			error : function(e) {
				$("#appointment").prop("disabled", false);
				showMessage(true, e.responseText);
			}
		});
		return false;
	}

	function resetAppointmentForm(formId){
		$('#'+formId)[0].reset();
		$("#"+formId+" #name").val('');
		$("#"+formId+" #emailId").val('');
		$("#"+formId+" #contactNo").val('');
		$("#"+formId+" #countryId").val('');
		$("#"+formId+" #stateId").val('');
		$("#"+formId+" #cityId").val('');
		$("#slotsView").html('');
	}

	function getRequestForAppointment(formId){
		var request = {};
		var authentication = {};
		var requestData = {};
		var appointmentListDTO = {};
		
		appointmentListDTO['appointmentId'] = $("#appointmentId").val();
		appointmentListDTO['name'] = $("#name").val();
		appointmentListDTO['emailId'] = $("#emailId").val();
		appointmentListDTO['contactNo'] = $("#contactNo").val();
		appointmentListDTO['countryId'] = $("#countryId").val();
		appointmentListDTO['stateId'] = $("#stateId").val();
		appointmentListDTO['cityId'] = $("#cityId").val();
		appointmentListDTO['purposeOfVisit'] = encodeURIComponent($("#purposeOfVisit").val());
		console.log("purpose of visit"+$("#purposeOfVisit").val());
		appointmentListDTO['date'] = $("#date").val();
		if($("#controlType").val()=='add'){
			appointmentListDTO['slotId'] = $("input[name='selectSlot']:checked").val();
		}
		appointmentListDTO['controlType']=$("#controlType").val();
		requestData['appointmentListDTO'] = appointmentListDTO;
		authentication['hash'] = getHash();
		authentication['userType'] = moduleId;
		request['authentication'] = authentication;
		request['requestData'] = requestData;
		return request;
	}
	
	function callForAvailableSlots(formId) {
	
		var newDate = ($('#date').val()).split('-');
		newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];
	
		$.ajax({
			type : "POST",
			url : getURLForHTML('service','get-available-meeting-slots'),
			data : "date="+newDate,
			dataType : 'html',
			cache : false,
			timeout : 600000,
			success : function(htmlContent) {
				$("#appointment").prop("disabled", false);
				if(htmlContent!=""){
	            	var stringMessage = [];
	            	stringMessage = htmlContent.split("|");
	        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
	        			showMessage(true, stringMessage[1]);
	        		} else {
	        			//showMessage(true, stringMessage[1]);
	        			$("#slotsView").html(htmlContent);
	        		}
	        		return false;
				}
				
			},
			error : function(e) {
				$("#appointment").prop("disabled", false);
				showMessage(true, e.responseText);
			}
		});
		return false;
	}	


	function appointment123(controlType, id) {
		hideMessage('');
		$("#appointmentControl").prop("disabled", true);
		$.ajax({
			type : "POST",
			url : getURLForHTML('service','appointment-modal-request'),
			data : 'controlType='+controlType+"&id="+id,
			dataType : 'html',
			cache : false,
			timeout : 600000,
			success : function(htmlContent) {
				$("#appointmentControl").prop("disabled", false);
				if(htmlContent!=""){
	            	var stringMessage = [];
	            	stringMessage = htmlContent.split("|");
	        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
	        			showMessage(true, stringMessage[1]);
	        		} else {
	        			//showMessage(true, stringMessage[1]);
	        			$('#appointmentContent').html(htmlContent);
	        			//$('#appointmentResponse').show();
	        			//$('#appointmentReferenceNo').html(stringMessage[2]);
	        			//$('#form').hide();
	        			$('#appointmentModal').modal('show');
	        		}
	        		return false;
				}
			},
			error : function(e) {
				$("#appointmentControl").prop("disabled", false);
				showMessage(true, e.responseText);
			}
		});
		return false;
	}
