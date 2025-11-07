function callForDashboardAddUser(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForAddUser(formId,moduleId)){
		return false;
	}
	$("#addUser").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','save-user-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddUser(formId, moduleId))),
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
        				 resetUserForm(formId);
        			}
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#addUser").prop("disabled", false);
			return false;
		}
	});
	
}	
function getRequestForAddUser(formId,moduleId){
	var addUserListDTO = {};
	var permissions = {};
	var controlType=$("#"+formId+" #controllType").val();
	if(controlType=='add'){
		addUserListDTO['email'] = $("#"+formId+" #email").val().trim();
		addUserListDTO['loginId'] = $("#"+formId+" #userName ").val();
		addUserListDTO['password'] = $("#"+formId+" #password ").val();
		addUserListDTO['confirmPassword'] = $("#"+formId+" #confirmPassword ").val();
		
	}
	addUserListDTO['userId'] = $("#"+formId+" #userId").val();
	addUserListDTO['firstName'] = $("#"+formId+" #firstName").val();
	addUserListDTO['lastName'] = $("#"+formId+" #lastName").val();
	addUserListDTO['dob'] = $("#"+formId+" #dob").val();
	addUserListDTO['userType'] = $("#"+formId+" #userType").val();
	addUserListDTO['userName'] = $("#"+formId+" #userName ").val().trim();
	addUserListDTO['securityQues'] = $("#"+formId+" #securityQues ").val();
	addUserListDTO['securityAns'] = $("#"+formId+" #securityAns ").val();
	addUserListDTO['status'] = $("#"+formId+" #status option:selected").val();
	addUserListDTO['controllType'] = controlType;
	var checkAdd = "false";
	if($("#chkAdd").is(":checked")){
		checkAdd = "true";
	}
	
	var checkEdit = "false";
	if($("#chkEdit").is(":checked")){
		checkEdit = "true";
	}
	
	var checkView = "false";
	if($("#chkView").is(":checked")){
		checkView = "true";
	}
	
	var checkDelete = "false";
	if($("#chkDelete").is(":checked")){
		checkDelete = "true";
	}
	
	var checkTarget = "false";
	if($("#chkTarget").is(":checked")){
		checkTarget = "true";
	}
	
	var checkPayment = "false";
	if($("#chkPayment").is(":checked")){
		checkPayment = "true";
	}
	
	var checkApprove = "false";
	if($("#chkApprove").is(":checked")){
		checkApprove = "true";
	}
	
	var checkErp = "false";
	if($("#chkErp").is(":checked")){
		checkErp = "true";
	}
	
	var checkEditSecond = "false";
	if($("#chkEditSecond").is(":checked")){
		checkEditSecond = "true";
	}
	var checkPreStudent = "false";
	if($("#chkPreStudent").is(":checked")){
		checkPreStudent = "true";
	}
	
	var checkBusinessSchool = "false";
	if($("#chkSchoolBusiness").is(":checked")){
		checkBusinessSchool = "true";
	}
	var checkChangeSession = "false";
	if($("#chkChangeSession").is(":checked")){
		checkChangeSession = "true";
	}
	
	var editMarks = "false";
	if($("#chkEditMarks").is(":checked")){
		editMarks = "true";
	}
	
	permissions['add'] = checkAdd;
	permissions['edit'] = checkEdit;
	permissions['view'] = checkView;
	permissions['delete'] = checkDelete;
	permissions['target'] = checkTarget;
	permissions['payment'] = checkPayment;
	permissions['approve'] = checkApprove;
	permissions['erp'] = checkErp;
	permissions['editSecond'] = checkEditSecond;
	permissions['preStudent'] = checkPreStudent;
	permissions['affiliationSchool'] = checkBusinessSchool;
	permissions['changeSession'] = checkChangeSession;
	permissions['editMarks'] = editMarks;
	addUserListDTO['permission']=permissions;
	return addUserListDTO;
}

function validateRequestForAddUser(formId,moduleId){
	var chkArray = [];
	var selected;
	if ($("#"+formId+" #firstName").val()=="") {
		showMessage(true, 'First name is required');
		return false
	}
	if ($("#"+formId+" #lastName").val()=="") {
		showMessage(true, 'Last name is required');
		return false
	}
	if (!validateEmail($("#" + formId + " #email").val().trim())) {
		showMessage(true, 'Either email-id  is blank or invalid');
		return false
	}
	if ($("#"+formId+" #userType").val()==null || $("#"+formId+" #userType").val()=="0") {
		showMessage(true, 'Please choose user type');
		return false
	}
	if ($("#"+formId+" #status").val()==null || $("#"+formId+" #status").val()=="0" ) {
		showMessage(true, 'Please choose status');
		return false
	}
	if ($("#"+formId+" #password").val()=="" ) {
		showMessage(true, 'Please enter password');
		return false
	}
	if ($("#"+formId+" #confirmPassword").val()=="" ) {
		showMessage(true, 'Please enter confirm password');
		return false
	}
	if ($("#"+formId+" #password").val() != $("#"+formId+" #confirmPassword").val()) {
		showMessage(true, 'Password and confirm password must be same.');
		return false
	}
	$(".form-check-input:checked").each(function() {
		chkArray.push($(this).val());
	});
	if(chkArray.length == 0){
		showMessage(true, 'Please select atleast one user permission');
		return false
	}
	return true;
}

function resetUserForm(formId){
	$('#'+formId)[0].reset();
	$("#"+formId+" #firstName").val('');
	$("#"+formId+" #lastName").val('');
	$("#"+formId+" #email").val('');
	$("#"+formId+" #dob").val('');
	$("#"+formId+" #userName").val('');
	$("#"+formId+" #securityQues").val('');
	$("#"+formId+" #studentCapacity").val('');
	$("#"+formId+" #securityAns").val('');
	$("#"+formId+" #chkAdd").prop('checked',false);
	$("#"+formId+" #chkEdit").prop('checked',false);
	$("#"+formId+" #chkView").prop('checked',false);
	$("#"+formId+" #chkDelete").prop('checked',false);
	$("#"+formId+" #chkTarget").prop('checked',false);
	$("#"+formId+" #chkApprove").prop('checked',false);
	$("#"+formId+" #chkPayment").prop('checked',false);
	$("#"+formId+" #chkErp").prop('checked',false);
	$("#"+formId+" #chkEditSecond").prop('checked',false);
	$("#"+formId+" #chkPreStudent").prop('checked',false);
}