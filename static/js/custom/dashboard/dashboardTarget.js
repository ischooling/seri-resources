$(document).ready(function() {
	
});
function getCurrentDate(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = (((''+day).length<2 ? '0' : '') + day ) + '-' + ((''+month).length<2 ? '0' : '') + month + '-' + d.getFullYear();
	return output;
}
function getDaysMinusWeekend(startDay, startMonth, startYear, endDay, endMonth, endYear) {
	var sdate = new Date();
	var edate = new Date();
	var odays = 0;
	var total = 0;
	sdate.setFullYear(startYear,startMonth,startDay);
	edate.setFullYear(endYear,endMonth,endDay);
	odays = 6 - sdate.getDay();
	if(odays == 6) {
		odays = 0;
	}
	sdate.setFullYear(startYear,startMonth,startDay + odays);
	return Math.floor(((((edate.getTime() - sdate.getTime()) / 1000 / 60 / 60 / 24) / 7) * 6) +  odays);
}
function calculateWorkingDays(){
	var noOfWorkingDays = 0;
	if($('#startDate').val()!='' && $('#endDate').val()!='' ){
		var stDate = $('#startDate').val().split('-');
		var enDate = $('#endDate').val().split('-');
		if($('#includeSunday').prop('checked')){
			enDate = enDate[0]+'-'+enDate[1]+'-'+enDate[2];
			stDate = stDate[0]+'-'+stDate[1]+'-'+stDate[2];
			noOfWorkingDays = M.dateDiffDays(enDate, stDate)+1;
		}else{
			noOfWorkingDays = getDaysMinusWeekend(parseInt(stDate[0]), parseInt(stDate[1]), parseInt(stDate[2]),
					parseInt(enDate[0]), parseInt(enDate[1]), parseInt(enDate[2]) )+1;
		}
		var noOfHolidays = calculateNoOfHolidays();
		noOfWorkingDays = noOfWorkingDays - noOfHolidays;
	}
	$('#noOfWorkingDays').val(noOfWorkingDays);
	return $('#noOfWorkingDays').val();
}
function calculateNoOfHolidays(){
	var noOfHolidays = 0;
	if($('#holidaysIds').val() !='' ){
		noOfHolidays = $('#holidaysIds').val().split(',').length
	}
	$('#noOfHolidays').val(noOfHolidays);
	return $('#noOfHolidays').val();;
}

function calculateNoOfConselor(){
	$('#totalCounselor').val($('#totalCounselorIds option:selected').length);
	return $('#totalCounselor').val();
}
function setTargetValidDates(){
	
//	if(Date.parse($('#startDate').val()) < Date.parse(getCurrentDate())
//			|| Date.parse($('#endDate').val()) < Date.parse(getCurrentDate()) ){
//		showMessage(false, 'Target start date and end date should not be less then current date');
//		return false
//	}
//	if(Date.parse($('#startDate').val()) > Date.parse($('#endDate').val())){
//		showMessage(false, 'Target end date should be greater then start date.');
//		return false
//	}
	var totalCounselor = calculateNoOfConselor();
	var noOfWorkingDays = calculateWorkingDays();
	var totalCallDuration = 0;
	if($('#totalTargetCall').val()>0){
		totalCallDuration = totalCounselor*noOfWorkingDays*$('#totalTargetCall').val()
	}
	$('#totalCallDuration').val(totalCallDuration);
	var averageAdmimission = 0;
	if($('#totalTarget').val()>0){
		averageAdmimission = Math.ceil(($('#totalTarget').val()/totalCounselor)/noOfWorkingDays);
	}
	$('#averageAdmimission').val(averageAdmimission);
	return false;
}

function submitSetTarget(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSubmitSetTarget(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : CONTEXT+PATH+'dashboard/set-target-submit',
		data : JSON.stringify(getRequestForSubmitSetTarget(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				$('#'+formId)[0].reset();
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
//getRequestForSubmitSetTarget('setTarget','ADMIN');
function getRequestForSubmitSetTarget(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var setTargetDTO = {};
	setTargetDTO['targetId'] = $("#"+formId+" #targetId").val();
	setTargetDTO['targetTypeId'] = $("#"+formId+" #targetType option:selected").val();
	setTargetDTO['targetStart'] = $("#"+formId+" #startDate").val();
	setTargetDTO['targetEnd'] = $("#"+formId+" #endDate").val();
	setTargetDTO['holidaysIds'] = $("#"+formId+" #holidaysIds").val();
	setTargetDTO['noOfHolidays'] = $("#"+formId+" #noOfHolidays").val();
	if($("#"+formId+" #includeSunday").is(":checked")){
		setTargetDTO['sundayInclude'] = '1';
	}else{
		setTargetDTO['sundayInclude'] = '0';
	}
	setTargetDTO['counselorIds'] = $("#"+formId+" #totalCounselorIds").val().toString();
	setTargetDTO['noOfCounselor'] = $("#"+formId+" #totalCounselor").val();
	setTargetDTO['noOfTarget'] = $("#"+formId+" #totalTarget").val();
	setTargetDTO['totalCalling'] = $("#"+formId+" #totalTargetCall").val();
	setTargetDTO['totalCallDuration'] = $("#"+formId+" #totalCallDuration").val();
	setTargetDTO['noOfWorkingDays'] = $("#"+formId+" #noOfWorkingDays").val();
	setTargetDTO['averageAdmimission'] = $("#"+formId+" #averageAdmimission").val();
	
	requestData['setTargetDTO'] = setTargetDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = "1";
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitSetTarget(formId,moduleId){
	if ($("#"+formId+" #targetType").val()==0 || $("#"+formId+" #targetType").val()==null) {
		showMessage(true, 'Target Type is required');
		return false
	}
	if ($("#"+formId+" #startDate").val()=="" || $("#"+formId+" #startDate").val()=="dd/mm/yyyy") {
		showMessage(true, 'Start Date is required');
		return false
	}
	if ($("#"+formId+" #endDate").val()=="" || $("#"+formId+" #endDate").val()=="dd/mm/yyyy") {
		showMessage(true, 'End Date is required');
		return false
	}
//	if ($("#"+formId+" #totalCounselor").val()=="") {
//		showMessage(true, 'Total Counselor is required');
//		return false
//	}
	if ($("#"+formId+" #totalTarget").val()=="") {
		showMessage(true, 'Total Target is required');
		return false
	}
	return true;
}

function submitDailyTarget(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForSubmitDailyTarget(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : CONTEXT+PATH+'dashboard/daily-target-submit',
		data : JSON.stringify(getRequestForSubmitDailyTarget(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				showMessage(false, data['message']);
				//$('#'+formId)[0].reset();
				//document.getElementById('startDate').valueAsDate = new Date();
				$("#"+formId+" #callAchieve").val("");
				$("#"+formId+" #admissionAchieve").val("");
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForSubmitDailyTarget(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var dailyTargetDTO = {};
	dailyTargetDTO['targetId'] = $("#"+formId+" #targetType option:selected").val();
	dailyTargetDTO['counselorId'] = $("#"+formId+" #counselorId option:selected").val();
	dailyTargetDTO['consultantId'] = $("#"+formId+" #consultantId option:selected").val();
	dailyTargetDTO['dailyDate'] = $("#"+formId+" #startDate").val();
	dailyTargetDTO['dailyCallTarget'] = $("#"+formId+" #callTarget").val();
	dailyTargetDTO['dailyCallAchieved'] = $("#"+formId+" #callAchieve").val();
	dailyTargetDTO['dailyAdmissionTarget'] = '0';//$("#"+formId+" #admissionTarget").val();
	dailyTargetDTO['dailyAdmissionAchieved'] = $("#"+formId+" #admissionAchieve").val();
	dailyTargetDTO['statesIds'] = $("#"+formId+" #stateId option:selected").val();
	if($("#"+formId+" #isHolidays").is(":checked")){
		dailyTargetDTO['isHolidays'] = '1';
	}else{
		dailyTargetDTO['isHolidays'] = '0';
	}
	if($("#"+formId+" #isCounselorLeave").is(":checked")){
		dailyTargetDTO['isCounselorLeave'] = '1';
	}else{
		dailyTargetDTO['isCounselorLeave'] = '0';
	}
	
	requestData['dailyTargetDTO'] = dailyTargetDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = "1";
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForSubmitDailyTarget(formId,moduleId){
	
	
	if ($("#"+formId+" #startDate").val()=="" || $("#"+formId+" #startDate").val()=="dd/mm/yyyy") {
		showMessage(true, 'Date is required');
		return false
	}
	if ($("#"+formId+" #targetType").val()==0 || $("#"+formId+" #targetType").val()==null) {
		showMessage(true, 'Target Type is required');
		return false
	}
	if ($("#"+formId+" #counselorId").val()==0 || $("#"+formId+" #counselorId").val()==null) {
		showMessage(true, 'Counselor is required');
		return false
	}
	if($("#"+formId+" #isCounselorLeave").is(":checked")){}
	else{
//		if ($("#"+formId+" #consultantId").val()==0 || $("#"+formId+" #consultantId").val()==null) {
//			showMessage(true, 'Consultant is required');
//			return false
//		}
		if ($("#"+formId+" #callTarget").val()=="") {
			showMessage(true, 'Call Target is required');
			return false
		}
		if ($("#"+formId+" #callAchieve").val()=="") {
			showMessage(true, 'Call Achieved is required');
			return false
		}
//		if ($("#"+formId+" #admissionTarget").val()=="") {
//			showMessage(true, 'Adminssion Target is required');
//			return false
//		}
		if ($("#"+formId+" #admissionAchieve").val()=="") {
			showMessage(true, 'Adminssion Achieved is required');
			return false
		}
		if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
			showMessage(true, 'State  is required');
			return false
		}
	}
	
	return true;
}


function getCounselorTarget(formId, moduleId) {
	
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLFor('dashboard','get-counselor-target'),
		data : JSON.stringify(getRequestCounselorTarget(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var result = data.dashboardDTO.dailyTargetDTOList;
				$("#"+formId+" #callTarget").val(result[0].dailyCallTarget);
				$("#"+formId+" #admissionTarget").val(result[0].dailyAdmissionTarget);
				$("#"+formId+" #callAchieve").val(result[0].dailyCallAchieved);
				$("#"+formId+" #admissionAchieve").val(result[0].dailyAdmissionAchieved);
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestCounselorTarget(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var dailyTargetDTO = {};
	dailyTargetDTO['counselorId'] = $("#"+formId+" #counselorId option:selected").val();
	dailyTargetDTO['dailyDate'] = $("#"+formId+" #startDate").val();
	
	requestData['dailyTargetDTO'] = dailyTargetDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = "1";
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

	