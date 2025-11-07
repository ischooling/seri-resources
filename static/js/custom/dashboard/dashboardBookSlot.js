function validateRequestForMeetingSlots(formId){
	console.log('inside');
	if ($("#"+formId+" #meetingDate").val()==0 || $("#"+formId+" #meetingDate").val()==null) {
		showMessage(true, 'Meeting Date is Mandatory');
		return false
	}
	if ($("#"+formId+" #startTime").val()==0 || $("#"+formId+" #startTime").val()==null) {
		showMessage(true, 'Start Time is Mandatory');
		return false
	}
	if ($("#"+formId+" #timeInterval").val()==0 || $("#"+formId+" #timeInterval").val()==null) {
		showMessage(true, 'Time Interval is Mandatory');
		return false
	}
	/*if ( $("#"+formId+" #startTime").val()!=null){
		var meetDate = $("#"+formId+" #startTime").val();
		meetDate = meetDate.split("-");
		meetingDate = meetDate[2]+"-"+meetDate[0]+"-"+meetDate[1];
		var selectDate = new Date(meetingDate);
		var todayDate = new Date();
		if(selectDate>=todayDate){
			return true;
		}else{
			showMessage(false, "Selected Date is not valid");
			return false;
		}
	}*/
    return true;
}
function callForMeetingSlot(formId) {	
	//console.log('aya');
	hideMessage('');
	if(!validateRequestForMeetingSlots(formId)){
		return false;
	}
	$("#meetingSlotsForm").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','add-meeting-slots'),
		data : encodeURI("request="+JSON.stringify(getRequestForMeetingSlots())),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#meetingSlotsForm").prop("disabled", false);
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT" ){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else{
        				showMessage(true, stringMessage[1]);
        				$('#meetingSlotsModal').modal('toggle');
        			}
        		return false;
			}else{
				showMessage(true, stringMessage[1]);
				$('#meetingSlotsModal').modal('toggle');
			}
		}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	
	});

}

function getRequestForMeetingSlots(){
	
	var request={};
	var requestData={};
	var authentication={};
	var meetingSlotDTO = {};
	
	meetingSlotDTO['meetingId']=$("#meetingId").val();
	console.log('meetingId' +meetingId);
	
	var date = $("#meetingDate").val();
	var newDate = date.split('-');
	var meetingDate=(newDate[2]+'-'+newDate[1]+'-'+newDate[0]);
	console.log('meetingDate '+meetingDate);
	meetingSlotDTO['meetingDate']=meetingDate;
	
	//meetingSlotDTO['date']=meetingDate;

	var startTime = $("#startTime").val();
	var interval = $("#timeInterval option:selected").val();
	meetingSlotDTO['timeInterval'] = interval;
	
	var startDateTime= new Date(newDate[1]+'/'+newDate[0]+'/'+newDate[2]+' '+startTime+":00");
	startDateTime = startDateTime.getHours()+":"+startDateTime.getMinutes()+":00";
    console.log('startDateTime '+startDateTime);
	meetingSlotDTO['startTime'] = startDateTime;
	
	var endDateTime= new Date(newDate[1]+'/'+newDate[0]+'/'+newDate[2]+' '+startTime+":00");
	endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(interval));
	endDateTime = endDateTime.getHours()+":"+endDateTime.getMinutes()+":00";
    console.log('endDateTime '+endDateTime);
    meetingSlotDTO['endTime'] = endDateTime;
	
	meetingSlotDTO['status']="0";
	
	requestData['meetingSlotDTO'] = meetingSlotDTO;
    authentication['hash'] = getHash();
    request['authentication'] = authentication;
    request['requestData'] = requestData;
    console.log('request :: '+request);
    return request;
}