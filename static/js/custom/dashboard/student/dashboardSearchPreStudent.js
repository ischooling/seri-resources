function searchPreStudent(){
	var sessionYear='';
	var sessionMonth='';
	if($('#session').val()!=undefined && $('#session').val()!=''){
		var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
		sessionYear = sessionValue[0];
		sessionMonth = sessionValue[1];
	}
	var mothername ='';
	var dob = $("#dob").val();
	var enrollmentNo = $("#preEnrollmentNo").val();
	var studentName = $("#studentName").val();
	var fathername = $("#fatherName").val();
	if($("#motherName").val()!=undefined || $('#motherName').val()!=''){
		 mothername = $("#motherName").val();
	}
	var contactNumber = $("#contactPNumber").val();
	var elementId = 'managePreStudent';
	$('#'+elementId).dataTable().fnDestroy();
	showPreStudentListingWithQueries('managePreStudent', "?sessionYear="+sessionYear+"&sessionMonth="+sessionMonth+"&dob="+dob+"&enrollmentNo="+enrollmentNo+"&studentName="+studentName+"&fathername="+fathername+"&motherName="+mothername+"&contactNumber="+contactNumber+"");
	$("#preSearchForm").modal('toggle');
	return false;
}