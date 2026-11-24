function getSearchBatchListForSession(){
	$("#searchBatchId").html('<option value="">Please select session first</option>');
	if($('#session').val()==null || $('#session').val()==''){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','manage-exams-batch-list'),
		data : "sessionId="+$('#session').val(),
		dataType : 'json',
		cache : false,
		success : function(batchList) {
			$("#searchBatchId").html('<option value="">All Batches</option>');
			var activeSelected = false;
			$.each(batchList, function(index, batch) {
				var selectedAttr = '';
				if (batch.active=='Y' && !activeSelected) { selectedAttr = ' selected'; activeSelected = true; }
				$("#searchBatchId").append('<option value="'+batch.id+'"'+selectedAttr+'>'+batch.name+'</option>');
			});
		}
	});
}

function searchStudent(){
	var statusFilter = $("#studentStatusFilter").val() || "";
	var statusLabels = {approve: "Approved Student", pending: "Pending Student", paymentpending: "Payment Pending", reject: "Rejected Student"};
	$("#studentManageHead").text(statusLabels[statusFilter] || "Manage Student");
	var sessionYear='';
	var sessionMonth='';
	if($('#session').val()!=undefined && $('#session').val()!=''){
		var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
		sessionYear = sessionValue[0];
		sessionMonth = sessionValue[1];
	}
	var batchId = "";
	if($("#searchBatchId").val()!=undefined){
		batchId = $("#searchBatchId").val();
	}
	var recommendedBy = "";
	if($("#recommendBy").val()!=undefined){
		recommendedBy = $("#recommendBy").val();
	} 
	var schoolType ="";
	if($("#schoolType").val()!=undefined){
		schoolType = $("#schoolType").val();
	}
	var dob = $("#dob").val();
	var rollNo = $("#rollno").val();
	var studentName = $("#studentName").val();
	var fathername = $("#fatherName").val();
	var schoolId ="";
	if($("#school").val()!=undefined){
		schoolId = $("#school").val();
	}
	var elementId = 'manageStudent';
	//$('#'+elementId).dataTable().fnDestroy();
	showStudentListingWithQueries(elementId, "?sessionYear="+sessionYear+"&sessionMonth="+sessionMonth+"&recommendedBy="+recommendedBy+"&dob="+dob+"&rollNo="+rollNo+"&studentName="+studentName+"&fathername="+fathername+"&schoolId="+schoolId+"&batchId="+batchId+"&feeStatus=false&studentStatus="+statusFilter, schoolType);
	$("#searchOption").modal('toggle');
	return false;
}