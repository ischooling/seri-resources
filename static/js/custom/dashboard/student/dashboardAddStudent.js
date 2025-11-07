$(document).ready(function() {
});
function emptyPreviousQualification(){
	
	var grateId='8';
	var gradeText = "KINDLY FILL THE PREVIOUS GRADE 8 INFORMATION";
	if($('#standardId').val()==1){
		grateId='8';
		gradeText = "KINDLY FILL THE PREVIOUS GRADE 8 INFORMATION";
	}else if($('#standardId').val()==2){
		grateId='9';
		gradeText = "KINDLY FILL THE PREVIOUS GRADE 9 INFORMATION";
	}else if($('#standardId').val()==5 || $('#standardId').val()==6 || $('#standardId').val()==7 ){
		grateId='10';
		gradeText = "KINDLY FILL THE PREVIOUS BOARD (GRADE 10) INFORMATION";
	}else if($('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
		grateId='10';
		gradeText = "KINDLY FILL THE PREVIOUS BOARD (GRADE 10) INFORMATION";
		$('#previousQualification2').show();
		$('#passingPercentage2Div').show();
		$('#passingPercentage1Div').show();
	}
	
//	var grateId='8';
//	if($('#standardId').val()==1){
//		grateId='8';
//	}else if($('#standardId').val()==2){
//		grateId='9';
//	}else if($('#standardId').val()==5 || $('#standardId').val()==6 || $('#standardId').val()==7 ){
//		grateId='10';
//	}else if($('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
//		grateId='10';
//		$('#previousQualification2').show();
//		$('#passingPercentage2Div').show();
//		$('#passingPercentage1Div').show();
//	}
	$('.previousGrage1').html(grateId);
	$('.previousGrageText1').html(gradeText);
	
	if($("#studentId").val()=='0'){
		$('#fileuploadPreviousMarks11').next('p').html(grateId+' GRADE MARKSHEET');
		$('#fileuploadPreviousMarks12').next('p').html(grateId+' Other Document');
	}
	
	$("#previousRollNo1").val('');
	$("#previousSchoolName1").val('');
	$('#previousYearOfPassing1').val('0');
	$('#previousNameOfBoard1').val('');
	$('#fileuploadPreviousMarks11').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks12').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks11').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i>GRADE '+grateId+' MARKSHEET');
	$('#fileuploadPreviousMarks12').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i>OTHER DOCUMENT OF GRADE '+grateId+'');
	$('#fileuploadPreviousMarks11').prev('span').html('');
	$('#fileuploadPreviousMarks12').prev('span').html('');
	$('#previousRollNo2').val('');
	$('#previousSchoolName2').val('');
	$('#previousYearOfPassing2').val('0');
	$('#previousNameOfBoard2').val('');
	$('#fileuploadPreviousMarks21').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks22').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks21').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i>GRADE 11 MARKSHEET');
	$('#fileuploadPreviousMarks22').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i>OTHER DOCUMENT OF GRADE 11');
	$('#fileuploadPreviousMarks21').prev('span').html('');
	$('#fileuploadPreviousMarks22').prev('span').html('');
}
function selectSubject(src, flag, MIN_SUBJECT, MAX_SUBJECT){
	if(flag){
		if (!$(src).hasClass("greenDiv")) {
			if(parseInt($("#countSubject").text())>=parseInt(MAX_SUBJECT)){
				showMessage(true, 'You can\'t select more than '+MAX_SUBJECT+' subject.');
				return false
			}
			$(src).addClass("greenDiv");
		} else {
			$(src).removeClass("greenDiv");
		}
		calculateCurrentSubjects();
		callPreviousSubjectList();
	}
}

function setPreviousMarks(){
	$('#previousMarksModal').modal('hide');
	var index=0;
	if(PRESERVE_PREVIOUS_MARKS==''){
		var standardId = $('#addStudent #standardId').val();
		callPreviousSubjectList();
	}else{
		$("#tbl_gen_marks_pre tbody tr").each(function() {
			prevMarksDTO = PRESERVE_PREVIOUS_MARKS[index];
			$(this).removeClass('tr-red');
			$(this).find("input.marksId").val(prevMarksDTO['marksId']);
			if(prevMarksDTO['subjectName']==''){
				$(this).find("select.sub_id").val(prevMarksDTO['subjectId']);
			}else{
				setDropDownByText('preSubId'+(index+1), prevMarksDTO['subjectName']);
			}
			$(this).find("input.sub_maxid").val(prevMarksDTO['maxMarks']);
			$(this).find("input.e_p_marks").val(prevMarksDTO['practicalMarks']);
			$(this).find("input.e_t_marks").val(prevMarksDTO['theoryMarks']);
			$(this).find("span.marks-count").html(prevMarksDTO['marksCount']);
			$(this).find("span.grade").html(prevMarksDTO['grade']);
			$(this).find("span.result").html(prevMarksDTO['result']);
			index++;
		});
	}
}
function setPreviousQualification(){
//	if(PRESERVE_PREVIOUS_QUALIFICATION.length==0){
//		return false;
//	}
	var studentPreQualficationDTO = PRESERVE_PREVIOUS_QUALIFICATION;
	$("#previousRollNo1").val(studentPreQualficationDTO['rollNo']);
	$("#previousSchoolName1").val(studentPreQualficationDTO['school']);
	$("#previousYearOfPassing1").val(studentPreQualficationDTO['passingYear']);
	$("#previousNameOfBoard1").val(studentPreQualficationDTO['boardName']);
	$("#passingPercentage1").val(studentPreQualficationDTO['passingPercentage']);
	var classMarksheet =  studentPreQualficationDTO['classMarksheet'];
	if(classMarksheet!=undefined && classMarksheet!='' && classMarksheet!='Click here to upload'){
		$('#fileuploadPreviousMarks11').prev('span').prev('label').addClass('green');
		$("#fileuploadPreviousMarks11").prev('span').prev('label').text(studentPreQualficationDTO['classMarksheet']);
		$('#fileuploadPreviousMarks11').prev('span').html('<i class="fa fa-times"></i>');
	}else{
		$('#fileuploadPreviousMarks11').prev('span').prev('label').removeClass('green');
		$("#fileuploadPreviousMarks11").prev('span').prev('label').text('Click here to upload');
		$('#fileuploadPreviousMarks11').prev('span').html('');
	}
	var otherDocs =  studentPreQualficationDTO['otherDocs'];
	if(otherDocs!=undefined && otherDocs!='' && otherDocs!='Click here to upload'){
		$('#fileuploadPreviousMarks12').prev('span').prev('label').addClass('green');
		$("#fileuploadPreviousMarks12").prev('span').prev('label').text(studentPreQualficationDTO['otherDocs']);
		$('#fileuploadPreviousMarks12').prev('span').html('<i class="fa fa-times"></i>');
	}else{
		$('#fileuploadPreviousMarks12').prev('span').prev('label').removeClass('green');
		$("#fileuploadPreviousMarks12").prev('span').prev('label').text('Click here to upload');
		$('#fileuploadPreviousMarks12').prev('span').html('');
	}
	
	$("#previousRollNo2").val(studentPreQualficationDTO['rollNo1']);
	$("#previousSchoolName2").val(studentPreQualficationDTO['school1']);
	$("#previousYearOfPassing2").val(studentPreQualficationDTO['passingYear1']);
	$("#previousNameOfBoard2").val(studentPreQualficationDTO['boardName1']);
	$("#passingPercentage2").val(studentPreQualficationDTO['passingPercentage1']);
	var classMarksheet1 =  studentPreQualficationDTO['classMarksheet1'];
	if(classMarksheet1!=undefined && classMarksheet1!='' && classMarksheet1!='Click here to upload'){
		$('#fileuploadPreviousMarks21').prev('span').prev('label').addClass('green');
		$("#fileuploadPreviousMarks21").prev('span').prev('label').text(studentPreQualficationDTO['classMarksheet1']);
		$('#fileuploadPreviousMarks21').prev('span').html('<i class="fa fa-times"></i>');
	}else{
		$('#fileuploadPreviousMarks21').prev('span').prev('label').removeClass('green');
		$("#fileuploadPreviousMarks21").prev('span').prev('label').text('Click here to upload');
		$('#fileuploadPreviousMarks21').prev('span').html('');
	}
	var otherDocs1 =  studentPreQualficationDTO['otherDocs1'];
	if(otherDocs1!=undefined && otherDocs1!='' && otherDocs1!='Click here to upload'){
		$('#fileuploadPreviousMarks22').prev('span').prev('label').addClass('green');
		$("#fileuploadPreviousMarks22").prev('span').prev('label').text(studentPreQualficationDTO['otherDocs1']);
		$('#fileuploadPreviousMarks22').prev('span').html('<i class="fa fa-times"></i>');
	}else{
		$('#fileuploadPreviousMarks22').prev('span').prev('label').removeClass('green');
		$("#fileuploadPreviousMarks22").prev('span').prev('label').text('Click here to upload');
		$('#fileuploadPreviousMarks22').prev('span').html('');
	}
	return false;
}

function setPreviousSubjects(){
	if(needToCallPreviousSubject){
	}else{
		needToCallPreviousSubject=false;
	}
	$("#optionalSubjects tbody tr").each(function() {
		if (PRESERVE_CURRENT_SUBJECTSDB.includes(this.id)) {
			$(this).attr('class','block greenDiv');
		}else{
			$(this).attr('class','block');
		}
	});
	calculateCurrentSubjects();
}

function getPreCalMarks(modalId){
	var flag = calcMarks();
	if(flag){
		calculatePreviousMarks();
		var subjectFlag = isSame();
		if(subjectFlag){
			$('#'+modalId).modal('hide');
		}else{
			var msg ='Previous subjects are different from current subjects';
			var warningYes = "getPreviousQualification(true);$('#warningMessageId').modal('hide');";
			var warningNo = "$('#warningMessageId').modal('hide');";
			$('#warningYes').attr('onclick',warningYes);
			$('#warningNo').attr('onclick',warningNo);
			$('#warnningMessageText').text(msg);
			$('#warningMessageId').modal({backdrop: 'static', keyboard: false});	
		}
		//getPreviousQualification(true);
		return true;
		
	}
	return false;
}

function getPreviousQualification(flag){
	
	var studentPreQualficationDTO = {};
	if(flag){
		if ($("#previousYearOfPassing1").val()==null || $("#previousYearOfPassing1").val()==0 ) {
			showMessage(true, 'Please fill previous qualification');
			return false
		}
		if ($("#passingPercentage1").val()==undefined || $("#passingPercentage1").val()=='' ) {
			showMessage(true, 'Please enter Percentage Scored in previous qualification');
			return false
		}
		var passingPercentage = parseFloat($("#passingPercentage1").val());
		if(passingPercentage>100 || passingPercentage <0){
			showMessage(true, 'Obtained marks percentage shouldn\'t more than 100.00');
			return false
		}
		if($('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
			if ($("#passingPercentage2").val()==undefined || $("#passingPercentage2").val()=='' ) {
				showMessage(true, 'Please enter Percentage Scored in previous qualification');
				return false
			}
			passingPercentage = parseFloat($("#passingPercentage2").val());
			if(passingPercentage>100 || passingPercentage <0){
				showMessage(true, 'Obtained marks percentage shouldn\'t more than 100.00');
				return false
			}
		}
	}
	studentPreQualficationDTO['rollNo'] = $("#previousRollNo1").val();
	if($("#previousSchoolName1").val()!="" && $("#previousSchoolName1").val()!=undefined){
		if(flag){
			studentPreQualficationDTO['school'] = encodeURIComponent($("#previousSchoolName1").val());
		}else{
			studentPreQualficationDTO['school'] = $("#previousSchoolName1").val();
		}
	}else{
		studentPreQualficationDTO['school']="";
	}
	studentPreQualficationDTO['passingYear'] = $("#previousYearOfPassing1").val();
	studentPreQualficationDTO['boardName'] = $("#previousNameOfBoard1").val();
	
	var imageName = $("#fileuploadPreviousMarks11").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPreQualficationDTO['classMarksheet'] = imageName
		}
	}
	var imageName = $("#fileuploadPreviousMarks12").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPreQualficationDTO['otherDocs'] = imageName
		}
	}
	
	studentPreQualficationDTO['rollNo1'] = $("#previousRollNo2").val();
	studentPreQualficationDTO['school1'] = $("#previousSchoolName2").val();
	if($("#previousSchoolName2").val()!="" && $("#previousSchoolName1").val()!=undefined){
		if(flag){
			studentPreQualficationDTO['school1'] = encodeURIComponent($("#previousSchoolName2").val());
		}else{
			studentPreQualficationDTO['school1'] = $("#previousSchoolName2").val();
		}
	}else{
		studentPreQualficationDTO['school1']="";
	}
	studentPreQualficationDTO['passingYear1'] = $("#previousYearOfPassing2").val();
	studentPreQualficationDTO['boardName1'] = $("#previousNameOfBoard2").val();
	
	var imageName = $("#fileuploadPreviousMarks21").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPreQualficationDTO['classMarksheet1'] = imageName
		}
	}
	var imageName = $("#fileuploadPreviousMarks22").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPreQualficationDTO['otherDocs1'] = imageName
		}
	}
	studentPreQualficationDTO['passingPercentage'] 	= $("#passingPercentage1").val();
	studentPreQualficationDTO['passingPercentage1'] = $("#passingPercentage2").val();
	PRESERVE_PREVIOUS_QUALIFICATION=studentPreQualficationDTO;
	$('#previousQualificationModal').modal('hide');
	return PRESERVE_PREVIOUS_QUALIFICATION;
}

function calculateCurrentSubjects(standardId) {
	if(standardId==undefined || standardId==''){
	}else{
		if($('#standardId').val()==null || $('#standardId').val()==0 || $('#standardId').val()==''){
			return "0";
		}
	}
	var selSubjectd = "";
	var selSubjectName = "";
	$("#mandatorySubjects tbody tr").each(function() {
		if (this.className.indexOf("greenDiv") != -1) {
			selSubjectd = selSubjectd + "," + this.id;
			selSubjectName = selSubjectName + "," + $(this).find("strong").text().split(' - ')[1];
		}
	});
	
	$("#optionalSubjects tbody tr").each(function() {
		if (this.className.indexOf("greenDiv") != -1) {
			selSubjectd = selSubjectd + "," + this.id;
			selSubjectName = selSubjectName + "," + $(this).find("strong").text().split(' - ')[1];
		}
	});
	$("#countSubject").text(selSubjectd.substr(1).split(',').length);
	PRESERVE_CURRENT_SUBJECTS=selSubjectd.substr(1);
	PRESERVE_CURRENT_SUBJECTS_NAME=selSubjectName.substr(1);
	if(PRESERVE_CURRENT_SUBJECTSDB!='' && PRESERVE_CURRENT_SUBJECTSDB!=PRESERVE_CURRENT_SUBJECTS){
		needToCallPreviousSubject=true;
	}
	return PRESERVE_CURRENT_SUBJECTS;
}
function showCurrentSubject(flag, sessionStartDate){
	if(flag){
		if($('#standardId').val()>0){
			$('#currentSubjectModal').modal({backdrop: 'static', keyboard: false});
		}else{
			showMessage(true, 'Please select standard');
		}
	}
}
function showPreviousQualification(flag){
	if(flag){
		if($('#standardId').val()>0){
			$('#previousQualificationModal').modal({backdrop: 'static', keyboard: false});
		}else{
			showMessage(true, 'Please select standard');
		}
	}
	$('#previousQualification2').hide();
	$('#passingPercentage1Div').show();
	$('#passingPercentage2Div').hide();
	var grateId='8';
	var gradeText = "KINDLY FILL THE PREVIOUS GRADE 8 INFORMATION";
	if($('#standardId').val()==1){
		grateId='8';
		gradeText = "KINDLY FILL THE PREVIOUS GRADE 8 INFORMATION";
	}else if($('#standardId').val()==2){
		grateId='9';
		gradeText = "KINDLY FILL THE PREVIOUS GRADE 9 INFORMATION";
	}else if($('#standardId').val()==5 || $('#standardId').val()==6 || $('#standardId').val()==7 ){
		grateId='10';
		gradeText = "KINDLY FILL THE PREVIOUS BOARD (GRADE 10) INFORMATION";
	}else if($('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
		grateId='10';
		gradeText = "KINDLY FILL THE PREVIOUS BOARD (GRADE 10) INFORMATION";
		$('#previousQualification2').show();
		$('#passingPercentage2Div').show();
		$('#passingPercentage1Div').show();
	}
	$('.previousGrage1').html(grateId);
	$('.previousGrageText1').html(gradeText);
	
	if($("#studentId").val()=='0'){
		$('#fileuploadPreviousMarks11').next('p').html('GRADE '+grateId+' MARKSHEET');
		$('#fileuploadPreviousMarks12').next('p').html('OTHER DOCUMENT OF GRADE '+grateId+'');
	}
	
	return false;
}
//function showPreviousMarks(){
//	if(needToCallPreviousSubject){
//		callPreviousSubjectList();
//	}
//	needToCallPreviousSubject=false;
//	if($('#standardId').val()>0){
//		$('#previousMarksModal').modal({backdrop: 'static', keyboard: false});
//	}else{
//		showMessage(true, 'Please select standard');
//	}
//}
function deserialize(values){
	var data = values.split("{")[1].split("}")[0].split(";")
	var studentPreQualficationDTO = {};
	studentPreQualficationDTO['grade'] = data[11].split(":")[2].trim();
	studentPreQualficationDTO['rollNo'] = data[13].split(":")[2].trim();
	studentPreQualficationDTO['school'] = data[15].split(":")[2].trim();
	studentPreQualficationDTO['passingYear'] = data[17].split(":")[2].trim();
	studentPreQualficationDTO['boardName'] = data[19].split(":")[2].trim();
	
	studentPreQualficationDTO['grade1'] = data[1].split(":")[2].trim();
	studentPreQualficationDTO['rollNo1'] = data[3].split(":")[2].trim();
	studentPreQualficationDTO['school1'] = data[5].split(":")[2].trim();
	studentPreQualficationDTO['passingYear1'] = data[7].split(":")[2].trim();
	studentPreQualficationDTO['boardName1'] = data[9].split(":")[2].trim();
	return studentPreQualficationDTO;
}
function callPreviousSubjectList() {
	hideMessage('');
	if(!validateRequestForPreviousSubjectList()){
		return false;
	}
	var data = 'standardId='+$("#standardId").val()+'&subjectIds='+calculateCurrentSubjects()+'&studentId='+$("#studentId").val()+"&oldApplication="+$('#oldApplication').val()+"&sessionStartDate="+$('#sessionStartDate').val();
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','previous-subject-content'),
		data : data,
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
        			$('#hiddenPreviousSubjectList').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
	
}	
function showTotalAmount(){
	$('#accountlistModal').modal({backdrop: 'static', keyboard: false});
}
function showCheckList(flag){
	if(flag){
		$('#checkListModal').modal({backdrop: 'static', keyboard: false});
	}
}
function removesSubjectAndMarks(standardId, sessionStartDate, flag){
	if(flag){
		var warningYes = "$('#warningMessageId').modal('hide');chageSubjects("+standardId+",'"+sessionStartDate+"')";
		var warningNo = "$('#warningMessageId').modal('hide');rollbackStandardId()";
		$('#warningYes').attr('onclick',warningYes);
		$('#warningNo').attr('onclick',warningNo);
		$('#warnningMessageText').text('If you change  the standard then relevant data will be lost?');
		$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
	}else{
		chageSubjects(standardId, sessionStartDate);
	}
}
function chageSubjects(standardId, sessionStartDate){
	needToCallPreviousSubject=true;
	emptyPreviousQualification();
	PRESERVE_CURRENT_SUBJECTS='';
	PRESERVE_PREVIOUS_QUALIFICATION='';
	PRESERVE_PREVIOUS_MARKS='';
	callSubjectsWithComp('addStudent', standardId, sessionStartDate, 'standardId');
	callSubjectsWithoutComp('addStudent', standardId,sessionStartDate,  'standardId');
	if($("select#recommendBy option:selected").val() != undefined){
		var sessonVal = $("select#session option:selected").attr("sessionvalue");
		var sessionVal = sessonVal.split("-");
		callAmountByEntity('addStudent',  $("select#recommendBy option:selected").val(), "consultants",sessionVal[0], standardId, 'recommendBy');
//		if('${studentDTO.receivedAmount}' !=""){
//			$("#receiveAmt").val('${studentDTO.receivedAmount}');
//		}else{
//			$("#receiveAmt").val(0);
//		}
	}
	window.setTimeout(function(){callPreviousSubjectList();},1000)
}
function updateApproval(formId,moduleId, msg, openMode, MIN_SUBJECT, MAX_SUBJECT){
	if(!validateRequestForAddStudent(formId,moduleId, MIN_SUBJECT, MAX_SUBJECT)){
		return false;
	}
	var warningYes = "return AddStudent('"+formId+"','"+moduleId+"','"+msg+"','"+openMode+"')";
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text(msg);
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}
function addStudentWarning(formId,moduleId, msg, openMode, MIN_SUBJECT, MAX_SUBJECT){
	if(!validateRequestForAddStudent(formId,moduleId, MIN_SUBJECT, MAX_SUBJECT)){
		return false;
	}
	var warningYes = "AddStudent('"+formId+"','"+moduleId+"','"+msg+"','"+openMode+"')";
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text(msg);
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}

function AddStudent(formId, moduleId, msg, openMode) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student-submit-content'),
		data : JSON.stringify(getRequestForAddStudent(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			$('#warningMessageId').modal('hide');
			if (data['status'] == '0' || data['status'] == '2') {
				var msg1 = data['message'].split("|");
				showMessage(true, msg1[0]);
			} else {
				resetForm(formId);
				if(openMode=='new'){
					var msg2 = data['message'].split("|");
					if(msg2[1] != undefined){
						showMessage(true, msg2[0]);
						if($('#actiontype').val()=="changeSession"){
							$("#newRollNo").val(msg2[1])
							$("#sessionChangeBtn").prop("disabled",true);
						}else{
							$("#rollNoModal").find("#rollnoGenerate").html(msg2[1]);
							$('#rollNoModal').modal({backdrop: 'static', keyboard: false});
							$("#approvalComment3").prop("disabled",true);
							$("#studentSubmitBtn").hide();
						}
					}else{
						setTimeout(function(){
							window.close();
						}, 2000);
					}
				}else{
					var msg2 = data['message'].split("|");
					if(msg2[1] != undefined){
						showMessage(true, msg2[0]);
						if($('#actiontype').val()=="changeSession"){
							$("#newRollNo").val(msg2[1])
							$("#sessionChangeBtn").prop("disabled",true);
						}else{
							$("#rollNoModal").find("#rollnoGenerate").html(msg2[1]);
							$('#rollNoModal').modal({backdrop: 'static', keyboard: false});
							$("#approvalComment3").prop("disabled",true);
							$("#studentSubmitBtn").hide();
						}
					}else{
						var msg = data['message'].split("|");
						callDashboardPageSupAdmin('3a','dashboardContentInHTML','?moduleId=student&controllType=list&searchInput=0&openMode=&extSearch=false&feeStatus=false&studentStatus=pending');
						showMessage(false, msg[0]);
					}
				}
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function resetForm(formId){
	var sessionValue = $("#session").val();
	var studentId = $("#studentId").val();
	var userId=$("#userId").val();
	var actiontype=$("#actiontype").val();
	$('#'+formId)[0].reset();
	$('#studentName').val('');
	$('#counselorName').html('');
	$('#pincode').val('');
	$('#address').val('');
	$('#dob').val('');
	$('#motherName').val('');
	$('#fatherName').val('');
	$('#nationalty').val('0');
	$('#subjectCompId').html('')
	$('#subjectId').html('')
	$('#countSubject').text('0');
	$('#bankName').val('');
	//$('#bankStateId').val('0');
	$('#ddNo').val('');
	$('#ddDate').val('');
	$('#amount').val('');
	$('#totalFee').val('');
	$('#receiveAmt').val('');
	$('#balanceAmt').val('');
	$('#amount').val('');
	$('#chkVerified').prop('checked',false);
	$('#formStatus').val(' ');
	$('#reason').val('');
	$('#contactPNumber').val('');
	$('#contactCode').val('');
	$('#parentEmail').val('');
	$('#parentIncome').val('');
	$('#studentNumber').val('');
	$('#studentEmail').val('');
	
	$('#previousRollNo1').val('');
	$('#previousSchoolName1').val('');
	$('#previousYearOfPassing1').val('0');
	$('#previousNameOfBoard1').val('');
	$('#previousRollNo2').val('');
	$('#previousSchoolName2').val('');
	$('#previousYearOfPassing2').val('0');
	$('#previousNameOfBoard2').val('');
	
	for(index=1;index<=7;index++){
		$('#preSubMaxMarks'+index).val('0');
		$('#preSubPraMarks'+index).val('');
		$('#preSubThoMarks'+index).val('');
		$('#preSubMarksCount'+index).html('');
		$('#preSubGrade'+index).html('');
		$('#preSubResult'+index).html('');
	}
	
	$('#fileFormASide1').prev('span').prev('label').removeClass('green');
	$('#fileFormASide1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileFormASide1').prev('span').html('');
	$('#fileFormASide2').prev('span').prev('label').removeClass('green');
	$('#fileFormASide2').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileFormASide2').prev('span').html('');
	$('#fileFormBSide1').prev('span').prev('label').removeClass('green');
	$('#fileFormBSide1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileFormBSide1').prev('span').html('');
	$('#fileFormBSide2').prev('span').prev('label').removeClass('green');
	$('#fileFormBSide2').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileFormBSide2').prev('span').html('');
	$('#fileIdProof').prev('span').prev('label').removeClass('green');
	$('#fileIdProof').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileIdProof').prev('span').html('');
	$('#fileDemandDraft').prev('span').prev('label').removeClass('green');
	$('#fileDemandDraft').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileDemandDraft').prev('span').html('');
	$('#fileOtherDoc1').prev('span').prev('label').removeClass('green');
	$('#fileOtherDoc1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileOtherDoc1').prev('span').html('');
	$('#fileOtherDoc2').prev('span').prev('label').removeClass('green');
	$('#fileOtherDoc2').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileOtherDoc2').prev('span').html('');
	$('#fileStudentImg').prev('span').prev('label').removeClass('green');
	$('#fileStudentImg').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileStudentImg').prev('span').html('');
	$('#fileStudentSign').prev('span').prev('label').removeClass('green');
	$('#fileStudentSign').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileStudentSign').prev('span').html('');
	$('#fileStudentThumb').prev('span').prev('label').removeClass('green');
	$('#fileStudentThumb').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileStudentThumb').prev('span').html('');
	$('#exampleFormControlFile1').prev('span').prev('label').removeClass('green');
	$('#exampleFormControlFile1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#exampleFormControlFile1').prev('span').html('');
	$('#fileMigration').prev('span').prev('label').removeClass('green');
	$('#fileMigration').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileMigration').prev('span').html('');
	$('#fileTransfer').prev('span').prev('label').removeClass('green');
	$('#fileTransfer').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileTransfer').prev('span').html('');
	$('#fileCharacter').prev('span').prev('label').removeClass('green');
	$('#fileCharacter').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileCharacter').prev('span').html('');
	$('#fileDiploma').prev('span').prev('label').removeClass('green');
	$('#fileDiploma').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileDiploma').prev('span').html('');
	$('#fileAcadmic').prev('span').prev('label').removeClass('green');
	$('#fileAcadmic').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileAcadmic').prev('span').html('');
	$('#fileAnyOther').prev('span').prev('label').removeClass('green');
	$('#fileAnyOther').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileAnyOther').prev('span').html('');
	
	$('#fileOtherMarkDoc1').prev('span').prev('label').removeClass('green');
	$('#fileOtherMarkDoc1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileOtherMarkDoc1').prev('span').html('');
	
	$('#fileuploadPreviousMarks11').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks11').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileuploadPreviousMarks11').prev('span').html('');
	$('#fileuploadPreviousMarks12').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks12').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileuploadPreviousMarks12').prev('span').html('');
	$('#fileuploadPreviousMarks21').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks21').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileuploadPreviousMarks21').prev('span').html('');
	$('#fileuploadPreviousMarks22').prev('span').prev('label').removeClass('green');
	$('#fileuploadPreviousMarks22').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileuploadPreviousMarks22').prev('span').html('');
	$('#fileParentSign').prev('span').prev('label').removeClass('green');
	$('#fileParentSign').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileParentSign').prev('span').html('');
	$('#fileParentThumb').prev('span').prev('label').removeClass('green');
	$('#fileParentThumb').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileParentThumb').prev('span').html('');
	$("#studentId").val('');
	$("#studentPreId").val('');
	$("#userId").val(userId);
	$("#actiontype").val(actiontype);
	$("#session").val(sessionValue);
}

function calculatePreviousMarks(){
	console.log("calculatePreviousMarks");	
	var previousMarksDTO = [];
	PRESERVE_PREVIOUS_MARKS_SUBJECT_IDS='';
	PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME='';
	$("#tbl_gen_marks_pre tbody tr").each(function() {
		var prevMarksDTO = {};
		var currentSubjectId=$(this).find("select.sub_id").val();
		PRESERVE_PREVIOUS_MARKS_SUBJECT_IDS += ","+currentSubjectId;
		var subName = $(this).find("select.sub_id option:selected").text();
		if(subName != '- Select Subject -'){
			PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME += ","+subName;
		}else{
			PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME += ","+'0';
		}
		prevMarksDTO['marksId'] = $(this).find("input.marksId").val();
		prevMarksDTO['subjectId'] = currentSubjectId;
		prevMarksDTO['subjectName'] = subName;
		
		var maxMarks = $(this).find("input.sub_maxid").val();
		if(maxMarks!=''){
			prevMarksDTO['maxMarks'] = parseInt(maxMarks);
		}else{
			prevMarksDTO['maxMarks'] = '0';
		}
		
		var practicalMarks = $(this).find("input.e_p_marks").val();
		if(practicalMarks!=''){
			prevMarksDTO['practicalMarks'] = parseInt(practicalMarks);
		}else{
			prevMarksDTO['practicalMarks'] = '';
		}
		
		var theoryMarks = $(this).find("input.e_t_marks").val();
		if(theoryMarks!=''){
			prevMarksDTO['theoryMarks'] = parseInt(theoryMarks);
		}else{
			prevMarksDTO['theoryMarks'] = '';
		}
		prevMarksDTO['marksCount'] = $(this).find("span.marks-count").html();
		prevMarksDTO['grade'] = $(this).find("span.grade").html();
		prevMarksDTO['result'] = $(this).find("span.result").html();
		prevMarksDTO['cumulativeGrade'] = '';
		previousMarksDTO.push(prevMarksDTO);
	});
	PRESERVE_PREVIOUS_MARKS_SUBJECT_IDS = PRESERVE_PREVIOUS_MARKS_SUBJECT_IDS.substr(1);
	PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME = PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME.substr(1);
	PRESERVE_PREVIOUS_MARKS=previousMarksDTO;
	return PRESERVE_PREVIOUS_MARKS;
}
function calculateCheckList(){
	var checkList = [];
	
	$("#optionalCheckList tbody tr").each(function() {
		var checkListDTO = {};
		checkListDTO['checkId'] = this.id;
		checkListDTO['checkStatus'] = 0;
		if($(this).find("#checkStatus").is(":checked")){
			checkListDTO['checkStatus'] = 1;
		}else{
			checkListDTO['checkStatus'] = 0;
		}
		
		checkListDTO['checkRemarks'] = encodeURIComponent($(this).find("#textRemark").val());
		checkList.push(checkListDTO);
	});
	return checkList;
}

function getRequestForAddStudent(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var addStudentListDTO = {};
	var studentSubGradeDTO = {};
	var studentPreQualficationDTO = {};
	var studentPrevGenerateMarksDTO = {};
	var checkListDTO = {};
	
	var controllType = $("#actiontype").val();
	addStudentListDTO['actionType'] = controllType;
	addStudentListDTO['studentId'] = $("#studentId").val();
	addStudentListDTO['studentPreId'] = $("#studentPreId").val();
	addStudentListDTO['studentAddBy'] = $("#studentAddBy").val();
	authentication['userId'] = $("#userId").val();
	addStudentListDTO['enrollmentNo'] = $("#enrollmentNo").text();
	if(controllType=="view"){
		addStudentListDTO['standardId'] = $("#standardRollId").val();
		addStudentListDTO['sessionYear'] = $("#yearRollId").val(); 
		addStudentListDTO['sessionMonth'] =  $("#monthRollId").val();
		if ($("#approvalComment1").val() != undefined && $("#approvalComment1").val() != '') {
			addStudentListDTO['firstApproval'] = encodeURIComponent($("#approvalComment1").val());
		}else
		if ($("#approvalComment2").val() != undefined && $("#approvalComment2").val() != '') {
			addStudentListDTO['secondApproval'] = encodeURIComponent($("#approvalComment2").val());
		}else
		if ($("#approvalComment3").val() != undefined && $("#approvalComment3").val() != '') {
			addStudentListDTO['thirdApproval'] = encodeURIComponent($("#approvalComment3").val());
		}
		addStudentListDTO['checkListDTO'] = calculateCheckList();
	}else if(controllType=="addPayment" ){
		if(USER_PERMISSION.payment || USER_ROLE == 1 || USER_ROLE == 5 || USER_ROLE == 7){
			addStudentListDTO['bankName'] = $("#bankName").val();
			addStudentListDTO['bankBranchState'] = $("#bankStateId").val();
			addStudentListDTO['ddNumber'] = $("#ddNo").val();
			addStudentListDTO['ddDate'] = $("#ddDate").val();
			addStudentListDTO['totalFeeAmount'] = $("#totalFee").val();
			addStudentListDTO['receivedAmount'] = $("#receiveAmt").val();
			addStudentListDTO['balancedAmount'] = $("#balanceAmt").val();
			addStudentListDTO['amount'] = $("#amount").val();
			addStudentListDTO['isNriApplicant'] = $("#isNriApplicant").val();
			addStudentListDTO['nriFee'] = $("#nriFee").val();
			addStudentListDTO['paymentId'] = $("#paymentId").val();
			addStudentListDTO['paymentMode'] = $("#paymentMode").val();
			addStudentListDTO['paymentRef'] = $("#paymentRef").val();
			addStudentListDTO['schoolFeeType'] = $("#feeType").val();
			addStudentListDTO['schoolType'] = $("#schoolType").val();
			addStudentListDTO['standardId'] = $("#standard").val();
			addStudentListDTO['school'] = $("#schoolIds").val();
		}
	}else if(controllType=="changeSession"){
		if(USER_ROLE == 5 || USER_PERMISSION.changeSession){
			addStudentListDTO['sessionValue'] = $("#session").val();
			var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
			addStudentListDTO['sessionYear'] = sessionValue[0];
			addStudentListDTO['sessionMonth'] = sessionValue[1];
			addStudentListDTO['standardId'] = $('#standardId').val();
			addStudentListDTO['countryId'] = $('#countryId').val();
		}
	}else{
		if(USER_ROLE == 4){
			addStudentListDTO['bankName'] = $("#bankName").val();
			addStudentListDTO['bankBranchState'] = $("#bankStateId").val();
			addStudentListDTO['ddNumber'] = $("#ddNo").val();
			addStudentListDTO['ddDate'] = $("#ddDate").val();
			addStudentListDTO['totalFeeAmount'] = $("#totalFee").val();
			addStudentListDTO['receivedAmount'] = $("#receiveAmt").val();
			addStudentListDTO['balancedAmount'] = $("#balanceAmt").val();
			addStudentListDTO['amount'] = $("#amount").val();
			addStudentListDTO['isNriApplicant'] = $("#isNriApplicant").val();
			addStudentListDTO['nriFee'] = $("#nriFee").val();
			addStudentListDTO['paymentId'] = $("#paymentId").val();
			addStudentListDTO['paymentMode'] = $("#paymentMode").val();
			addStudentListDTO['paymentRef'] = $("#paymentRef").val();
			addStudentListDTO['schoolFeeType'] = $("#feeType").val();
			addStudentListDTO['schoolType'] = $("#schoolType").val();
			addStudentListDTO['standardId'] = $("#standard").val();
			addStudentListDTO['school'] = $("#schoolIds").val();
		}
		if($('#session').val()!=undefined){
			addStudentListDTO['sessionValue'] = $("#session").val();
			var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
			addStudentListDTO['sessionYear'] = sessionValue[0];
			addStudentListDTO['sessionMonth'] = sessionValue[1];
		}
		
		addStudentListDTO['standardId'] = $("#standardId").val();
		addStudentListDTO['studentName'] = $("#studentName").val();
		addStudentListDTO['gender'] = $("#gender").val();
		addStudentListDTO['school'] = $("#schoolId").val();
		addStudentListDTO['category'] = $("#category").val();
		addStudentListDTO['countryId'] = $("#countryId").val();
		addStudentListDTO['stateId'] = $("#stateId").val();
		addStudentListDTO['cityId'] = $("#cityId").val();
		addStudentListDTO['pincode'] = $("#pincode").val();
		if ($("#address").val() != undefined && $("#address").val() != '') {
			addStudentListDTO['address'] = encodeURIComponent($("#address").val());
		}
		addStudentListDTO['recommendedBy'] = $("#recommendBy").val();
		
		if ($("#fatherName").val() != undefined && $("#fatherName").val() != '') {
			addStudentListDTO['fathername'] = encodeURIComponent($("#fatherName").val());
		}
		if ($("#motherName").val() != undefined && $("#motherName").val() != '') {
			addStudentListDTO['motherName'] = encodeURIComponent($("#motherName").val());
		}
		//addStudentListDTO['motherName'] = $("#motherName").val();
		//addStudentListDTO['fathername'] = $("#fatherName").val();
		addStudentListDTO['dob'] = $("#dob").val();
		addStudentListDTO['nationalityId'] = $("#nationalty").val();
		addStudentListDTO['parentEmail'] = $("#parentEmail").val();
		addStudentListDTO['parentIncome'] = $("#parentIncome").val();
		addStudentListDTO['studentNumber'] = $("#studentNumber").val();
		addStudentListDTO['studentEmail'] = $("#studentEmail").val();
		addStudentListDTO['courseType'] = $("#courseType").val();
		
		addStudentListDTO['contactNumber'] = $("#contactPNumber").val();
		addStudentListDTO['isdCode'] = $("#contactCode").val();
		
		addStudentListDTO['subjectId'] = calculateCurrentSubjects();
		
		var checkVerify = "0";
		if($("#chkVerified").is(":checked")){
			checkVerify = "1";
		}
		addStudentListDTO['backgroundVerifystatus'] = checkVerify;
		addStudentListDTO['formStatus'] = $("#formStatus").val();
		
		
		var imageName = $("#fileFormASide1").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['formFrontSideADoc'] = imageName;
			}
		}
		
		var imageName = $("#fileFormASide2").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['formBackSideADoc'] = imageName;
			}
		}
		
		var imageName = $("#fileFormBSide1").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['formFrontSideBDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileFormBSide2").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['formBackSideBDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileIdProof").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['studentIdProofDoc'] = imageName;
			}
		}
		
//		var imageName = $("#fileDob").prev('span').prev('label').text().trim()
//		if(imageName!='' && imageName!='Click here to upload'){
//			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
//				
//			}else{
//				addStudentListDTO['dobProof'] = imageName;
//			}
//		}
		var imageName = $("#fileDemandDraft").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['demandDraftDoc'] = imageName;
			}
		}
		var imageName = $("#fileOtherDoc1").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['otherDocs1Doc'] = imageName;
			}
		}
		
		var imageName = $("#fileOtherDoc2").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['otherDocs2Doc'] = imageName;
			}
		}
		var imageName = $("#fileStudentImg").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['studentImageDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileStudentSign").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg']) == -1){
				
			}else{
				addStudentListDTO['studentSignDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileStudentThumb").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg']) == -1){
				
			}else{
				addStudentListDTO['studentThumbDoc'] = imageName;
			}
		}
		
		var imageName = $("#exampleFormControlFile1").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['markSheetDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileMigration").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['migrationDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileTransfer").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['tranferDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileCharacter").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['characterDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileDiploma").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['diplomaDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileAcadmic").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['academicDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileAnyOther").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['anyOtherDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileOtherMarkDoc1").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				addStudentListDTO['otherMarkDocs1Doc'] = imageName;
			}
		}
		
		var imageName = $("#fileParentSign").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg']) == -1){
				
			}else{
				addStudentListDTO['parentSignDoc'] = imageName;
			}
		}
		
		var imageName = $("#fileParentThumb").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg']) == -1){
				
			}else{
				addStudentListDTO['parentThumbDoc'] = imageName;
			}
		}
		if($("#reason").val()!="" && $("#reason").val()!=undefined){
			addStudentListDTO['comment'] = encodeURIComponent($("#reason").val());
		}else{
			addStudentListDTO['comment']="";
		}
		
		studentPreQualficationDTO = getPreviousQualification(true);
		addStudentListDTO['markSheet1'] = studentPreQualficationDTO['classMarksheet'];
		addStudentListDTO['otherDoc1'] = studentPreQualficationDTO['otherDocs'];
		addStudentListDTO['markSheet2'] = studentPreQualficationDTO['classMarksheet1'];
		addStudentListDTO['otherDoc2'] = studentPreQualficationDTO['otherDocs1'];
		studentPreQualficationDTO['studentPrevGenerateMarksDTO'] = calculatePreviousMarks();
		addStudentListDTO['prevQualificationData'] = JSON.stringify(studentPreQualficationDTO);
		addStudentListDTO['countryRollId'] = $("#countryId").val();
		addStudentListDTO['isNriApplicant'] = $("#isNriApplicant").val();
		addStudentListDTO['attendanceStatus'] = $("#attendanceStatus").val();
	}
	
	console.log("addStudentListDTO => "+JSON.stringify(addStudentListDTO));
	
	requestData['addStudentDTO'] = addStudentListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForAddStudent(formId,moduleId, MIN_SUBJECT, MAX_SUBJECT){
	if($("#actiontype").val()=="changeSession"){
		if ($("#session").val()==null || $("#session").val()==0 ) {
			showMessage(true, 'session is required');
			return false
		}
	}else if($("#actiontype").val()=="view"){
		if ($("#approvalComment1").val() == " " && $("#approvalComment2").val() == " " && $("#approvalComment3").val() == " ") {
			showMessage(true, 'approvalComment1 is not defined');
			return false
		}else if ($("#approvalComment1").val() == undefined && $("#approvalComment2").val() == " "  && $("#approvalComment3").val() == " ") {
			showMessage(true, 'approvalComment2 is not defined');
			return false
		}else if ($("#approvalComment1").val() == undefined && $("#approvalComment2").val() == undefined  && $("#approvalComment3").val() == " ") {
			showMessage(true, 'approvalComment3 is not defined');
			return false
		}
	}else if($("#actiontype").val()=="addPayment"){
		if($("#bankName").val()=="") {
			showMessage(true, 'Bank name is required');
			return false
		}
		if ($("#bankState").val()==null) {
			showMessage(true, 'Bank State is required');
			return false
		}
		if($("#ddNo").val()=="") {
			showMessage(true, 'Cheque/DD/Payment No. is required');
			return false
		}
		if ($("#ddDate").val()=="") {
			showMessage(true, 'Cheque/DD/Payment Date: is required');
			return false
		}
		if(($("#amount").val()=="") || ($("#amount").val()==0)) {
			showMessage(true, 'Actual Student Fee is required');
			return false
		}
		if($('#isNriApplicant').val()==1){
			if(($("#nriFee").val()=="") || ($("#nriFee").val()==0)) {
				showMessage(true, 'NRI Fee is required');
				return false
			}
		}
		
		
		
		/*if($('#schoolType').val()==1){
			if(($("#feeType").val()==null) || ($("#feeType").val()=="0")) {
				showMessage(true, 'Fee type is required');
				return false
			}
		}*/
		
		if(($("#totalFee").val()=="") || ($("#receiveAmt").val()==null)) {
			showMessage(true, 'Total Amount received from School/Consultant true is required');
			return false
		}
		if(($("#receiveAmt").val()=="") || ($("#receiveAmt").val()==0)) {
			showMessage(true, 'Amount Received is required');
			return false
		}
		if(($("#balanceAmt").val()=="") || ($("#balanceAmt").val()==null)) {
			showMessage(true, 'Balance Amount from School/Consultant is required');
			return false
		}
	}else if($("#actiontype").val()=="add" || $("#actiontype").val()=="edit"){
		
		if ($("#enrollmentNo").text()=="") {
			showMessage(true, 'Enrolment number is required');
			return false
		}
		if(USER_ROLE!=4 && !STUDENT_UPLOADED_BY_SCHOOL){
			if ($("#recommendBy").val()==null || $("#recommendBy").val()==0 ) {
				showMessage(true, 'Recommend by is required');
				return false
			}
		}
		if ($("#studentName").val()=="") {
			showMessage(true, 'Student name is required');
			return false
		}
		if ($("#fatherName").val()==undefined || $("#fatherName").val()=="") {
			showMessage(true, 'Father Name is required');
			return false
		}
		if ($("#motherName").val()==undefined || $("#motherName").val()=="") {
			showMessage(true, 'Mother Name is required');
			return false
		}
		if ($("#dob").val()=="") {
			showMessage(true, 'Date of Birth is required');
			return false
		}
		
		
		
		if ($("#gender").val()==null || $("#gender").val()==0 ) {
			showMessage(true, 'Gender is required');
			return false
		}
		if ($("#category").val()==null ||  $("#category").val()==0 ) {
			showMessage(true, 'Category is required');
			return false
		}
		if ($("#nationalty").val()==null || $("#nationalty").val()==0 ) {
			showMessage(true, 'Nationality is required');
			return false
		}
		if ($("#countryId").val()==null || $("#countryId").val()==0 ) {
			showMessage(true, 'Country is required');
			return false
		}
		if ($("#stateId").val()==null || $("#stateId").val()==0 ) {
			showMessage(true, 'State is required');
			return false
		}
		if ($("#cityId").val()==null || $("#cityId").val()==0 ) {
			showMessage(true, 'City is required');
			return false
		}
		if ($("#pincode").val()=="") {
			showMessage(true, 'zipcode is required');
			return false
		}
		if ($("#address").val()==undefined  || $("#address").val()=="") {
			showMessage(true, 'Address is required');
			return false
		}
		if ($("#contactPNumber").val()=="") {
			showMessage(true, 'Contact Number is required');
			return false
		}
		if ($("#parentEmail").val()!="") {
			if (!validateEmail($("#parentEmail").val().trim())) {
				showMessage(true, 'Parent Email Id is invalid');
				return false
			}
		}
		if ($("#studentEmail").val()!="") {
			if (!validateEmail($("#studentEmail").val().trim())) {
				showMessage(true, 'Student Email Id is invalid');
				return false
			}
		}
		if(USER_ROLE!=4){
			if ($("#schoolId").val()==0 || $("#schoolId").val()==null) {
				showMessage(true, 'Please select school');
				return false
			}
    	}
		
		if ($("#courseType").val()==null || $("#courseType").val()==0 ) {
			showMessage(true, 'Course type is required');
			return false
		}
		if ($("#standardId").val()==null || $("#standardId").val()==0 ) {
			showMessage(true, 'Standard is required');
			return false
		}
		if(parseInt($("#countSubject").text())<parseInt(MIN_SUBJECT)){
			showMessage(true, 'Please select at least '+MIN_SUBJECT+' subject.');
			return false
		}else if(parseInt($("#countSubject").text())>parseInt(MAX_SUBJECT)){
			showMessage(true, 'You can select maximum '+MAX_SUBJECT+' subject.');
			return false
		}
		if ($("#previousYearOfPassing1").val()==null || $("#previousYearOfPassing1").val()==0 ) {
			showMessage(true, 'Please fill previous qualification');
			return false
		}
		
		if ($("#passingPercentage1").val()==undefined || $("#passingPercentage1").val()=='' ) {
			showMessage(true, 'Please enter Percentage Scored in previous qualification');
			return false
		}
		var passingPercentage = parseFloat($("#passingPercentage1").val());
		if(passingPercentage>100 || passingPercentage <0){
			showMessage(true, 'Obtained marks percentage shouldn\'t more than 100.00');
			return false
		}
		if($('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
			if ($("#passingPercentage2").val()==undefined || $("#passingPercentage2").val()=='' ) {
				showMessage(true, 'Please enter Percentage Scored in previous qualification');
				return false
			}
			passingPercentage = parseFloat($("#passingPercentage2").val());
			if(passingPercentage>100 || passingPercentage <0){
				showMessage(true, 'Obtained marks percentage shouldn\'t more than 100.00');
				return false
			}
		}
		
		var imageName = $("#fileStudentSign").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
		if(imageName!='' && imageName!='click here to upload'){
			if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg']) == -1){
				showMessage(true, 'Please upload Student Sign in following formats (jpg, jpeg or png).');
				return false
			}
		}
		var imageName = $("#fileStudentThumb").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
		if(imageName!='' && imageName!='click here to upload'){
			if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg']) == -1){
				showMessage(true, 'Please upload Student Thumb in following formats (jpg, jpeg or png).');
				return false
			}
		}
		
		var imageName = $("#fileParentSign").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
		if(imageName!='' && imageName!='click here to upload'){
			if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg']) == -1){
				showMessage(true, 'Please upload Parent Sign in following formats (jpg, jpeg or png).');
				return false
			}
		}
		var imageName = $("#fileParentThumb").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
		if(imageName!='' && imageName!='click here to upload'){
			if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg']) == -1){
				showMessage(true, 'Please upload Parent Thumb in following formats (jpg, jpeg or png).');
				return false
			}
		}
		
		if(USER_ROLE!=4 ){
			if ($("#chkVerified").is(":checked")) {
				
			}else{
				showMessage(true, 'Please checked verification');
				return false
			}
			
			if ($("#formStatus").val() == null || $("#formStatus").val()==' ' || $("#formStatus").val()=='0' ) {
				showMessage(true, 'Please select status');
				return false
			}
			if ($("#reason").val()==undefined || $("#reason").val()=="") {
				showMessage(true, 'Comment is required');
				return false
			}
		}
	}
	return true;
}

function calculatePreviousMarksForCalculation(modalId){
	/*
	var selectedSubjectCount=PRESERVE_CURRENT_SUBJECTS.split(',').length;
	var msg ='';
	if(selectedSubjectCount<5){
		msg ='Please select at least 5 subjects';
	}else if(selectedSubjectCount>6){
		msg ='Please select at most 6 subjects';
	}
	if(selectedSubjectCount<5 || selectedSubjectCount>6){
		var warningYes = "$('#subjectSelectionWarningMessageId').modal('hide');";
		var warningNo = "$('#"+modalId+"').modal('hide');$('#subjectSelectionWarningMessageId').modal('hide');";
		$('#warningYesSubjectSelection').attr('onclick',warningYes);
		$('#warningNoSubjectSelection').attr('onclick',warningNo);
		$('#subjectSelectionWarningMessageIdText').text(msg);
		$('#subjectSelectionWarningMessageId').modal({backdrop: 'static', keyboard: false});
		return false;
	}
	*/
	var flag = calcMarks();
	if(flag){
		calculatePreviousMarks();
		var subjectFlag = isSame();
		if(subjectFlag){
			$('#'+modalId).modal('hide');
		}else{
			msg ='Previous subjects are different from current subjects';
			var warningYes = "$('#"+modalId+"').modal('hide');$('#warningMessageId').modal('hide');";
			var warningNo = "$('#warningMessageId').modal('hide');";
			$('#warningYes').attr('onclick',warningYes);
			$('#warningNo').attr('onclick',warningNo);
			$('#warnningMessageText').text(msg);
			$('#warningMessageId').modal({backdrop: 'static', keyboard: false});	
		}
		return true;
	}
	return false;
}
function isSame(){
	var arr1 = '';
	var arr2 = '';
	if($('#standardId').val()==1 || $('#standardId').val()==5 || $('#standardId').val()==6 || $('#standardId').val()==7 ){
		arr1 = PRESERVE_CURRENT_SUBJECTS_NAME.split(',');
		arr2 = PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME.split(',');
	}else if($('#standardId').val()==2 || $('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
		arr1 = PRESERVE_CURRENT_SUBJECTS.split(',');
		arr2 = PRESERVE_PREVIOUS_MARKS_SUBJECT_IDS.split(',');
	}
	
	var arr1Sorted = arr1.sort();
	var arr2Sorted = arr2.sort();
	var removeItem = 0;
	arr2Sorted = jQuery.grep(arr2Sorted, function(value) {
	  return value != removeItem;
	});
	
	var flagCheck=true;
	for (var i=0; i<=arr1Sorted.length; i++){
		if(arr1Sorted[i]!=arr2Sorted[i]){
			flagCheck=false;
			break;
		}else{
			flagCheck=true;
		}
	}
	return flagCheck;
}
function calcMarks(krntakaStatus, sessionYear, sessionMonth) {
	var specialSchool=false;
	if(krntakaStatus!=undefined && krntakaStatus){
		specialSchool=true;
	}
	var isSuccess=true;
	var fin_tot = 0;
	var fin_max_marks = 0;
	var final_result = "Pass";
	var percent = 0;
	var rowCount = $('#tbl_gen_marks tbody tr').length;
	rowCount = (rowCount / 2);
	var i = 1;
	var totalMark = 0;
	$("#tbl_gen_marks tbody tr").each(function() {
		// if(i<=rowCount){
		var p_marks = 0;
		var t_marks = 0;
		var p_p_marks = 0; // pract pass marks
		var t_p_marks = 0; // theory pass marks
		var p_m_marks = 0; // pract max marks
		var t_m_marks = 0; // theory max marks
		var tot = 0;
		var max_tot = 0;
		var min_tot = 0;
		var grade = 'F';
		var result = 'Fail';
		var isEligibleForPractical=parseInt($(this).find("input.marksSubPractId").val());
		var attendance = parseInt($(this).find("select.attendance option:selected").val());
		if(attendance==1 || attendance==2 || attendance==3){
			if(attendance==1 || attendance==3){
				if ($(this).find("input.e_t_marks").length > 0) {
					if ($(this).find("input.e_t_marks").val().length > 0){
						t_marks = parseInt($(this).find("input.e_t_marks").val());
					}
					t_p_marks = parseInt($(this).find("input.e_t_marks").attr("data-pm"));
					t_m_marks = parseInt($(this).find("input.e_t_marks").attr("data-mm"));
				}
			}
			if (t_marks < 0 || t_marks > t_m_marks) {
				t_marks = parseInt($(this).find("span.marks-count").text()) - p_marks;
				$(this).find("input.e_t_marks").val(t_marks);
			}
			if(attendance==1 || attendance==2){
				if ($(this).find("input.e_p_marks").length > 0) {
					if ($(this).find("input.e_p_marks").val().length > 0){
						p_marks = parseInt($(this).find("input.e_p_marks").val());
						isEligibleForPractical=1;
					}
					p_p_marks = parseInt($(this).find("input.e_p_marks").attr("data-pm"));
					p_m_marks = parseInt($(this).find("input.e_p_marks").attr("data-mm"));
				}
			}
			if (p_marks < 0 || p_marks > p_m_marks) {
				p_marks = parseInt($(this).find("span.marks-count").text()) - t_marks;
				$(this).find("input.e_p_marks").val(p_marks);
			}
		}
		tot = p_marks + t_marks;
		max_tot = p_m_marks + t_m_marks;
		min_tot = p_p_marks + t_p_marks;
		var isvalidMarks=true;
		if(isEligibleForPractical==1){
			if(p_marks>30){
				isvalidMarks=false;
			}
			if(t_marks>70){
				isvalidMarks=false;
			}
		}else{
			if(t_marks>100){
				isvalidMarks=false;
			}
		}
		if(tot>100){
			isvalidMarks=false;
		}
		var max_mark = $(this).find("input.sub_maxid").val();
		fin_max_marks = fin_max_marks + parseInt(max_mark);
		
		if(isvalidMarks){
			if(specialSchool){
				if(sessionYear>=2020){
					if(sessionMonth<10){
						grade = getGradeNew(tot, min_tot, attendance);
					}else{
						grade = getGrade(tot, min_tot, attendance);
					}
				}else{
					grade = getGradeNew(tot, min_tot, attendance);
				}
			}else{
				grade = getGrade(tot, min_tot, attendance);
			}
			result = getResult(grade, attendance);
			console.log('tot '+tot+' min_tot '+min_tot+' grade '+grade+' result '+result)
		}else{
			if(attendance==1){
				$(this).find("input.e_p_marks").val('');
				$(this).find("input.e_t_marks").val('');
			}else if(attendance==2){
				$(this).find("input.e_t_marks").val('AB');
				$(this).find("input.e_p_marks").val(0);
			}else if(attendance==3){
				$(this).find("input.e_t_marks").val(0);
				$(this).find("input.e_p_marks").val('AB');
			}
			$(this).find("span.marks-count").html(0);
			tot = tot - (p_marks+t_marks);
			
		}
		if(attendance==0){
			$(this).find("span.marks-count").html('-');
			$(this).find("span.grade").html('-');
			$(this).find("span.result").html('-');
		}else{
			$(this).find("span.marks-count").html(tot);
			$(this).find("span.grade").html(grade);
			$(this).find("span.result").html(result);
		}
		fin_tot = fin_tot + tot;
		percent = (fin_tot * 100) / fin_max_marks;
		console.log('isEligibleForPractical '+isEligibleForPractical+' index '+i+' fin_tot '+fin_tot+' fin_max_marks '+fin_max_marks+' percent '+percent+ ' isvalidMarks '+isvalidMarks);
		if(grade=='F'){
			totalMark = totalMark + 1;
		}
		if (totalMark>0 && totalMark <= 2) {
			final_result = "Compartment";
		}else if (totalMark>0 && totalMark >2 ) {
			final_result = "Fail";
		} else {
			final_result = "Pass";
		}
		$("span.tot_marks").html(fin_tot);
		$("span.fin_percent").html(percent.toFixed(2));
		$("span.fin_result").html(final_result);
		i++;
	});
	
	// ///////////////////////////Pre
	var allSubjectIds=[];
	$("#tbl_gen_marks_pre tbody tr").each(function() {
		// if(i<=rowCount){
		var subjectId = 0;
		var p_marks = 0;
		var t_marks = 0;
		var max_marks_each_subject=0;
		var p_marks_pre = 0;
		var t_marks_pre = 0;
		var p_p_marks_pre = 0; // pract pass marks
		var t_p_marks_pre = 0; // theory pass marks
		var p_m_marks_pre = 0; // pract max marks
		var t_m_marks_pre = 0; // theory max marks

		var grade= 'F';
		var tot_pre = 0;
		var max_tot_pre = 0;
		var min_tot_pre = 0;
		var isPMarksEntered=false;
		var isTMarksEntered=false;
		$(this).removeClass('tr-red');
		if ($(this).find("select.sub_id").val() > 0){
			subjectId = $(this).find("select.sub_id").val();
		}
		if ($(this).find("input.e_p_marks").val()!='') {
			isPMarksEntered=true;
			if ($(this).find("input.e_p_marks").val().length > 0){
				p_marks_pre = parseInt($(this).find("input.e_p_marks").val());
			}
			if ($(this).find("input.sub_maxid").val().length > 0){
				max_marks_each_subject = parseInt($(this).find("input.sub_maxid").val());
			}
			p_p_marks_pre = parseInt($(this).find("input.e_p_marks").attr("data-pm"));
			p_m_marks_pre = parseInt($(this).find("input.e_p_marks").attr("data-mm"));
		}
		if ($(this).find("input.e_t_marks").val()!='') {
			isTMarksEntered=true;
			if ($(this).find("input.e_t_marks").val().length > 0){
				t_marks_pre = parseInt($(this).find("input.e_t_marks").val());
			}
			if ($(this).find("input.sub_maxid").val().length > 0){
				max_marks_each_subject = parseInt($(this).find("input.sub_maxid").val());
			}
			t_p_marks_pre = parseInt($(this).find("input.e_t_marks").attr("data-pm"));
			t_m_marks_pre = parseInt($(this).find("input.e_t_marks").attr("data-mm"));
		}
		var flag = true;
		if(parseInt(subjectId)==0 && parseInt(p_marks_pre)==0 && parseInt(t_marks_pre)==0){
			flag = false;
		}else{
			if( parseInt(p_marks_pre+t_marks_pre) > parseInt(max_marks_each_subject)
					|| parseInt(p_marks_pre) > parseInt(max_marks_each_subject)
					|| parseInt(t_marks_pre) > parseInt(max_marks_each_subject)
					|| parseInt(subjectId) < 1 || subjectId ==''
			){
				$(this).addClass('tr-red');
				isSuccess=false;
			}
			if($('#standardId').val()==2 || $('#standardId').val()==8 || $('#standardId').val()==9 || $('#standardId').val()==10){
				if((p_marks_pre>30) || (p_marks_pre!=0 && t_marks_pre>70) || parseInt(p_marks_pre+t_marks_pre)>100){
					$(this).addClass('tr-red');
					isSuccess=false;
				}
			}
			allSubjectIds.push(subjectId);
		}
		
		var sortedSubjectIds = allSubjectIds.sort();
		var results = [];
		for (var i = 0; i < allSubjectIds.length - 1; i++) {
			if (sortedSubjectIds[i + 1] == sortedSubjectIds[i]) {
				results.push(sortedSubjectIds[i]);
			}
		}
		$('#previousMarksError').html('');
		if(flag){
			if(results.length>0){
				$(this).addClass('tr-red');
				$('#previousMarksError').html('You have selected same subject multiple times');
				isSuccess=false;
			}
		}
		tot_pre = p_marks_pre + t_marks_pre;
		max_tot_pre = p_m_marks_pre + t_m_marks_pre;
		min_tot_pre = p_p_marks_pre + t_p_marks_pre;

		fin_tot = fin_tot + tot_pre;
		if (subjectId > 0) {
			var max_mark = $(this).find("input.sub_maxid").val();
			fin_max_marks = fin_max_marks + parseInt(max_mark);
		}
		if(!isTMarksEntered && !isPMarksEntered){
			$(this).find("span.marks-count").html('');
		}else{
			$(this).find("span.marks-count").html(tot_pre);
		}
		if(specialSchool){
			 grade = getGradeNew(tot_pre, min_tot_pre, 1);
		}else{
			 grade = getGrade(tot_pre, min_tot_pre, 1);
		}
		$(this).find("span.grade").html(grade);
		var result_pre = getResult(grade, 1);
		var final_result_pre = "Pass"
		if (p_p_marks_pre > p_marks_pre || t_p_marks_pre > t_marks_pre) {
			result_pre = "Fail"
			final_result_pre = "Fail";
		}
		//fin_tot = fin_tot + tot;
		percent = (fin_tot * 100) / fin_max_marks;
		//console.log("max_marks_each_subject => "+fin_max_marks);
		if(subjectId>0){
			if(grade=='F'){
				totalMark = totalMark + 1;
			}
			if (totalMark>0 && totalMark <= 2) {
				final_result = "Compartment";
			}else if (totalMark>0 && totalMark >2 ) {
				final_result = "Fail";
			} else {
				final_result = "Pass";
			}
		}
		
		
		$(this).find("span.result").html(result_pre);
		$("span.tot_maxmarks").html(fin_max_marks);
		$("span.tot_marks").html(fin_tot);
		$("span.fin_percent").html(percent.toFixed(2));
		$("span.fin_result").html(final_result);
		i = i + 1;
		// }
	});
//	if(isSuccess){
//		$('#previousMarksModal').modal('hide');
//	}
	return  isSuccess;
}

function getGrade(total, passing_marks, attendance) {
	if(attendance!=1){
		return 'F';
	}
	switch (true) {
	case (total == ''):
		return "F";
		break;
	case (total >= 96):
		return "A+";
		break;
	case (total >= 93):
		return "A";
		break;
	case (total >= 89):
		return "A-";
		break;
	case (total >= 86):
		return "B+";
		break;
	case (total >= 83):
		return "B";
		break;
	case (total >= 79):
		return "B-";
		break;
	case (total >= 76):
		return "C+";
		break;
	case (total >= 73):
		return "C";
		break;
	case (total >= 69):
		return "C-";
		break;
	case (total >= 66):
		return "D+";
		break;
	case (total >= 63):
		return "D";
		break;
	case (total >= 60):
		return "D-";
		break;
	case (total >= passing_marks):
		return "E";
		break;
	default:
		return "F";
		break;
	}
}

function getGradeNew(total, passing_marks, attendance) {
	if(attendance!=1){
		return 'F';
	}
	switch (true) {
	case (total == ''):
		return "F";
		break;
	case (total >= 92):
		return "A+";
		break;
	case (total >= 84):
		return "A";
		break;
	case (total >= 75):
		return "B+";
		break;
	case (total >= 67):
		return "B";
		break;
	case (total >= 58):
		return "C+";
		break;
	case (total >= 50):
		return "C";
		break;
	case (total >= 41):
		return "D+";
		break;
	case (total >= 33):
		return "D";
		break;
	case (total >= passing_marks):
		return "E";
		break;
	default:
		return "F";
		break;
	}
}
function getResult(grade, attendance) {
	if(attendance!=1){
		return 'Fail';
	}
	switch (grade) {
	case 'E':
		return 'Fail';
		break;
	case 'F':
		return 'Fail';
		break;
	default:
		return 'Pass';
		break;
	}
}

function validateRequestForPreviousSubjectList(){
	return true;
}

function showStudentListingWithQueries(elementId, argument, isB2BSchool){
	//if(isB2BSchool!=''){
		var isDataTable = $.fn.dataTable.isDataTable('#'+elementId);
		console.log(elementId+ ' = ' +isDataTable);
		console.log('isB2BSchool = ' +isB2BSchool);
		if(isDataTable){
			$('#'+elementId).dataTable().fnDestroy();
		}
	//}
	
	//$('#'+elementId).empty();
	
	if(isB2BSchool==1){
		$('#'+elementId).DataTable( {
			"select": true,
	        "processing": true,
	        "serverSide": true,
	        "searching": false,
	        "pageLength": 10,
	        "ajax": {
	            "url": CONTEXT_PATH+"dashboard/manage-student-content-1"+argument,
	            "data": function ( data ) {
	            }
	        },
	        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	        	if (aData['studentDocs'] && aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('all-docs');
	        	}else if (aData['studentDocs'] && aData['studentAmount'] && !aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('doc-amt');
	        	}else if (!aData['studentDocs'] && aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('amt-quly');
	        	}else if (aData['studentDocs'] && !aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('quly-doc');
	        	}else if (aData['studentDocs'] && !aData['studentAmount'] && !aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('studentDocs');
	        	}else if (!aData['studentDocs'] && aData['studentAmount'] && !aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('studentAmount');
	        	}else if (!aData['studentDocs'] && !aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('studentQualification');
	        	}
	        	if(aData['marksStatus']=='Y'){
	        		$('td:first-child + td', nRow).addClass('green');
	        	}
	        	if(aData['attendanceStatus']=='N'){
	        		$('td:first-child + td', nRow).addClass('orange');
	        	}
	        },
	        "columns": [
		         { "data": "sno", "name" : "sno", "title" : "S.No"  },
		         { "data": "rollNo", "name" : "rollNo" , "title" : "Roll No"},
		         { "data": "studentName", "name" : "studentName" , "title" : "Student Name"},
		         { "data": "standardName", "name" : "standardName" , "title" : "Standard Name"},
		         //{ "data": "formStatus", "name" : "formStatus" , "title" : "Status"},
//		         { "data": "addedDate", "name" : "addedDate" , "title" : "Added Date"},
		         { "data": "action", "name" : "action" , "title" : "Action"}
	         ]
		});
	}else{
		$('#'+elementId).DataTable( {
			"select": true,
	        "processing": true,
	        "serverSide": true,
	        "searching": false,
	        "pageLength": 10,
	        "ajax": {
	            "url": CONTEXT_PATH+"dashboard/manage-student-content-1"+argument,
	            "data": function ( data ) {
	            	console.log("")
	            }
	        },
	        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	        	if (aData['studentDocs'] && aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('all-docs');
	        	}else if (aData['studentDocs'] && aData['studentAmount'] && !aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('doc-amt');
	        	}else if (!aData['studentDocs'] && aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('amt-quly');
	        	}else if (aData['studentDocs'] && !aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('quly-doc');
	        	}else if (aData['studentDocs'] && !aData['studentAmount'] && !aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('studentDocs');
	        	}else if (!aData['studentDocs'] && aData['studentAmount'] && !aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('studentAmount');
	        	}else if (!aData['studentDocs'] && !aData['studentAmount'] && aData['studentQualification']){
	        		$('td:first-child', nRow).addClass('studentQualification');
	        	}
	        	if(aData['marksStatus']=='Y'){
	        		$('td:first-child + td', nRow).addClass('green');
	        	}
	        	if(aData['attendanceStatus']=='N'){
	        		$('td:first-child + td', nRow).addClass('orange');
	        	}
	        },
	        "columns": [
		         { "data": "sno", "name" : "sno", "title" : "S.No"  },
		         { "data": "rollNo", "name" : "rollNo" , "title" : "Roll No"},
		         { "data": "studentName", "name" : "studentName" , "title" : "Student Name"},
		         { "data": "consultantName", "name" : "consultantName" , "title" : "Added By"},
		         { "data": "schoolName", "name" : "schoolName" , "title" : "School Name"},
		         { "data": "standardName", "name" : "standardName" , "title" : "Standard Name"},
		         { "data": "formStatus", "name" : "formStatus" , "title" : "Status"},
		         { "data": "addedDate", "name" : "addedDate" , "title" : "Added Date"},
		         { "data": "action", "name" : "action" , "title" : "Action"}
	         ]
		});
	}
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function uploadStudentDocuments(formId, moduleId, msg, openMode){
	if(!validateRequestForStudentDocs(formId,moduleId)){
		return false;
	}
	var warningYes = "saveStudentDocs('"+formId+"','"+moduleId+"','"+msg+"','"+openMode+"')";
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text(msg);
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}

function saveStudentDocs(formId, moduleId, msg, openMode) {
	hideMessage('');
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','save-student-docs'),
		data : JSON.stringify(getRequestForStudentDocs(formId, moduleId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			$('#warningMessageId').modal('hide');
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
				$("#uploadPDF").hide();
				$("#uploadPDF").disabled();
			} else {
				showMessage(false, data['message']);
				$("#uploadPDF").hide();
				if(openMode=='new'){
					setTimeout(function(){
						window.close();
					}, 2000);
				}
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
function getRequestForStudentDocs(formId,moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
		
	var studentPdfUploadDTO = {};
	
	studentPdfUploadDTO['studentId'] = $("#studentId").val();
	var imageName = $("#fileFormASide1").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPdfUploadDTO['formFrontSideA'] = imageName;
		}
	}
	
	var imageName = $("#fileFormASide2").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPdfUploadDTO['formBackSideA'] = imageName;
		}
	}
	
	var imageName = $("#fileFormBSide1").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPdfUploadDTO['formFrontSideB'] = imageName;
		}
	}
	
	var imageName = $("#fileFormBSide2").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			studentPdfUploadDTO['formBackSideB'] = imageName;
		}
	}

	requestData['studentPdfUploadDTO'] = studentPdfUploadDTO;
	request['requestData'] = requestData;
	return request;
}
function validateRequestForStudentDocs(formId,moduleId){
	var studentPdfUploadDTO = {};
	
	var fileFormASide1 = $("#fileFormASide1").prev('span').prev('label').text().trim();
	var fileFormASide2 = $("#fileFormASide2").prev('span').prev('label').text().trim();
	var fileFormBSide1 = $("#fileFormBSide1").prev('span').prev('label').text().trim();
	var fileFormBSide2 = $("#fileFormBSide2").prev('span').prev('label').text().trim();
	
	if(fileFormASide1=='Click here to upload' && fileFormASide2=='Click here to upload' && fileFormBSide1=='Click here to upload' && fileFormBSide2=='Click here to upload'){
		showMessage(true, 'please upload atleast one docs');
		return false
	}
	if(fileFormASide1!='' && fileFormASide1!='Click here to upload'){
		if ($.inArray($.trim(fileFormASide1.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			showMessage(true, 'please upload only correct format extension of fileFormASide1');
			return false
		}
	}
	if(fileFormASide2!='' && fileFormASide2!='Click here to upload'){
		if ($.inArray($.trim(fileFormASide2.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			showMessage(true, 'please upload only correct format extension of fileFormASide2');
			return false
		}
	}
	if(fileFormBSide1!='' && fileFormBSide1!='Click here to upload'){
		if ($.inArray($.trim(fileFormBSide1.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			showMessage(true, 'please upload only correct format extension of fileFormBSide1');
			return false
		}
	}
	if(fileFormBSide2!='' && fileFormBSide2!='Click here to upload'){
		if ($.inArray($.trim(fileFormBSide2.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			showMessage(true, 'please upload only correct format extension of fileFormBSide2');
			return false
		}
	}
	return true;
}
function callAmountByEntity(formId, value, value1, value2, value3, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #totalamount").val("");
		return false;
	}
	$('#tbl_accountlist tbody').empty(); 
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForEntityAccount(formId, 'ENTITY-AMOUNT-LIST', value, value1, value2, value3)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				var tr;
				var totalAmt = 0;
				var amount = 0;
				
				if(data['mastersData']['dashboardDTO'] !=null){
					$("#tbl_accountlist tbody tr").remove(); 
					for (var i = 0; i < (data['mastersData']['dashboardDTO']['manageAccountsList']).length; i++) {
						
				        tr = $('<tr/>');
				        tr.append("<td>" + (i+1) + "</td>");
				        tr.append("<td>" + data['mastersData']['dashboardDTO']['manageAccountsList'][i]['accountName'] + "</td>");
				        tr.append("<td>" + data['mastersData']['dashboardDTO']['manageAccountsList'][i]['bankStateName'] + "</td>");
				        tr.append("<td>" + data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentTotalAmount'] + "</td>");
				        tr.append("<td>" + data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentReference'] + "</td>");
				        tr.append("<td>" + data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentDate'] + "</td>");
				        $('#tbl_accountlist tbody').append(tr);
				        if(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentActive']==1){
				        		 totalAmt = totalAmt + parseInt(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentTotalAmount']);
				        		 amount = data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentAmount'];
				 			 $("#"+formId+" #paymentId").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentId']);
				 			 $("#"+formId+" #paymentMode").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentMode']);
				 			 $("#"+formId+" #paymentRef").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentReference']);
				 			 
				 			 if($("#"+formId+" #ddNo").val() ==""){
				 				$("#"+formId+" #bankName").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['accountName']);
				 				$("#"+formId+" #bankState").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['bankState']);
				 				$("#"+formId+" #bankStateId").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['bankState']);
				 				$("#"+formId+" #ddNo").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentReference']);
					 			$("#"+formId+" #ddDate").val(data['mastersData']['dashboardDTO']['manageAccountsList'][i]['paymentAddDate']);
				 			 }
				        }
				    }
					if($("#"+formId+" #actiontype").val() =='edit' ){
						var amountFee =  parseInt($("#"+formId+" #amount").val());
						if(amountFee == 0){
							$("#"+formId+" #amount").val(amount);
						}
						var totalAmount =  parseInt($("#"+formId+" #totalFee").val());	
						if(totalAmount == 0){
							$("#"+formId+" #totalFee").val(totalAmt);
						}
						var receiveFee =  parseInt($("#"+formId+" #receiveAmt").val());
						if(receiveFee != 0){
							var bal = parseInt($("#totalFee").val()) - parseInt($("#receiveAmt").val());
							$("#"+formId+" #balanceAmt").val(bal);
						}
					}else{
						$("#"+formId+" #amount").val(amount);
						$("#"+formId+" #totalFee").val(totalAmt);
					}
					
				}else{
					//$("#"+formId+" #totalFee").val(0);
					//$("#"+formId+" #amount").val(0);
					
		 			 $("#"+formId+" #paymentId").val("");
		 			 $("#"+formId+" #paymentMode").val("");
		 			 $("#"+formId+" #paymentRef").val("");
				}
//				var bal = parseInt($("#"+formId+" #totalFee").val()) - parseInt($("#"+formId+" #receiveAmt").val());
//				$("#"+formId+" #balanceAmt").val(bal);
			   
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}

function getRequestForEntityAccount(formId, key, value, requestExtra, requestExtra1, requestExtra2) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	if(requestExtra!=undefined){
		requestData['requestExtra'] = requestExtra;
	}
	if(requestExtra1!=undefined){
		requestData['requestExtra1'] = requestExtra1;
	}
	if(requestExtra2!=undefined){
		requestData['requestExtra2'] = requestExtra2;
	}
	authentication['hash'] = getHash();
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function callSubjectsWithComp(formId, value, sessionStartDate, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #subjectCompId").val(0);
		resetDropdown($("#"+formId+" #subjectCompId"), 'Select subject');
		return false;
	}
	$("#"+formId+" #subjectId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'COMP-SUBJECT-LIST-BY-GRADE', value, sessionStartDate)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$('#mandatorySubjects tbody').html('');
				$.each(data['mastersData']['data'], function(k, v) {
					var tr = '<tr onclick="selectSubject(this, false, '+v.min+', '+v.max+' );" id="'+v.key+'" class="block greenDiv"><td><strong>'+v.extra+' - '+v.value+'</strong>'
						+'</td><td><i class="fa fa-check"></i></td></tr>';
					$('#mandatorySubjects tbody').append(tr);
				});
				$("#"+formId+" #countSubject").text(data['mastersData']['data'].length);
			}
			$("#subjectCompId").prop("disabled", false);
			
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#subjectId").prop("disabled", false);
		}
	});
}
function callSubjectsWithoutComp(formId, value, sessionStartDate, elementId) {
	hideMessage('');
	if (!validateRequestForMaster(formId, elementId)) {
		$("#"+formId+" #subjectId").val(0);
		resetDropdown($("#"+formId+" #subjectId"), 'Select subject');
		return false;
	}
	$("#"+formId+" #subjectId").prop("disabled", true);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForMaster('formId', 'NONCOMP-SUBJECT-LIST-BY-GRADE', value, sessionStartDate)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$('#optionalSubjects tbody').html('');
				$.each(data['mastersData']['data'], function(k, v) {
					var tr = '<tr onclick="selectSubject(this, true, '+v.min+', '+v.max+');" id="'+v.key+'" class="block"><td><strong>'+v.extra+' - '+v.value+'</strong>'
						+'</td><td><i class="fa fa-check"></i></td></tr>';
					$('#optionalSubjects tbody').append(tr);
				});
			}
			$("#subjectId").prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#subjectId").prop("disabled", false);
		}
	});
}


function callSubjectMarksList(studentId, isMarksAdded) {
	hideMessage('');
	var data = 'studentId='+studentId;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','subject-content'),
		data : data,
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
        			$('#hiddenSubjectList').html(htmlContent);
        			$('#marksModal').modal({backdrop: 'static', keyboard: false});
        			if(isMarksAdded==1){
					if(USER_ROLE==5){
						$('#marksSave').attr('disabled','disabled');
					}else{
						$('#marksSave').remove();
					}
        			}else{
        				$('#marksSave').removeAttr('disabled');
        			}
        			if($('#examSheet').val()=='N'){
        				$("#marksSave").hide();
        			}else{
        				$("#marksSave").show();
        			}
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}
function showRemainingBalanceList(standardId, entityId, entityName, sessionYear){
	var studentFee = $('#receiveAmt').val();
	if(studentFee == undefined || studentFee == null || studentFee==''){
		studentFee=0;
	}
	var nriFee = $('#nriFee').val();
	if(nriFee == undefined || nriFee == null || nriFee==''){
		nriFee=0;
	}
	studentFee = parseInt(studentFee) + parseInt(nriFee);
	var data = 'standardId='+standardId+'&studentFee='+studentFee+'&entityId='+entityId+'&entityName='+entityName+'&years='+sessionYear;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','paymentList-Content'),
		data : data,
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
        				//showMessage(true, stringMessage[1]);
        			}
        		}else{
        			$('#amountListing').html(htmlContent);
        			$('#paymentListModal').modal('show');
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function closerollNo(openmode){
	customLoader(true);
	if(openmode=='new'){
		$('#rollNoModal').modal('toggle');
		setTimeout(function(){
			window.close();
			}, 2000);
		}else {
			callDashboardPageSupAdmin('3a','dashboardContentInHTML','?moduleId=student&controllType=list&searchInput=0&openMode=&extSearch=false&feeStatus=false&studentStatus=pending');
		}
}

function calculateBalanceFee(){
	var bal = 0;
	var totalFee = $("#totalFee").val();
	if(totalFee==undefined || totalFee==null || totalFee==''){
		totalFee = 0;
	}
	var receiveAmt = $("#receiveAmt").val();
	if(receiveAmt==undefined || receiveAmt==null || receiveAmt==''){
		receiveAmt = 0;
	}
	var nriFee = $("#nriFee").val();
	if(nriFee==undefined || nriFee==null || nriFee==''){
		nriFee = 0;
	}
	bal = parseInt(totalFee) - parseInt(receiveAmt) -  parseInt(nriFee);
	$("#balanceAmt").val(bal);
}


function getRequestForChangeSessionStudent(formId, moduleId){
	var request = {};
	var authentication = {};
	var requestData = {};
	var addStudentListDTO = {};
	var controllType = $("#actiontype").val();
	addStudentListDTO['actionType'] = controllType;
	addStudentListDTO['studentId'] = $("#studentId").val();
	authentication['userId'] = $("#userId").val();
	addStudentListDTO['rollNo'] = $("#rollNos").val();
	addStudentListDTO['standardId'] = $("#standardId").val();
	addStudentListDTO['sessionYear'] = $("#sessionYear").val(); 
	addStudentListDTO['sessionMonth'] =  $("#sessionMonth").val();
	addStudentListDTO['countryId'] = $("#countryId").val();
	if(controllType=="changeSession"){
		if(USER_ROLE == 5){
			if($('#session').val()!=undefined){
				addStudentListDTO['sessionValue'] = $("#session").val();
				var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
				addStudentListDTO['sessionYear'] = sessionValue[0];
				addStudentListDTO['sessionMonth'] = sessionValue[1];
			}
		}
	}
	requestData['addStudentDTO'] = addStudentListDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;	
}
function setEmptySubjectList(){
//	if($("#studentId").val()=='0'){
		if(PRESERVE_CURRENT_SUBJECTS_NAME.length>0){
			var subjectLength = PRESERVE_CURRENT_SUBJECTS_NAME.split(',');
			for(var index=1; index<=subjectLength.length;){
				setDropDownByText('preSubId'+index, subjectLength[index-1]);
				index++
			}
		}
//	}
}
function setDropDownByText(elementId, elementValue) {
    $('#'+elementId+' option').map(function () {
        if ($.trim($(this).text()) == $.trim(elementValue)){
        	return this;
        }
    }).attr('selected', 'selected');
}
function attendenceCheck(){
	if($('#attendanceStatus').val()==1){
		$("#attendencedocuments").show();
	}else{
		$("#attendencedocuments").hide();
		$('#fileAnyOther').prev('span').prev('label').removeClass('green');
		$('#fileAnyOther').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
		$('#fileAnyOther').prev('span').html('');
		
	}		 
}


function getBankAccountDetails(formId, entityId, standardId) {
	hideMessage('');
	if(!validateRequestForBankAccountDetails(formId, entityId, standardId)){
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-paymentinfo'),
		data : JSON.stringify(getRequestForBankAccountDetails(formId, entityId, standardId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				$("#bankName").val(data['bankInfoDto']['bankName']);
				$("#bankStateId").val(data['bankInfoDto']['bankBranchState']);
				$("#ddNo").val(data['bankInfoDto']['ddNumber']);
				$("#ddDate").val(data['bankInfoDto']['ddDate']);
				$("#amount").val(data['bankInfoDto']['amount']);
				$("#totalFee").val(data['bankInfoDto']['totalFeeAmount']);
				$("#receiveAmt").val(data['bankInfoDto']['receivedAmount']);
				$("#balanceAmt").val(data['bankInfoDto']['balancedAmount']);
				
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}

function getRequestForBankAccountDetails(formId, entityId, standardId){
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['entityId'] = $("#"+formId+" #schoolId").val();
	requestData['standardId'] = $("#"+formId+" #standardId option:selected").val();
	
	authentication['hash'] = getHash();
	authentication['userType'] = moduleId;
	authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function validateRequestForBankAccountDetails(formId, entityId, standardId){
	
	if (entityId==0 || entityId==null) {
		showMessage(true, 'School is required');
		return false
	}
	
	if (standardId==null || standardId==0) {
		showMessage(true, 'Standard is required');
		return false
	}
	
	
	return true;
	
}

function renderBasicDetails(formId){
	var studentName=$('#studentName').val();
	var fatherName=$('#fatherName').val();
	var dob=$('#dob').val();
	if(studentName=='' || fatherName=='' || dob==''){
		return false;
	}
	var responseData = getStudentBasicDetails(formId)
	if(responseData['status']==1){
		var studentDetail = responseData['studentDetail'];
		var studentViewUrl=BASE_URL+CONTEXT_PATH+'dashboard/add-student-content?moduleId=student&controllType=view&id='+studentDetail['studentId']+'&preId=0&openMode=new';
		console.log('studentViewUrl '+studentViewUrl)
		var html='<a id="studentAlreadyInSchool" href="'+studentViewUrl+'" target="_blank">Student already in school</a>';
		$('#studentAlreadyInSchool').remove();
		$('#studentName').after(html);
	}else{
		var html='<span id="studentAlreadyInSchool">'+responseData['message']+'</span>';
		$('#studentAlreadyInSchool').remove();
		$('#studentName').after(html);
	}
}

function getStudentBasicDetails(formId) {
	var responseData={};
	hideMessage('');
	var request={};
	request['studentName']=$('#studentName').val();
	request['fatherName']=$('#fatherName').val();
	request['dob']=$('#dob').val();

	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','student-basic-details'),
		data : JSON.stringify(request),
		dataType : 'json',
		async : false,
		success : function(data) {
			responseData=data;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
	return responseData;
}
