function searchStudent(){
	$("#studentManageHead").text("Approved Student");
	var sessionYear='';
	var sessionMonth='';
	if($('#session').val()!=undefined && $('#session').val()!=''){
		var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
		sessionYear = sessionValue[0];
		sessionMonth = sessionValue[1];
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
	showStudentListingWithQueries(elementId, "?sessionYear="+sessionYear+"&sessionMonth="+sessionMonth+"&recommendedBy="+recommendedBy+"&dob="+dob+"&rollNo="+rollNo+"&studentName="+studentName+"&fathername="+fathername+"&schoolId="+schoolId+"&feeStatus=false&studentStatus=", schoolType);
	$("#searchOption").modal('toggle');
	return false;
}