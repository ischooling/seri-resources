console.log("test");
$(document).ready(function() {
	/*$("#inquiryOther").hide();*/
	/*$("#approveAffiliationSchool").click(function(){
		submitSchoolApprove('schoolApprovalId', 'COMMON','affiliationSchoolModal');
	});*/
	
	/*$("#approveDateVisitSchool").click(function(){
		submitSchoolVisitDateStatus('dateOfVisitApprovalId', 'dateOfvisitSchoolModal');
	});*/
	/*$("#assignRmSchool").click(function(){
		
	});*/
});
function validateRequestForSchoolApprove(formId){
	
	if ($("#"+formId+" #remarksStatus").val()==undefined || $("#"+formId+" #remarksStatus").val()==' ' || $("#"+formId+" #remarksStatus").val()==null) {
		showMessage(true, 'Remarks Status is required');
		return false
	}
	if ($("#"+formId+" #approvalRemarks").val()==undefined || $("#"+formId+" #approvalRemarks").val()=='' || $("#"+formId+" #approvalRemarks").val()==null) {
		showMessage(true, 'Remarks is required');
		return false
	}
	return true;
}

function submitSchoolApprove(formId,moduleId, modelName) {
	hideMessage('');
	if(!validateRequestForSchoolApprove(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','approve-school-request'),
		data : JSON.stringify(getRequestForAffiliationSchool(formId, moduleId)),
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
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
		
		
function getRequestForAffiliationSchool(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageSchoolListDTO = {};
	manageSchoolListDTO['schoolId'] = $("#" + formId + " #affSchoolId").val();
	manageSchoolListDTO['currentStatus'] = $("#" + formId + " #remarksStatus").val();
	 if ( $("#approvalRemarks").val() != undefined &&  $("#approvalRemarks").val() != '') {
		 manageSchoolListDTO['eremark']  = encodeURIComponent($("#approvalRemarks").val());
	 }
	requestData['manageSchoolListDTO'] = manageSchoolListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}



function submitSchoolVisitDate(slotId, dateOfVisit, userId, visitTime) {
	hideMessage('');
	if(!validateRequestForSubmitSchoolVisit(slotId, dateOfVisit, userId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-visit-request'),
		data : JSON.stringify(getRequestForSubmitSchoolVisitSlot(slotId,dateOfVisit, userId, visitTime)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				
					/*showMessage(false, data['message']);*/
				setTimeout(function(){
					callSupAdminInneraction('22c1','','');
				}, 1000);
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitSchoolVisitSlot(slotId,dateOfVisit, userId, visitTime){
	var request = {};
	var authentication = {};
	var requestData = {};
	var enabledDateDTO = {};
	enabledDateDTO['slotId'] = slotId;
	enabledDateDTO['day1'] = dateOfVisit;
	enabledDateDTO['visitTime'] = visitTime;
	requestData['enabledDateDTO'] = enabledDateDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = "SCHOOL";
	authentication['userId'] = userId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitSchoolVisit(slotId,dateOfVisit, userId){
	return true;
}


function submitSchoolVisitDateStatus(formId, moduleName) {
	hideMessage('');
	if(!validateRequestForSubmitSchoolVisitStatus(formId, moduleName)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-visit-status-request'),
		data : JSON.stringify(getRequestForSubmitSchoolVisitStatus(formId, moduleName)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				/*setTimeout(function(){
					showMessage(false, data['message']);
				}, 20000);*/
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
				$("#"+moduleName).modal("toggle");
				setTimeout(function(){
					callDashboardPageSupAdmin('2aa1');
				}, 1000);
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitSchoolVisitStatus(formId, moduleName){
	var request = {};
	var authentication = {};
	var requestData = {};
	var enabledDateDTO = {};
	enabledDateDTO['slotId'] = $("#"+formId+" #slotId").val();
	enabledDateDTO['schoolId'] = $("#"+formId+" #schoolId").val();
	enabledDateDTO['status'] = $("#" + formId + " #remarksStatus").val();
	 if ( $("#availableVisitDate").val() != undefined &&  $("#availableVisitDate").val() != '') {
		 enabledDateDTO['newSlotId'] = $("#availableVisitDate").val();
	 }
	 if ( $("#remarks").val() != undefined &&  $("#remarks").val() != '') {
		 enabledDateDTO['reason'] = encodeURIComponent($("#remarks").val());
	 }
	 if ( $("#availableVisitDateTime").val() != undefined &&  $("#availableVisitDateTime").val() != '') {
		 enabledDateDTO['visitTime'] = $("#availableVisitDateTime").val();
	 }
	 if ( $("#availableVisitRejectDate").val() != undefined &&  $("#availableVisitRejectDate").val() != '') {
		 enabledDateDTO['newRejectSlotId'] = $("#availableVisitRejectDate").val();
	 }
	 if ( $("#availableVisitRejectTime").val() != undefined &&  $("#availableVisitRejectTime").val() != '') {
		 enabledDateDTO['visitRejectTime'] = $("#availableVisitRejectTime").val();
	 }
	requestData['enabledDateDTO'] = enabledDateDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = "SCHOOL";
	authentication['userId'] = $(""+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitSchoolVisitStatus(formId, moduleName){
	if ($("#"+formId+" #remarksStatus").val()==undefined || $("#"+formId+" #remarksStatus").val()=='0' || $("#"+formId+" #remarksStatus").val()==null) {
		showMessage(true, 'Remark status is required');
		return false
	}
	if ($("#"+formId+" #remarks").val()==undefined || $("#"+formId+" #remarks").val()=='' || $("#"+formId+" #remarks").val()==null) {
		showMessage(true, 'Remarks is required');
		return false
	}
	
	return true;
}

function submitSchoolRmAssign(formId, moduleName) {
	hideMessage('');
	console.log('submitSchoolRmAssign');
	if(!validateRequestForSubmitRmAssign(formId, moduleName)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-rm-assign-request'),
		data : JSON.stringify(getRequestForSubmitSchoolRmAssign(formId, moduleName)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
				$("#"+moduleName).modal("toggle");
				setTimeout(function(){
					//callDashboardPageSupAdmin('2aa1');
				}, 1000);
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitSchoolRmAssign(formId, moduleName){
	var request = {};
	var authentication = {};
	var requestData = {};
	var enabledDateDTO = {};
	enabledDateDTO['rmId'] = $("#"+formId+" #rmid").val();
	enabledDateDTO['slotId'] = $("#"+formId+" #visitDateSlotId").val();
	enabledDateDTO['schoolId'] = $("#"+formId+" #assignSchoolId").val();
	 if ( $("#"+formId+" #assignRemarks").val()!= undefined && $("#"+formId+" #assignRemarks").val()!= '') {
		 enabledDateDTO['rmReason'] = encodeURIComponent($("#"+formId+" #assignRemarks").val());
	 }
	
	requestData['enabledDateDTO'] = enabledDateDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = "COMMON";
	authentication['userId'] = $(""+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitRmAssign(formId, moduleName){
	if ($("#"+formId+" #rmid").val()==undefined || $("#"+formId+" #rmid").val()=='0' || $("#"+formId+" #rmid").val()==null) {
		showMessage(true, 'Please select a Relationship Manager');
		return false
	}
	if ($("#"+formId+" #assignRemarks").val()==undefined || $("#"+formId+" #assignRemarks").val()=='' || $("#"+formId+" #assignRemarks").val()==null) {
		showMessage(true, 'Remarks is required');
		return false
	}
	
	return true;
}

function callForAddTravelsDetails(formId, formStatus) {
	hideMessage('');
	console.log('in');
	if(!validateRequestForAddTravel(formId, formStatus)){
		return false;
	}
	if(!validatePassengerDetails(formStatus)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-travels-details'),
		data : JSON.stringify(getRequestForAddTravelDetails(formId, formStatus)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$("#travelDetailsDataForm")[0].reset();
				$("#skipTravelDetailsDataForm")[0].reset();
				$("#travelDataModal").modal("toggle");
				setTimeout(function(){
					//callDashboardPageSupAdmin('2aa1');
				}, 1000);
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
	
}
function getRequestForAddTravelDetails(formId, formStatus){
	var request = {};
	var authentication = {};
	var requestData = {};
	var addTravelDetailsDTO = {};
	var addPassengerDetailsDTO={};


	addTravelDetailsDTO['schoolId'] = $("#"+formId+" #trvelSchoolId").val();
//	addTravelDetailsDTO['id'] = $("#studentId").val();
	if(formStatus=="skip"){
		addTravelDetailsDTO['schoolId'] = $("#"+formId+" #trvelSchoolIds").val();
		addTravelDetailsDTO['dateSlotId'] = $("#"+formId+" #trvelSlotIds").val();
		addTravelDetailsDTO['skipTravelDetails'] = formStatus;
		addTravelDetailsDTO['offlineFee'] = $("#"+formId+" #txtVisitFees").val();
		addTravelDetailsDTO['refNumber'] = $("#"+formId+" #referenceNo").val();
		addTravelDetailsDTO['offlineComments'] = encodeURIComponent($("#"+formId+" #commts").val());
		addTravelDetailsDTO['userId'] = $("#"+formId+" #skipUserId").val();
	}else{
		addTravelDetailsDTO['userId'] = $("#"+formId+" #userId").val();
		addTravelDetailsDTO['dateSlotId'] = $("#"+formId+" #trvelSlotId").val();
		addTravelDetailsDTO['source'] = encodeURIComponent($("#"+formId+" #source").val());
		addTravelDetailsDTO['skipTravelDetails'] = formStatus;
		addTravelDetailsDTO['destination'] = encodeURIComponent($("#"+formId+" #destination").val());
		addTravelDetailsDTO['dateOfbook'] = $("#"+formId+" #dateOfBooking").val();
		addTravelDetailsDTO['dateOfReturn'] = $("#"+formId+" #dateOfReturn").val();
		addTravelDetailsDTO['noOfPassenger'] = $("#"+formId+" #noOfPassenger option:selected").val();
		addTravelDetailsDTO['visitFee'] = $("#"+formId+" #txtVisitFee").val();
		addTravelDetailsDTO['hotelName'] = encodeURIComponent($("#"+formId+" #hotelName").val());
		addTravelDetailsDTO['comments'] = encodeURIComponent($("#"+formId+" #comments").val());
		/*addTravelDetailsDTO['docsUploads'] = $("#fileupload1").parents(".file-tab").find("span.fileName").text();*/

		addPassengerDetailsDTO['addPassengerDetailsDTO'] = savePassengerDetails();
		addTravelDetailsDTO['passengerDetails'] = JSON.stringify(addPassengerDetailsDTO);
	}
	requestData['addTravelDetailsDTO'] = addTravelDetailsDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = 'SCHOOL';
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForAddTravel(formId, formStatus){
	if(formStatus=="skip"){
		if($("#"+formId+" #txtVisitFees").val()=='' || $("#"+formId+" #txtVisitFees").val()==null) {
			showMessage(false,'Visit Fee is required');
			return false
		}
		if($("#"+formId+" #commts").val()=='' || $("#"+formId+" #commts").val()==null) {
			showMessage(false,'Comments is required');
			return false
		}
		if($("#"+formId+" #referenceNo").val()=='' || $("#"+formId+" #referenceNo").val()==null) {
			showMessage(false,'Reference number is required');
			return false
		}
	}else{
		
	if ($("#"+formId+" #source").val()=='' || $("#"+formId+" #source").val()==null) {
		showMessage(false, 'Source is required');
		return false
	}
	if ($("#"+formId+" #destination").val()=='' || $("#"+formId+" #destination").val()==null) {
		showMessage(false, 'Destination is required');
		return false
	}
	if ($("#"+formId+" #dateOfBooking").val()=='' || $("#"+formId+" #dateOfBooking").val()==null) {
		showMessage(false, 'Date of Travel is required');
		return false
	}
	if ($("#"+formId+" #dateOfReturn").val()=='' || $("#"+formId+" #dateOfReturn").val()==null) {
		showMessage(false, 'Date of Return is required');
		return false
	}
	var dateOfBooking=new Date($('#dateOfBooking').val()).getTime();
	var dateOfReturn=new Date($('#dateOfReturn').val()).getTime();

	if (dateOfReturn < dateOfBooking){
		showMessage(false, 'Date of Travel should be greater than Date of Return.');
		return false
		}
	}
	
	if ($("#"+formId+" #noOfPassenger").val()=='0' || $("#"+formId+" #noOfPassenger").val()==null) {
		showMessage(false, 'No of Passanger is required');
		return false
	}
	if ($("#"+formId+" #hotelName").val()=='' || $("#"+formId+" #hotelName").val()==null) {
		showMessage(false, 'Hotel Name is required');
		return false
	}
	
	if($("#"+formId+" #comments").val()=='' || $("#"+formId+" #comments").val()==null) {
		showMessage(false,'Comments is required');
		return false
	}
	return true;
}
function savePassengerDetails(){
	//var passengerDTO = [];
	var addPassengerDetailsDTO=[];
	
	$("#tbl_save_passenger_details tbody tr").each(function() {
		var saveDetails={};
		if(encodeURIComponent($(this).find("input.name").val())!='' && encodeURIComponent($(this).find("input.name").val())!=undefined
				&& encodeURIComponent($(this).find("input.name").val())!="undefined"){
			saveDetails['name']=$(this).find("input.name").val();
			saveDetails['gender']=$(this).find("select.gender option:selected").val();
			saveDetails['age']=$(this).find("input.age").val();
			saveDetails['email']=$(this).find("input.email").val();
			saveDetails['isdCode']=$(this).find("select.isdCode option:selected").attr('dailCode');
			saveDetails['phone']=$(this).find("input.phone").val();
			saveDetails['passport']=$(this).find("input.passport").val();
		}
		addPassengerDetailsDTO.push(saveDetails);
	});
	console.log(addPassengerDetailsDTO.length);
	return addPassengerDetailsDTO;
}
function validatePassengerDetails(formStatus){
	var status=false;
	var count=0;
	console.log('count: '+count);
	var passports=[];
	var isPassportExist=0;
	if(formStatus=="skip"){
		return true;
	}
	$("#tbl_save_passenger_details tbody tr").each(function() {
		if($(this).find("input.name").val()!='' || $(this).find("select.gender").val()!='0' || $(this).find("input.age").val()!=0  
			|| $(this).find("input.email").val()!='' || $(this).find("input.passport").val()!='' || ($(this).find("select.isdCode").val()!='0' && $(this).find("input.phone").val()=='' )){
			status=false;
			if($(this).find("input.name").val()==''){
				showMessage(true, 'Name is required');
				return false;
			}
			if($(this).find("select.gender").val()=='0'){
				showMessage(true, 'Gender is required');
				return false;
			}
			if($(this).find("input.age").val()==0){
				showMessage(true, 'Age is required');
				return false;
			}
			if($(this).find("input.email").val()==''){
				showMessage(true, 'Email is required');
				return false;
			}
			if($(this).find("select.isdCode").val()=='0' && $(this).find("input.phone").val()!='' ){
				showMessage(true, 'ISD code is required');
				return false;
			}
			if($(this).find("select.isdCode").val()!='0' && $(this).find("input.phone").val()=='' ){
				showMessage(true, 'phone no is required');
				return false;
			}
			/*if($(this).find("input.phone").val()=='' ){
				showMessage(true, 'Phone no is required');
				return status;
			}*/
			if($(this).find("input.email").val()!=''){
				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if(!regex.test($(this).find("input.email").val())){
					showMessage(true, 'Email is not valid');
					return false;
				}
			}
			if($(this).find("input.passport").val()==''){
				showMessage(true, 'Passport is required');
				return false;
			}
			
			
			var currentPassport = ($(this).find("input.passport").val()).toUpperCase();
			var p = passports.push(currentPassport);
			
			count=count+1;
			status=true;
			console.log('count: '+count);
		}else{
			if(count==0){
				showMessage(true, 'Passengers Details are required');
				status=false;
				return status;
			}else{
				status=true;
				return status;
			}
		}
		//status=true;
	});
	var recipientsArray = passports.sort(); 
	var countx =0;
	var passportDuplicate = []; 
	var duplicate ="";
	for (var i = 0; i < recipientsArray.length - 1; i++) 
	{
		if (recipientsArray[i + 1] == recipientsArray[i]) 
	{ 
			countx = countx+1;
			//passportDuplicate.push(recipientsArray[i]); 
			duplicate	= duplicate + recipientsArray[i] +', ';
			} 
		}
	if(countx>0){
		showMessage(true, 'Passport numbers cannot be same ');
		return false;
	}
	
	
	if($('#noOfPassenger').val()!=count && status){
		showMessage(true, 'Please enter passenger details equivalent to number of passengers.');
		status=false;
		//return status;
	}
	return status;
}



function onClickTravelDetails(schoolId, slotId, status) {
	//hideMessage('');
	var data = 'schoolId='+schoolId+'&skipStatus='+status;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','school-travel-details'),
		data : data,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			console.log('htmlContent '+htmlContent)
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				//showMessage(true, stringMessage[1]);
        			}
        		}else{
        			if(status=="Y"){
        				$('#skipTravelDetailsDiv').html(htmlContent);
        			}else{
        				$('#travelDetailsDiv').html(htmlContent);
        			}
        			$('#travelDataModal').modal('toggle');
        			$('#travelDetailsDataForm #trvelSchoolId').val(schoolId);
        			$('#travelDetailsDataForm #trvelSlotId').val(slotId);
        			$('#skipTravelDetailsDataForm #trvelSchoolIds').val(schoolId);
        			$('#skipTravelDetailsDataForm #trvelSlotIds').val(slotId);
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

function onClickAffiliationForm(formId, moduleId, status, controllType) {
	hideMessage('');
	if(!validateRequestForAffiliationRemark(formId)){
		return false;
	}
	console.log("test");
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','previously-submitted-form-content'),
		data : JSON.stringify(getRequestForAffiliationRemarks(formId, status)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#reportsubmittedModal').modal('hide');
				if(controllType=='submittedForm'){
					setTimeout(function(){ callDashboardPageSupAdmin('23b','',''); }, 2000);
				}else if(controllType=='prevSubmittedForm'){
					setTimeout(function(){ callDashboardPageSupAdmin('23e','',''); }, 2000);
				}else if(controllType=='pendingReport'){
					setTimeout(function(){ callDashboardPageSupAdmin('23d','',''); }, 2000);
				}else if(controllType=='previousSubmitList'){
					setTimeout(function(){ callDashboardPageSupAdmin('23e','',''); }, 2000);
				}
				
			}
			//$("#nextStep").prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForAffiliationRemarks(formId, status){
	var affiliationRemarkDTO = {};
	var request = {};
	var requestData = {};
	if(editor1!=undefined){
		affiliationRemarkDTO['remarks']=editor1.getData().replace(/'/g, '&#39;')
	}
	var checkApprove = "false";
	if($("#approve").is(":checked")){
		checkApprove = "true";
	}
	
	var checkRejected = "false";
	if($("#reject").is(":checked")){
		checkRejected = "true";
	}
	
	affiliationRemarkDTO['approve'] = checkApprove;
	affiliationRemarkDTO['reject'] = checkRejected;
	affiliationRemarkDTO['status'] = status;
	affiliationRemarkDTO['schoolId'] = $("#"+formId+" #schoolId").val();
	requestData['affiliationRemarkDTO'] = affiliationRemarkDTO;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForAffiliationRemark(formId){
	var approval = "false";
	if($("#approve").is(":checked")){ 
		approval = "true";
	}
	var rejected = "false";
	if($("#reject").is(":checked")){ 
		rejected = "true";
	}
	
	if(approval=="false" && rejected=="false"){
		showMessage(true, 'Please check "Approve And Reject?"');
		return false
	}
	
	
/*	var chkArray = [];
	var selected;
	if ($("#"+formId+" #firstName").val()=="") {
		showMessage(true, 'FIRST NAME IS REQUIRED');
		return false
	}
	if ($("#"+formId+" #lastName").val()=="") {
		showMessage(true, 'LAST NAME IS REQUIRED');
		return false
	}
	if ($("#"+formId+" #email").val().trim()=="" && !validateEmail($("#" + formId + " #email").val().trim())) {
		showMessage(true, 'PLEASE ENTER EMAIL ID');
		return false
	}
	if ($("#"+formId+" #userType").val()==null || $("#"+formId+" #userType").val()=="0") {
		showMessage(true, 'PLEASE CHOOSE USER TYPE');
		return false
	}
	if ($("#"+formId+" #status").val()==null || $("#"+formId+" #status").val()=="0" ) {
		showMessage(true, 'PLEASE CHOOSE STATUS');
		return false
	}
	if ($("#"+formId+" #password").val()=="" ) {
		showMessage(true, 'PLEASE ENTER PASSWORD');
		return false
	}
	if ($("#"+formId+" #confirmPassword").val()=="" ) {
		showMessage(true, 'PLEASE ENTER CONFIRM PASSWORD');
		return false
	}
	if ($("#"+formId+" #password").val() != $("#"+formId+" #confirmPassword").val()) {
		showMessage(true, 'password and confirm password must be same.');
		return false
	}
	if ($("#"+formId+" #confirmPassword").val()=="" ) {
		showMessage(true, 'PLEASE ENTER CONFIRM PASSWORD');
		return false
	}
	$(".form-check-input:checked").each(function() {
		chkArray.push($(this).val());
	});
	if(chkArray.length == 0){
		showMessage(true, 'PLEASE SELECT ATLEAST ONE USER PERMISSION');
		return false
	}*/
	return true;
}


function getPaymentUrl(formId) {
	var schoolId;
	var entityName;
	if(formId=="affiliationformPayment"){
		 schoolId= $("#"+formId+" #schoolId").val();
		 entityName = $("#"+formId+" #entityName").val();
	}else if(formId=="schoolPaymentResponse"){
		 schoolId= $("#"+formId+" #schoolIds").val();
		 entityName = "School";
	}
	$.ajax({
		dataType : 'json',
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','get-payment-url'),
		data : JSON.stringify(getAffiliationPaymentDetails(formId, schoolId, entityName)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			console.log('data '+data);
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
//				showMessage(false, data['message']);
				$('#affiliationformPayment').attr('action', data.endpointUrl+'/transaction.do?command=initiateTransaction');
				$('#encRequest').val(data.encRequest);
				$('#access_code').val(data.accessCode);
				$('#affiliationformPayment').submit();
				$('#schoolPaymentResponse').submit();
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getAffiliationPaymentDetails(formId, schoolId, entityName){
	var request = {};
	var requestData = {};
	requestData['role'] = entityName;
	requestData['schoolId'] = schoolId;
	request['requestData'] = requestData;
	return request;
}


function submitSchoolInspection(formId,moduleId, modelName) {
	hideMessage('');
	if(!validateRequestForSchoolInspection(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-readiness-approve'),
		data : JSON.stringify(getRequestForAffiliationSchoolInspection(formId, moduleId)),
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
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

		
function getRequestForAffiliationSchoolInspection(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageSchoolListDTO = {};
	manageSchoolListDTO['schoolId'] = $("#" + formId + " #schoolIds").val();
	manageSchoolListDTO['currentStatus'] = $("#" + formId + " #remarksAudit").val();
	 if ( $("#schoolAuditRemarks").val() != undefined &&  $("#schoolAuditRemarks").val() != '') {
		 manageSchoolListDTO['eremark']  = encodeURIComponent($("#schoolAuditRemarks").val());
	 }
	requestData['manageSchoolListDTO'] = manageSchoolListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSchoolInspection(formId){
	
	if ($("#"+formId+" #remarksAudit").val()==undefined || $("#"+formId+" #remarksAudit").val()=='' || $("#"+formId+" #remarksAudit").val()==null) {
		showMessage(true, 'Remarks Status is required');
		return false
	}
	if ($("#"+formId+" #schoolAuditRemarks").val()==undefined || $("#"+formId+" #schoolAuditRemarks").val()=='' || $("#"+formId+" #schoolAuditRemarks").val()==null) {
		showMessage(true, 'Remarks is required');
		return false
	}
	return true;
}



function submitOfflineSchoolForm(formId,moduleId, modelName) {
	hideMessage('');
	if(!validateRequestForOfflineSchoolForm(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-application-approve'),
		data : JSON.stringify(getRequestForOfflineSchoolForm(formId, moduleId)),
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
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
		
		
function getRequestForOfflineSchoolForm(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageSchoolListDTO = {};
	manageSchoolListDTO['schoolId'] = $("#" + formId + " #appFormSchoolId").val();
	manageSchoolListDTO['currentStatus'] = $("#" + formId + " #appFormStatus").val();
	 if ( $("#appformRemarks").val() != undefined &&  $("#appformRemarks").val() != '') {
		 manageSchoolListDTO['eremark']  = encodeURIComponent($("#appformRemarks").val());
	 }
	manageSchoolListDTO['appFeePaidDate'] = $("#" + formId + " #appFeeDate").val();
	manageSchoolListDTO['applicationFormFee'] = $("#" + formId + " #applicationFee").val();
	/*manageSchoolListDTO['appValidateStartDate'] = $("#" + formId + " #appStartDate").val();
	manageSchoolListDTO['appValidateEndDate'] = $("#" + formId + " #appEndDate").val();*/
	requestData['manageSchoolListDTO'] = manageSchoolListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForOfflineSchoolForm(formId){
	
	if ($("#"+formId+" #appFormStatus").val()==undefined || $("#"+formId+" #appFormStatus").val()=='' || $("#"+formId+" #appFormStatus").val()==null) {
		showMessage(true, 'Remarks Status is required');
		return false
	}
	if ($("#"+formId+" #appformRemarks").val()==undefined || $("#"+formId+" #appformRemarks").val()=='' || $("#"+formId+" #appformRemarks").val()==null) {
		showMessage(true, 'Remarks is required');
		return false
	}
	if ($("#"+formId+" #appFeeDate").val()==undefined || $("#"+formId+" #appFeeDate").val()=='' || $("#"+formId+" #appFeeDate").val()==null) {
		showMessage(true, 'Fee Date is required');
		return false
	}
	return true;
}

function onClickReadinessReview(formId, moduleId, msg, id) {
	hideMessage('');
	if(!validateRequestForReadinessReviewRemark(formId)){
		return false;
	}
	console.log("test");
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-audit-approve'),
		data : JSON.stringify(getRequestForReadinessReviewRemarks(formId, id)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			$('#warningMessageId').modal('hide');
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				setTimeout(function(){ callDashboardPageSupAdmin('2aa','dashboardContentInHTML','?moduleId=school&controllType=affschoollist&currentStatus=');}, 2000);
				$("#"+formId+" #approve").prop('checked',false);
				$("#"+formId+" #reject").prop('checked',false);
				$("#"+formId+" #readinessTxtEditor").val('');
			}
			$("#save").prop("disabled", true);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForReadinessReviewRemarks(formId, id){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageSchoolListDTO = {};
	manageSchoolListDTO['schoolId'] = id;
	if(editor1!=undefined){
		manageSchoolListDTO['readinessRemark']=editor1.getData().replace(/'/g, '&#39;')
	}
	var checkApprove = "false";
	if($("#approve").is(":checked")){
		checkApprove = "true";
	}
	
	var checkRejected = "false";
	if($("#reject").is(":checked")){
		checkRejected = "true";
	}
	
	manageSchoolListDTO['approve'] = checkApprove;
	manageSchoolListDTO['reject'] = checkRejected;
	requestData['manageSchoolListDTO'] = manageSchoolListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForReadinessReviewRemark(formId){
	var approval = "false";
	if($("#approve").is(":checked")){ 
		approval = "true";
	}
	var rejected = "false";
	if($("#reject").is(":checked")){ 
		rejected = "true";
	}
	
	if(approval=="false" && rejected=="false"){
		showMessage(true, 'Please check "Approve And Reject?"');
		return false
	}
	return true;
}

function auditFormWarning(formId, moduleId, msg, id){
	if(!validateRequestForReadinessReviewRemark(formId)){
		return false;
	}
	var warningYes = "onClickReadinessReview('"+formId+"','"+moduleId+"','"+msg+"','"+id+"')";  
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text(msg);
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}

