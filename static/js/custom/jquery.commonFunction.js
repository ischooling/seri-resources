let editor1;
let editor2;
let editor3;
let editor4;
function redirectLoginPage(){
	window.setTimeout(function(){window.location = CONTEXT_PATH+"common/login";},1000)
}
function cloaseOff() {
	console.log('cloaseOff openMode :: '+openMode);
//	if(PROFILE_NAME!='dev'){
		if(openMode!='new' ){
//			jQuery.ajax({
//				type:'get',
//				url: window.location = CONTEXT_PATH+"common/logout",
//				success:function(htmlContent){
//				},
//				error:function(data){
//				}
//			});
		}
//		if(param>0){
//			openMode='';
//		}
		return false;
//	}
}

$(document).ready(function() {
	window.oncontextmenu = function () {
		if(PROFILE_NAME=='dev'){
			return true;
		}else{
			return false;
		}
    }
//    $(document).keydown(function (event) {
//        if (event.keyCode == 123) {
//            return false;
//        }
//        else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
//            return false;
//        }
//    });
	document.onkeypress = function(event) {
		event = (event || window.event);
		if (event.keyCode == 123) {
			// alert('No F-12');
			return false;
		}
	}
	document.onmousedown = function(event) {
		event = (event || window.event);
		if (event.keyCode == 123) {
			// alert('No F-keys');
			return false;
		}
	}
	document.onkeydown = function(event) {
		event = (event || window.event);
		if (event.keyCode == 123) {
			// alert('No F-keys');
			return false;
		}
	}
	$("#profileMod").on("click", function(){
		$("#profileModel").modal('toggle');
	});
	$("#changePasswordMod").on("click", function(){
		$("#passwordModel").modal('toggle');
	});
	
	$("#changePasswordMods").on("click", function(){
		$("#passwordModel").modal('toggle');
	});
	
});
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

function goAheadGet(url, hash, role) {
	var form = $('<form action="' + url + '" method="GET">'
			+ '<input type="hidden" name="hash" id="hash" value="' + hash + '" />' 
			+ '</form>');
	$('body').append(form);
	$(form).submit();
	if(USER_ROLE==5){
	}else{
		document.open(url, 'SERI', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no','_blank');
	}
}
function goAhead(url, hash, role) {
	if(role==''){
		var form = $('<form action="' + url + '" method="POST">'
				+ '<input type="hidden" name="hash" id="hash" value="' + hash + '" />' 
				+ '</form>');
		$('body').append(form);
		$(form).submit();
	}else{
		//document.open(url, 'SERI', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no','_blank');
		var location=self.location.href;
		window.close();
		window.open(location, '_blank',  'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no');
//		window.moveTo(0,0);
//		window.resizeTo(screen.width,screen.height-100);
	}
	
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
				 if(formId=='addSchool'){
					$('#'+formId+' #countryId').val();
				}else if(formId=='addStudent'){
					$('#'+formId+' #contactCode').val($('#'+formId+' #countryId option:selected').attr('dailCode'));;
					
				}else if(formId=='preStudentAdd'){
					$('#'+formId+' #contactCode').val($('#'+formId+' #countryId option:selected').attr('dailCode'));;
					
				}else if(formId=='duplicate'){
					$('#'+formId+' #isdCode').val($('#'+formId+' #countryId option:selected').attr('dailCode'));;
					
				}/*else if(formId=='travelDetailsDataForm'){
					$('#'+formId+' #isdCode').val($('#'+formId+' #countryId option:selected').attr('dailCode'));;
					
				}*/
				 
			}
			$("#stateId").prop("disabled", false);
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#stateId").prop("disabled", false);
		}
	});
}

//function getJSONRequest(formId, isMulitSelect) {
//	$(".disabledFields").each(function(){
//		$(this).removeAttr('disabled');
//	});
//	var serializedString = $('#' + formId).serialize();
//	$(".disabledFields").each(function(){
//		$(this).attr('disabled','disabled');
//	});
//	serializedString = serializedString.replace(/\+/g, '%20');
//	var formFieldArray = serializedString.split("&");
//	var requestObj = {};
//	$.each(formFieldArray, function(i, pair) {
//		var nameValue = pair.split("=");
//		if(nameValue[1]!=''){
//			var name = decodeURIComponent(nameValue[0]);
//			var value = decodeURIComponent(nameValue[1]);
//			requestObj[name] = value;
//		}
//	});
//	if(isMulitSelect!=undefined){
//		var name = decodeURIComponent("teacherSubjectIds");
//		if($('#teacherSubjectIds').val()!='null' && $('#teacherSubjectIds').val()!=null && $('#teacherSubjectIds').val()!=''){
//			var value = decodeURIComponent($('#teacherSubjectIds').val());
//		}
//		requestObj[name] = value;
//	}
//	return requestObj;
//}
//function callSubjectsByGradeId(formId, value, elementId, toElementId, requestExtra) {
//	hideMessage('');
//	if (!validateRequestForMasterGrade(formId, elementId)) {
//		$("#"+formId+" #"+elementId).val(0);
//		resetDropdown($("#"+formId+" #"+elementId), 'Select subject');
//		return false;
//	}
//	$("#"+formId+" #pastTaughtSubjectId").prop("disabled", true);
//	resetDropdown($("#"+formId+" #"+toElementId), 'Select subject');
//	$.ajax({
//		type : "POST",
//		contentType : "application/json",
//		url : getURLForCommon('masters'),
//		data : JSON.stringify(getRequestForMaster(formId, 'SUBJECT-LIST-BY-GRADE', value, requestExtra)),
//		dataType : 'json',
//		cache : false,
//		timeout : 600000,
//		success : function(data) {
//			if (data['status'] == '0' || data['status'] == '2') {
//				showMessage(true, data['message']);
//			} else {
//				buildDropdown(data['mastersData']['subject'], $("#"+formId+" #"+toElementId), 'Select subject');
//				$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
//			}
//			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
//		},
//		error : function(e) {
//			showMessage(true, e.responseText);
//			$("#"+formId+" #pastTaughtSubjectId").prop("disabled", false);
//		}
//	});
//}

//function validateRequestForMasterGrade(formId, elementId) {
//	if($('#'+formId+ ' #'+elementId).val()=='' || $('#'+formId+ ' #'+elementId).val()<=0){
//		return false;
//	}
//	return true;
//}

function callConsultants(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #consultantId").val(0);
		resetDropdown($("#"+formId+" #consultantId"), 'Select consultant');
		return false;
	}
	$("#"+formId+" #consultantId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'CONSULTANT-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				buildDropdown(data['mastersData']['consultants'], $("#"+formId+" #consultantId"), 'Select consultant');
			}
			$("#"+formId+" #consultantId").prop("disabled", false);
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#"+formId+" #consultantId").prop("disabled", false);
		}
	});
}

//function callSubjects(formId, value, elementId) {
//	hideMessage('');
//	if (!validateRequestForMaster(formId, elementId)) {
//		$("#"+formId+" #subjectId").val(0);
//		resetDropdown($("#"+formId+" #subjectId"), 'Select subject');
//		return false;
//	}
//	$("#"+formId+" #subjectId").prop("disabled", true);
//	$.ajax({
//		type : "POST",
//		contentType : "application/json",
//		url : getURLForCommon('masters'),
//		data : JSON.stringify(getRequestForMaster('formId', 'SUBJECT-LIST-BY-GRADE', value)),
//		dataType : 'json',
//		cache : false,
//		timeout : 600000,
//		success : function(data) {
//			if (data['status'] == '0' || data['status'] == '2') {
//				showMessage(true, data['message']);
//			} else {
//				buildDropdown(data['mastersData']['data'], $('#subjectId'), 'Select Subject');
//			}
//			$("#subjectId").prop("disabled", false);
//			return false;
//		},
//		error : function(e) {
//			showMessage(true, e.responseText);
//			$("#subjectId").prop("disabled", false);
//		}
//	});
//}

function callBankStates(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #bankStateId").val(0);
		resetDropdown($("#"+formId+" #bankStateId"), 'Select state');
		return false;
	}
	//$("#bankStateId").prop("disabled", true);
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
				buildDropdown(data['mastersData']['data'], $('#bankStateId'), 'Select state');
				$("#bankStateId").val($("#bankState").val());
				 if(formId=='addSchool'){
					$('#'+formId+' #countryId').val();
				}
			}
			//$("#bankStateId").prop("disabled", false);
		},
		error : function(e) {
			showMessage(true, e.responseText);
			//$("#bankStateId").prop("disabled", false);
		}
	});
}

function callCounselor(formId, value, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #counselorName").val("");
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster(formId, 'COUNSELOR-LIST', value)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$("#"+formId+" #counselorName").text(data['mastersData']['counselor']["value"]+' ('+data['mastersData']['counselor']["extra"]+')');
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}

function callForResetPassword(formId, moduleId) {
	hideMessage('');
	
	if($('#newPassword').val()=='' && $('#confirmPassword').val()==''){
		showMessage(true, "Fields are not valid");
		return false;
	}else if($('#newPassword').val() != $('#confirmPassword').val()){
		showMessage(true, "New Password and Confirm Password does not match.");
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('reset-password'),
		data : JSON.stringify(getRequestForReset(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
				
			} else {
				showMessage(true, data['message']);
				$('#'+formId)[0].reset();
				$('#passwordModel').modal('toggle');
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}

function getRequestForReset(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var changePasswordDTO = {};
	changePasswordDTO['password'] = $("#" + formId + " #newPassword").val();
	changePasswordDTO['confirmPassword'] = $("#" + formId + " #confirmPassword").val();
	requestData['changePasswordDTO'] = changePasswordDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#" + formId + " #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}


function submitUserDetails(formId,moduleId) {
	console.log("test");
	hideMessage('');
	if(!validateRequestForUserDetails(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('common','update-profile'),
		data : JSON.stringify(getRequestForUserDetails(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
				$('#profileModel').modal('toggle');
				location.reload();
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForUserDetails(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var userDTO = {};
	userDTO['name'] = $("#"+formId+" #fname").val();
	userDTO['lastName'] = $("#"+formId+" #lname").val();
	userDTO['emailId'] = $("#"+formId+" #email").val();
	userDTO['dob'] =$("#dobUser").val();
	
	requestData['userDTO'] = userDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	
	return request;
}

function validateRequestForUserDetails(formId,moduleId){
	return true;
}

function submitSessionDetails(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSessionDetails(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','session-submit-content'),
		data : JSON.stringify(getRequestForSessionDetails(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				//$('#'+formId)[0].reset();
				
				resetSessionForm(formId);
				$('#sessionModal').modal('toggle');
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}


function resetSessionForm(formId){
	$('#'+formId)[0].reset();
	$("#"+formId+" #yearDisplay").val(0);
	$("#"+formId+" #months").val(0);
	$("#"+formId+" #status").val(0);
	$("#"+formId+" #allowAdmissionStatus").val(0);
	$("#"+formId+" #applicationStatus").val(0);
	$("#"+formId+" #verificationStatus").val(0);
	$("#"+formId+" #resultStatus").val(0);
	$("#"+formId+" #resultStart").val('');
	$("#"+formId+" #resultEnd").val('');
	$("#"+formId+" #resultStartTime").val(0);
	$("#"+formId+" #resultEndTime").val(0);
	$("#"+formId+" #minSubject").val('5');
	$("#"+formId+" #maxSubject").val('5');
}


function getRequestForSessionDetails(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageSessionDTO = {};
	manageSessionDTO['sessionId'] = $("#"+formId+" #sessionId").val();
	var year = $("#"+formId+" #yearDisplay option:selected").val();
	var month = $("#"+formId+" #months option:selected").text();
	var months = $("#"+formId+" #months option:selected").val();
	
	var resultSDate= $("#"+formId+" #resultStart").val();
	var resultStT1=$("#"+formId+" #resultStartTime option:selected").val();
	var resultStT2=$("#"+formId+" #resultStartTime option:selected").text();
	
	var resultEDate= $("#"+formId+" #resultEnd").val();
	var resultEtT1=$("#"+formId+" #resultEndTime option:selected").val();
	var resultEtT2=$("#"+formId+" #resultEndTime option:selected").text();

	
	manageSessionDTO['sessionDisplay'] = year+'-'+month;
	manageSessionDTO['sessionName'] = year+'-'+months;
	manageSessionDTO['sessionStatus'] = $("#"+formId+" #status").val();
	manageSessionDTO['allowAdmissionStatus'] = $("#"+formId+" #allowAdmissionStatus option:selected").val();
	manageSessionDTO['applicationStatus'] = $("#"+formId+" #applicationStatus option:selected").val();
	manageSessionDTO['verificationStatus'] = $("#"+formId+" #verificationStatus option:selected").val();
	manageSessionDTO['resultStatus'] = $("#"+formId+" #resultStatus option:selected").val();
	
	manageSessionDTO['resultStartDate'] = resultSDate+' '+resultStT2+':00';
	manageSessionDTO['resultStartTime'] =$("#"+formId+" #resultStartTime option:selected").val();
	
	manageSessionDTO['resultEndDate'] = resultEDate+' '+resultEtT2+':00';
	manageSessionDTO['resultEndTime'] =$("#"+formId+" #resultEndTime option:selected").val();
	
	manageSessionDTO['minSubject'] =$("#"+formId+" #minSubject").val();
	manageSessionDTO['maxSubject'] =$("#"+formId+" #maxSubject").val();
	manageSessionDTO['passingPercentage'] =$("#"+formId+" #passingPercentage").val();

	requestData['manageSessionDTO'] = manageSessionDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSessionDetails(formId,moduleId){
	if ($("#yearDisplay").val()==null || $("#yearDisplay option:selected").val()==0 ) {
		showMessage(true, 'Please Select Year is Mandatory');
		return false
	}
	if ($("#months").val()==null || $("#months option:selected").val()==0 ) {
		showMessage(true, 'Please Select Month is Mandatory');
		return false
	}
	if ($("#status").val()=='' || $("#status").val()==null) {
		showMessage(true, 'Please Select Status is Mandatory');
		return false
	}
	if ($("#allowAdmissionStatus").val()=='' || $("#allowAdmissionStatus").val()==null) {
		showMessage(true, 'Please Select Status is Mandatory');
		return false
	}
	if ($("#applicationStatus").val()=='' || $("#applicationStatus").val()==null) {
		showMessage(true, 'Please Select Status is Mandatory');
		return false
	}
	if ($("#verificationStatus").val()=='' || $("#verificationStatus").val()==null) {
		showMessage(true, 'Please Select Status is Mandatory');
		return false
	}
	if ($("#resultStatus").val()=='' || $("#resultStatus").val()==null) {
		showMessage(true, 'Please Select Status is Mandatory');
		return false
	}
	
	if($("#resultStatus").val()!=0){
		
		var date1 = $("#resultStart").val();
		var newDate1 = date1.split('-');
		var resultSDate=(newDate1[2]+','+newDate1[1]+','+newDate1[0]);
		if(date1==null || date1==""){
				showMessage(true, 'Please Select Result Start Date is Mandatory');
				return false
			}
		var resultSTime=parseInt($("#"+formId+" #resultStartTime option:selected").val());
			if(resultSTime==null || resultSTime==0){
				showMessage(true, 'Result  Start time is Mandatory');
				return false
			}	
		
		var date2 = $("#resultEnd").val();
		var newDate2 = date2.split('-');
		var resultEDate=(newDate2[2]+','+newDate2[1]+','+newDate2[0]);
			if(date2==null || date2==""){
				showMessage(true, 'Please Select Result End Date is Mandatory');
				return false
			}
			if(resultSDate > resultEDate){
				showMessage(true, 'Result End Date  is always after Result Start Date');
				return false
			}
		var resultETime=parseInt($("#"+formId+" #resultEndTime option:selected").val());
			if(resultETime==null || resultETime==0){
				showMessage(true, 'Result  End time is Mandatory');
				return false
			}	
			if(resultSDate==resultEDate){
				if(resultSTime>=resultETime){
					showMessage(true, 'Please Select Result End Time  after Result Start Time');
					return false
				}
			}
		}
	return true;
}

function tabActiveStatus(tabPosition){
	console.log('called '+tabPosition);
	processPage=tabPosition;
	$('#tabPosition'+processPage).trigger('click');
}

function setPagePosition(position){
	processPage=position;
}
function increasePosition(){
	processPage = signupPage+1;
}

function decreasePosition(processPage){
	$('#tabPosition'+processPage).trigger('click');
}




function submitInfoDetails(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForInfoDetails(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','information-submit-content'),
		data : JSON.stringify(getRequestForInfoDetails(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				resetInfoForm(formId);
                 $("#notifiRead").text(data["notificationStatus"]);
                 if(parseInt(data["notificationStatus"])>0){
                	 $("#blinkingBell .fa-bell").addClass("blinking");
                 }
				$('#infoModal').modal('hide');
				window.setTimeout(function(){callDashboardPageSupAdmin('information');},1000)
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function resetInfoForm(formId){
	$('#'+formId)[0].reset();
	$("#"+formId+" #infoType").val(0);
	$("#"+formId+" #infoTitle").val('');
	$("#"+formId+" #infoStatus").val(1);
}


function getRequestForInfoDetails(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var manageInformationDTO = {};
	manageInformationDTO['infoType'] = $("#"+formId+" #infoType  option:selected").val();
	manageInformationDTO['infoId'] = $("#"+formId+" #infoId").val();
	manageInformationDTO['infoTitle'] = $("#"+formId+" #infoTitle").val();
	var imageName = $("#fileupload1").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			manageInformationDTO['attachment'] = imageName
		}
	}
	manageInformationDTO['infoStatus'] = $("#"+formId+" #infoStatus option:selected").val();
	
	requestData['manageInformation'] = manageInformationDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForInfoDetails(formId,moduleId){
	if ($("#infoType").val()==null || $("#infoType option:selected").val()==0 ) {
		showMessage(true, 'Please Select information Type is Mandatory');
		return false
	}
	
	var imageName = $("#fileupload1").prev('span').prev('label').text().trim()
	if($("#"+formId+" #infoType  option:selected").val()=='2'){
		if(imageName=='Click here to upload'){
			showMessage(true, 'Please choose file');
			return false
		}
	}
	
	if ($("#infoTitle").val()==null || $("#infoTitle").val()==0 ) {
		showMessage(true, 'Please fill title is Mandatory');
		return false
	}
	if ($("#infoStatus").val()=='' || $("#infoStatus").val()==null) {
		showMessage(true, 'Please Select Status is Mandatory');
		return false
	}
	
	return true;
}
function getISDCodeByCityAndCountry(cityName, countryName, elementId1, elementId2){
	$.ajax({
		type : "GET",
		url : getURLForHTML('common','get-isdcode-by-city-and-country'),
		data : "cityName="+cityName+'&countryName='+countryName,
		dataType : 'html',
		async : false,
		success : function(content) {
			var finalValue=content+" "+countryName;
//			console.log('finalValue=>'+finalValue);
			if(elementId1!=''){
				chooseValueByElement(elementId1, finalValue)
			}
			if(elementId2!=''){
				chooseValueByElement(elementId2, finalValue)
			}
			return content;
		}
	});
}
function chooseValueByElement(elementId, value){
	if($('#'+elementId).length){
		$('#'+elementId+' option').map(function () {
			if ($(this).text() === value) return this;
		}).attr('selected', 'selected');
	}
}