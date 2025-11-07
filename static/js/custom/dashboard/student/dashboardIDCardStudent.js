$(document).ready(function() { 
});
function changeSession(listType){
	if($('select#session').val()!=undefined){
		var sessionValue = $('select#session option:selected').attr('sessionValue').split("-");
		var arg = "?sessionVal="+sessionValue[0]+"&sessionMonth="+sessionValue[1]+"&listType="+listType;
		$('#manageStudentIdCard').dataTable().fnDestroy();
		showStudentIdCard('manageStudentIdCard', arg);
	}
}
function showStudentIdCard(elementId, argument){
	console.log("argument => "+argument);
	$('#'+elementId).DataTable( {
		"select": true,
        "processing": true,
        "serverSide": true,
        "pageLength": 10,
        "ajax": {
            "url": CONTEXT_PATH+"dashboard/student-id-card-1"+argument,
            "data": function ( data ) {
         }},
         "columns": [
             { "data": "sNo", "name" : "sNo", "title" : "S.No"  },
             { "data": "enrollNo", "name" : "enrollNo" , "title" : "Application No"},
             { "data": "rollNo", "name" : "rollNo" , "title" : "Roll no"},
             { "data": "studentName", "name" : "studentName" , "title" : "Student Name"},
             { "data": "dob", "name" : "dob" , "title" : "D.O.B"},
             { "data": "formStatus", "name" : "formStatus" , "title" : "Application Status"},
             { "data": "action1", "name" : "action1" , "title" : "View"},
//             { "data": "action2", "name" : "action2" , "title" : "Hall ticket"},
//             { "data": "action3", "name" : "action3" , "title" : "Exam Attendance sheet"}
         ]
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}