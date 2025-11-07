console.log("fdsgfs");
function validateRequestForDashboardAddSChoolDetails(formId){
	if ($("#"+formId+" #countryId").val()==0 || $("#"+formId+" #countryId").val()==null) {
		showMessage(true, 'Country is Mandatory');
		return false
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
		showMessage(true, 'State is Mandatory');
		return false
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
		showMessage(true, 'City is Mandatory');
		return false
	}
	if ($("#"+formId+" #schlName").val()=='' || $("#"+formId+" #schlName").val()==null) {
		showMessage(true, 'School Name is Mandatory');
		return false
	}
	if ($("#"+formId+" #schlAdd").val()==undefined || $("#"+formId+" #schlAdd").val()=='' || $("#"+formId+" #schlAdd").val()==null) {
		showMessage(true, 'School Address is Mandatory');
		return false
	}
	
	if (!validateEmail($("#" + formId + " #schlEmail").val().trim())) {
		showMessage(false, 'Either email-id  is blank or invalid');
		return false
	}
	if ($("#" + formId + " #schlAltEmail").val().trim()!='' 
		&& !validateEmail($("#" + formId + " #schlAltEmail").val().trim())) {
		showMessage(false, 'Alternate email-id is invalid');
		return false
	}
	
	if ($("#"+formId+" #schlContactPName").val()=='' || $("#"+formId+" #schlContactPName").val()==null) {
		showMessage(true, 'School Contact Person Name is mandatory');
		return false
	}
	if ($("#"+formId+" #schlContactCode option:selected").val()=='' || $("#"+formId+" #schlContactCode option:selected").val()==null) {
		showMessage(true, 'ISD Code is mandatory');
		return false
	}
	if ($("#"+formId+" #schlContactPNumber").val()=='' || $("#"+formId+" #schlContactPNumber").val()==null) {
		showMessage(true, 'School Contact No. is mandatory');
		return false
	}
	if ($("#"+formId+" #studentCapacity").val()=='' || $("#"+formId+" #studentCapacity").val()==null) {
		showMessage(true, 'Student Capacity is mandatory');
		return false
	}
	if ($("#"+formId+" #schlDetail").val()==undefined || $("#"+formId+" #schlDetail").val()=='' || $("#"+formId+" #schlDetail").val()==null) {
		showMessage(true, 'School Details is mandatory');
		return false
	}
	if ($("#"+formId+" #schlStatus").val()=='' || $("#"+formId+" #schlStatus").val()==null) {
		showMessage(true, 'School Status is mandatory');
		return false
	}
	
	if ($("#"+formId+" #krntkaStatus").val()=='' || $("#"+formId+" #krntkaStatus").val()==null) {
		showMessage(true, 'Karnataka Status is mandatory');
		return false
	}
	
	if ($("#"+formId+" #stuPerFee9").val()=='' || $("#"+formId+" #stuPerFee9").val()==0) {
		showMessage(true, 'Grade 9th per student fee  is mandatory');
		return false
	}
	/*if(($parseInt(("#"+formId+" #stuPerDis9").val()))<($parseInt(("#"+formId+" #stuPerFee9").val()))){
		showMessage(true, 'Discount of grade 9th must be less than fee');
		return false
	}*/
	if ($("#"+formId+" #stuPerFee10").val()=='' || $("#"+formId+" #stuPerFee10").val()==0) {
		showMessage(true, 'Grade 10th per student fee  is mandatory');
		return false
	}
	if ($("#"+formId+" #stuPerFee11").val()=='' || $("#"+formId+" #stuPerFee11").val()==0) {
		showMessage(true, 'Grade 11th per student fee  is mandatory');
		return false
	}
	if ($("#"+formId+" #stuPerFee12").val()=='' || $("#"+formId+" #stuPerFee12").val()==0) {
		showMessage(true, 'Grade 12th per student fee  is mandatory');
		return false
	}
	if($("#"+formId+" #schoolId").val()=='' || $("#"+formId+" #schoolId").val()==null){
		
		/*if ($("#"+formId+" #userName").val()=='' || $("#"+formId+" #userName").val()==null) {
			showMessage(true, 'User name is mandatory');
			return false
		}*/
		if ($("#"+formId+" #password").val()=='' || $("#"+formId+" #password").val()==null) {
			showMessage(true, ' password is mandatory');
			return false
		}
		if ($("#"+formId+" #conformPassword").val()=='' || $("#"+formId+" #conformPassword").val()==null) {
			showMessage(true, 'confirm password is mandatory');
			return false
		}
		if ($("#"+formId+" #password").val() != $("#"+formId+" #conformPassword").val()) {
			showMessage(true, 'password and confirm password must be same.');
			return false
		}
	}
	
	return true;
}
function callForDashboardAddSChool(formId, moduleId) {
	hideMessage('');
	if(!validateRequestForDashboardAddSChoolDetails(formId)){
		return false;
	}
	
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','add-edit-school'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddSChool(formId, moduleId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		}else{
        			showMessage(true, stringMessage[1]);
        			resetSchoolForm(formId);
        		}
        		return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#saveSchool").prop("disabled", false);
		}
	});
}
function resetSchoolForm(formId){
	$('#'+formId)[0].reset();
	$("#"+formId+" #schlName").val('');
	$("#"+formId+" #schlAdd").val('');
	$("#"+formId+" #schlEmail").val('');
	$("#"+formId+" #schlAltEmail").val('');
	$("#"+formId+" #schlContactPName").val('');
	$("#"+formId+" #schlContactPNumber").val('');
	$("#"+formId+" #schlAltContactPNumber").val('');
	$("#"+formId+" #studentCapacity").val('');
	$("#"+formId+" #schlDetail").val('');
	$("#"+formId+" #stateId").val('');
	$("#"+formId+" #stuPerFee9").val('');
	$("#"+formId+" #stuPerDis9").val('');
	$("#"+formId+" #stuPerFee10").val('');
	$("#"+formId+" #stuPerDis10").val('');
	$("#"+formId+" #stuPerFee11").val('');
	$("#"+formId+" #stuPerDis11").val('');
	$("#"+formId+" #stuPerFee12").val('');
	$("#"+formId+" #stuPerDis12").val('');
	
	$('#fileupload1').prev('span').prev('label').removeClass('green');
	$('#fileupload1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileupload1').prev('span').html('');
	$('#fileupload2').prev('span').prev('label').removeClass('green');
	$('#fileupload2').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileupload2').prev('span').html('');
	$('#fileupload3').prev('span').prev('label').removeClass('green');
	$('#fileupload3').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileupload3').prev('span').html('');
	$('#fileupload4').prev('span').prev('label').removeClass('green');
	$('#fileupload4').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileupload4').prev('span').html('');
	$("#"+formId+" #userName").val('');
	$("#"+formId+" #stuPerRegFee9").val('');
	$("#"+formId+" #stuPerRegFee10").val('');
	$("#"+formId+" #stuPerRegFee11").val('');
	$("#"+formId+" #stuPerRegFee12").val('');
}
function getRequestForAddSChool(formId){

	var manageSchoolListDTO = {};
	manageSchoolListDTO['countryId'] = $("#"+formId+" #countryId").val();
	manageSchoolListDTO['stateId'] = $("#"+formId+" #stateId").val();
	manageSchoolListDTO['cityId'] = $("#"+formId+" #cityId").val();
	//manageSchoolListDTO['schoolName'] = $("#"+formId+" #schlDetail").val();
	if ($("#"+formId+" #schlName").val() != undefined && $("#"+formId+" #schlName").val() != '') {
		manageSchoolListDTO['schoolName'] = encodeURIComponent($("#"+formId+" #schlName").val());
	}
	if ($("#"+formId+" #schlAdd").val() != undefined && $("#"+formId+" #schlAdd").val() != '') {
		manageSchoolListDTO['schoolAddress'] = encodeURIComponent($("#"+formId+" #schlAdd").val());
	}
	manageSchoolListDTO['schoolEmail'] = $("#"+formId+" #schlEmail").val().trim();
	manageSchoolListDTO['schoolAltEmail'] = $("#"+formId+" #schlAltEmail").val().trim();
	manageSchoolListDTO['schoolContactPersonName'] = $("#"+formId+" #schlContactPName").val();
    manageSchoolListDTO['schoolISDCode'] = $("#"+formId+" #schlContactCode option:selected").val();
    manageSchoolListDTO['schoolContactNumber'] = $("#"+formId+" #schlContactPNumber").val().trim();
    manageSchoolListDTO['schoolAltISDCode'] = ($("#"+formId+" #schlAltContactCode").val()!=''?$("#"+formId+" #schlAltContactCode").val():0);
    manageSchoolListDTO['schoolAltContactNumber'] =$("#"+formId+" #schlAltContactPNumber").val().trim();
    manageSchoolListDTO['schoolStudentCapacity'] = $("#"+formId+" #studentCapacity").val();
    if ( $("#"+formId+" #schlDetail").val() != undefined &&  $("#"+formId+" #schlDetail").val() != '') {
		manageSchoolListDTO['schoolDetails'] = encodeURIComponent( $("#"+formId+" #schlDetail").val());
	}
    manageSchoolListDTO['controllType'] = $("#"+formId+" #controllType").val();
    manageSchoolListDTO['schoolStatus'] = $("#"+formId+" #schlStatus option:selected").val();
    var imageName = $("#fileupload1").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			manageSchoolListDTO['schoolImage1'] = imageName;
		}
	}
    
    var imageName = $("#fileupload2").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			manageSchoolListDTO['schoolImage2'] = imageName;
		}
	}
    
    var imageName = $("#fileupload3").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			manageSchoolListDTO['schoolImage3'] = imageName;
		}
	}
    
    var imageName = $("#fileupload4").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			manageSchoolListDTO['schoolImage4'] = imageName;
		}
	}
    manageSchoolListDTO['schoolId'] = $("#"+formId+" #schoolId").val();
    manageSchoolListDTO['krntkaStatus'] = $("#"+formId+" #krntkaStatus").val(); 
	//manageSchoolListDTO['remainingStudentCapacity'] = $("#"+formId+" #studentCapacity").val();
	//manageSchoolListDTO['schoolNotification'] = $("#"+formId+" #studentCapacity").val();
	if($("#"+formId+" #controllType").val()=='add'){
		manageSchoolListDTO['userName'] = $("#"+formId+" #userName").val().trim();
	}
	manageSchoolListDTO['password'] = ($("#"+formId+" #password").val()!=''?$("#"+formId+" #password").val():'');
	var  schooltype = $("#"+formId+" #schoolType").val();
	if(schooltype!="" && schooltype!=null){
		manageSchoolListDTO['schoolType'] = schooltype;
	}else{
		manageSchoolListDTO['schoolType'] = $("#"+formId+" #schoolType").val('0');
	}
	
	manageSchoolListDTO['studentPerFee'] = $("#"+formId+" #stuPerFee9").val();
	manageSchoolListDTO['studentDiscount'] =($("#"+formId+" #stuPerDis9").val()!=''?$("#"+formId+" #stuPerDis9").val():0);
	manageSchoolListDTO['studentTenPerFee'] = $("#"+formId+" #stuPerFee10").val();
	manageSchoolListDTO['studentTenDiscount'] = ($("#"+formId+" #stuPerDis10").val()!=''?$("#"+formId+" #stuPerDis10").val():0);
	manageSchoolListDTO['studentElePerFee'] = $("#"+formId+" #stuPerFee11").val();
	manageSchoolListDTO['studentEleDiscount'] = ($("#"+formId+" #stuPerDis11").val()!=''?$("#"+formId+" #stuPerDis11").val():0);
	manageSchoolListDTO['studentTwePerFee'] = $("#"+formId+" #stuPerFee12").val();
	manageSchoolListDTO['studentTweDiscount'] =($("#"+formId+" #stuPerDis12").val()!=''?$("#"+formId+" #stuPerDis12").val():0);
	
	manageSchoolListDTO['studentNinRegFee'] =($("#"+formId+" #stuPerRegFee9").val()!=''?$("#"+formId+" #stuPerRegFee9").val():0);
	manageSchoolListDTO['studentTenRegFee'] =($("#"+formId+" #stuPerRegFee10").val()!=''?$("#"+formId+" #stuPerRegFee10").val():0);
	manageSchoolListDTO['studentElevRegFee'] =($("#"+formId+" #stuPerRegFee11").val()!=''?$("#"+formId+" #stuPerRegFee11").val():0);
	manageSchoolListDTO['studentTweRegFee'] =($("#"+formId+" #stuPerRegFee12").val()!=''?$("#"+formId+" #stuPerRegFee12").val():0);
	
	return manageSchoolListDTO;
}


$("#tbl_gen_marks_pre tbody tr").each(function() {
	// if(i<=rowCount){
	var stuPerFee9 = 0;
	var stuPerDis9 = 0;
	
	var stuPerFee10 = 0;
	var stuPerDis10 = 0;
	
	var stuPerFee11 = 0;
	var stuPerDis11 = 0;
	
	var stuPerFee12 = 0;
	var stuPerDis12 = 0;
	
	stuPerFee9 = parseInt($(this).find("input.stuPerFee9").val());
	stuPerDis9 = parseInt($(this).find("input.stuPerDis9").val());
	
	stuPerFee10 = parseInt($(this).find("input.stuPerFee10").val());
	stuPerDis10 = parseInt($(this).find("input.stuPerDis10").val());
	
	stuPerFee11 = parseInt($(this).find("input.stuPerFee11").val());
	stuPerDis11 = parseInt($(this).find("input.stuPerDis11").val());
	
	stuPerFee12 = parseInt($(this).find("input.stuPerFee12").val());
	stuPerDis12 = parseInt($(this).find("input.stuPerDis12").val());
	
	
	$(this).removeClass('tr-red');
	
	if( parseInt(stuPerFee9) > parseInt(stuPerDis9)){
		$(this).addClass('tr-red');
		
	}

});


function callForSaveNewDateSlot() {	
	hideMessage('');
	
	if($("#slotDate").val()=='' || $("#slotDate").val()==undefined){
		showMessage(true, 'Please choose dates');
		return false;
	}
	console.log($("#slotDate").val());
	var datelist = $("#slotDate").val();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','school-enabled-date-submit-content?dateSubmit='+datelist),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
            	console.log(stringMessage);
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        			}
        		return false;
			}else{
				showMessage(true, stringMessage[1]);
				$("#slotDate").val('');
			}
		}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	
	});

}	

function submitSlot(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSubmitSlot(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','slot-submit'),
		data : JSON.stringify(getRequestForSubmitSlot(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
				$('#enabledDateModal').modal('toggle');
				setTimeout(function(){ callDashboardPageSchool('18a') }, 1000);
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitSlot(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var enabledDateDTO = {};
	enabledDateDTO['status'] = $("#"+formId+" #status").val();
	enabledDateDTO['slotId'] = $("#"+formId+" #slotId").val();
	enabledDateDTO['publish'] = $("#"+formId+" #status option:selected").val();
	enabledDateDTO['reason'] = $("#"+formId+" #txtReason").val();
	
	requestData['enabledDateDTO'] = enabledDateDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitSlot(formId,moduleId){
	return true;
}