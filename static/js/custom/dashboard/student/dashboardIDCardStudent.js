$(document).ready(function() {
});
function changeSession(listType){
	if($('select#session').val()!=undefined){
		var sessionValue = $('select#session option:selected').attr('sessionValue').split("-");
		var arg = "?sessionVal="+sessionValue[0]+"&sessionMonth="+sessionValue[1]+"&listType="+listType;
		$('#manageStudentIdCard').dataTable().fnDestroy();
		showStudentIdCard('manageStudentIdCard', arg, listType);
		if(listType=='hallticket'){
			getTargetBatchListForSession();
		}
		if(listType=='hallticket' || listType=='examsheet'){
			getFilterBatchListForSession();
		}
	}
}

function filterHallTicketByBatch(listType){
	var sessionValue = $('select#session option:selected').attr('sessionValue').split("-");
	var filterBatchId = $('#filterBatchId').val();
	var arg = "?sessionVal="+sessionValue[0]+"&sessionMonth="+sessionValue[1]+"&listType="+listType+"&batchId="+filterBatchId;
	$('#manageStudentIdCard').dataTable().fnDestroy();
	showStudentIdCard('manageStudentIdCard', arg, listType);
}
function showStudentIdCard(elementId, argument, listType){
	console.log("argument => "+argument);
	var columns = [
             { "data": "sNo", "name" : "sNo", "title" : "S.No"  },
             { "data": "enrollNo", "name" : "enrollNo" , "title" : "Application No"},
             { "data": "rollNo", "name" : "rollNo" , "title" : "Roll no"},
             { "data": "studentName", "name" : "studentName" , "title" : "Student Name"},
             { "data": "dob", "name" : "dob" , "title" : "D.O.B"},
             { "data": "formStatus", "name" : "formStatus" , "title" : "Application Status"},
             { "data": "action1", "name" : "action1" , "title" : "View"}
//             { "data": "action2", "name" : "action2" , "title" : "Hall ticket"},
//             { "data": "action3", "name" : "action3" , "title" : "Exam Attendance sheet"}
	];
	if(listType=='hallticket' || listType=='examsheet'){
		columns.splice(columns.length - 1, 0, { "data": "batchName", "name" : "batchName" , "title" : "Current Batch"});
	}
	if(listType=='hallticket'){
		columns.unshift({
			"data": null,
			"orderable": false,
			"title": '<input type="checkbox" id="selectAllHallTicket" onclick="toggleAllHallTicketCheckbox()">',
			"render": function(data, type, row) {
				return '<input type="checkbox" class="hallTicketStudentCheckbox" value="'+row.studentId+'">';
			}
		});
	}
	$('#'+elementId).DataTable( {
		"select": true,
        "processing": true,
        "serverSide": true,
        "pageLength": 10,
        "ajax": {
            "url": CONTEXT_PATH+"dashboard/student-id-card-1"+argument,
            "data": function ( data ) {
         }},
         "columns": columns
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function getTargetBatchListForSession(){
	$("#targetBatchId").html('<option value="0">Please select one</option>');
	if($('#session').val()==null || $('#session').val()==0){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','manage-exams-batch-list'),
		data : "sessionId="+$('#session').val(),
		dataType : 'json',
		cache : false,
		success : function(batchList) {
			$("#targetBatchId").html('<option value="0">Please select one</option>');
			$.each(batchList, function(index, batch) {
				var selectedAttr = batch.active=='Y' ? ' selected' : '';
				$("#targetBatchId").append('<option value="'+batch.id+'"'+selectedAttr+'>'+batch.name+'</option>');
			});
		}
	});
}

function getFilterBatchListForSession(){
	$("#filterBatchId").html('<option value="0">All Batches</option>');
	if($('#session').val()==null || $('#session').val()==0){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','manage-exams-batch-list'),
		data : "sessionId="+$('#session').val(),
		dataType : 'json',
		cache : false,
		success : function(batchList) {
			$("#filterBatchId").html('<option value="0">All Batches</option>');
			$.each(batchList, function(index, batch) {
				var selectedAttr = batch.active=='Y' ? ' selected' : '';
				$("#filterBatchId").append('<option value="'+batch.id+'"'+selectedAttr+'>'+batch.name+'</option>');
			});
		}
	});
}

function toggleAllHallTicketCheckbox(){
	var checked = $('#selectAllHallTicket').is(':checked');
	$('.hallTicketStudentCheckbox').prop('checked', checked);
}

function bulkTransferBatch(){
	hideMessage('');
	var studentIds = [];
	$('.hallTicketStudentCheckbox:checked').each(function(){
		studentIds.push(parseInt($(this).val()));
	});
	if(studentIds.length==0){
		showMessage(true, 'Please select at least one student');
		return false;
	}
	if($('#targetBatchId').val()==null || $('#targetBatchId').val()==0){
		showMessage(true, 'Please select a target batch');
		return false;
	}
	var transferDTO = {};
	transferDTO['studentIds'] = studentIds;
	transferDTO['batchId'] = $('#targetBatchId').val();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','bulk-transfer-batch'),
		data : encodeURI("request="+JSON.stringify(transferDTO)),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
				var stringMessage = [];
				stringMessage = htmlContent.split("|");
				if(stringMessage[0] == "SESSIONOUT"){
					redirectLoginPage();
				} else {
					showMessage(true, stringMessage[1]);
					$('#selectAllHallTicket').prop('checked', false);
					filterHallTicketByBatch();
				}
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}
