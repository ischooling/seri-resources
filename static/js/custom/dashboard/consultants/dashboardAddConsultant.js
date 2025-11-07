$(document).ready(function() {
});
function AddConsultant(formId,moduleId) {
	hideMessage('');
	if(!validateRequestForAddConsultant(formId,moduleId)){
		return false;
	}
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','save-counsultant-content'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddConsultant(formId, moduleId))),
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
        			showMessage(true, stringMessage[1]);
        			$('#'+formId)[0].reset();
        			$("#"+formId+" #consultantName").val('');
        			$("#"+formId+" #instituteName").val('');
        			$("#"+formId+" #email").val('');
        			$("#"+formId+" #alterEmail").val('');
        			$("#"+formId+" #contactNo").val('');
        			$("#"+formId+" #alterContactNo").val('');
        			$("#"+formId+" #fullAddress").val('');
        			$("#"+formId+" #branchAddress").val('');
        			$('#fileupload1').prev('span').prev('label').removeClass('green');
        			$('#fileupload1').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i>  Click here to upload');
        			$('#fileupload1').prev('span').html('');
        			$('#fileupload2').prev('span').prev('label').removeClass('green');
        			$('#fileupload2').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
        			$('#fileupload2').prev('span').html('');
        			$('#fileupload3').prev('span').prev('label').removeClass('green');
        			$('#fileupload3').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
        			$('#fileupload3').prev('span').html('');
        			$('#fileupload4').prev('span').prev('label').removeClass('green');
        			$('#fileupload4').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
        			$('#fileupload4').prev('span').html('');
        			$("#"+formId+" #stuPerFee9").val('');
        			$("#"+formId+" #stuPerDis9").val('');
        			$("#"+formId+" #stuPerFee10").val('');
        			$("#"+formId+" #stuPerDis10").val('');
        			$("#"+formId+" #stuPerFee11").val('');
        			$("#"+formId+" #stuPerDis11").val('');
        			$("#"+formId+" #stuPerFee12").val('');
        			$("#"+formId+" #stuPerDis12").val('');
        		}
    			return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}
function getRequestForAddConsultant(formId,moduleId){
	var addConsultantListDTO = {};
	
	addConsultantListDTO['id'] = $("#"+formId+" #id").val();
	//addConsultantListDTO['countryId'] = $("#"+formId+" #countryId").val();
	addConsultantListDTO['countryId'] = $("#"+formId+" #countryId").val();
	addConsultantListDTO['stateId'] = $("#"+formId+" #stateId").val();
	addConsultantListDTO['cityId'] = $("#"+formId+" #cityId").val();
	addConsultantListDTO['consultantName'] = $("#"+formId+" #consultantName").val();
	addConsultantListDTO['counselorId'] = $("#"+formId+" #counselorId").val();
	addConsultantListDTO['counselorName'] = $("#"+formId+" #counselorId option:selected").text();
	if ($("#"+formId+" #instituteName").val() != undefined && $("#"+formId+" #instituteName").val() != '') {
		addConsultantListDTO['instituteName'] = encodeURIComponent($("#"+formId+" #instituteName").val());
	}
	addConsultantListDTO['email'] = $("#"+formId+" #email").val().trim();
	addConsultantListDTO['alterEmail'] = $("#"+formId+" #alterEmail").val().trim();
	addConsultantListDTO['contactNo'] = $("#"+formId+" #contactNo").val().trim();
	addConsultantListDTO['alterContactNo'] = $("#"+formId+" #alterContactNo").val().trim();
	 if ($("#" + formId + " #fullAddress").val() != undefined && $("#" + formId + " #fullAddress").val() != '') {
		addConsultantListDTO['fullAddress'] = encodeURIComponent($("#" + formId + " #fullAddress").val());
	}
	 if ($("#" + formId + " #branchAddress").val() != undefined && $("#" + formId + " #branchAddress").val() != '') {
			addConsultantListDTO['branchAddress'] = encodeURIComponent($("#" + formId + " #branchAddress").val());
	}
	//addConsultantListDTO['fullAddress'] = $("#"+formId+" #fullAddress").val();
	//addConsultantListDTO['branchAddress'] = $("#"+formId+" #branchAddress").val();
	addConsultantListDTO['inputStatus'] = $("#"+formId+" #selectStatus").val();
	
	var imageName = $("#fileupload1").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			addConsultantListDTO['schl_image1'] = imageName;
		}
	}
	var imageName = $("#fileupload2").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			addConsultantListDTO['schl_image2'] = imageName;
		}
	}
	var imageName = $("#fileupload3").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			addConsultantListDTO['schl_image3'] = imageName;
		}
	}
	
	var imageName = $("#fileupload4").prev('span').prev('label').text().trim()
	if(imageName!='' && imageName!='Click here to upload'){
		if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
			
		}else{
			addConsultantListDTO['schl_image4'] = imageName;
		}
	}
	/*addConsultantListDTO['schl_image1'] = $("#"+formId+" #fileupload1").prev('span').prev('label').text();
	addConsultantListDTO['schl_image2'] = $("#"+formId+" #fileupload1").prev('span').prev('label').text();
	addConsultantListDTO['schl_image3'] = $("#"+formId+" #fileupload1").prev('span').prev('label').text();
	addConsultantListDTO['schl_image4'] = $("#"+formId+" #fileupload1").prev('span').prev('label').text();*/
	
	addConsultantListDTO['studentPerFee'] = $("#"+formId+" #stuPerFee9").val();
	addConsultantListDTO['studentDiscount'] =($("#"+formId+" #stuPerDis9").val()!=''?$("#"+formId+" #stuPerDis9").val():0);
	addConsultantListDTO['studentTenPerFee'] = $("#"+formId+" #stuPerFee10").val();
	addConsultantListDTO['studentTenDiscount'] = ($("#"+formId+" #stuPerDis10").val()!=''?$("#"+formId+" #stuPerDis10").val():0);
	addConsultantListDTO['studentElePerFee'] = $("#"+formId+" #stuPerFee11").val();
	addConsultantListDTO['studentEleDiscount'] = ($("#"+formId+" #stuPerDis11").val()!=''?$("#"+formId+" #stuPerDis11").val():0);
	addConsultantListDTO['studentTwePerFee'] = $("#"+formId+" #stuPerFee12").val();
	addConsultantListDTO['studentTweDiscount'] =($("#"+formId+" #stuPerDis12").val()!=''?$("#"+formId+" #stuPerDis12").val():0);
	
	return 	addConsultantListDTO;
}

function validateRequestForAddConsultant(formId,moduleId){
	if ($("#"+formId+" #countryId").val()==0 || $("#"+formId+" #countryId").val()==null) {
		showMessage(true, 'Country is Mandatory');
		return false
	}
	if ($("#"+formId+" #stateId").val()==0 || $("#"+formId+" #stateId").val()==null) {
		showMessage(true, 'State is Mandatory');
		return false
	}
	if ($("#"+formId+" #cityId").val()==0 || $("#"+formId+" #cityId").val()==null) {
		showMessage(true, 'City is Mandatory');
		return false
	}
	
	if ($("#"+formId+" #consultantName").val()=='' || $("#"+formId+" #consultantName").val()==null) {
		showMessage(true, 'consultant Name is Mandatory');
		return false
	}
	if ($("#"+formId+" #counselorId").val()==0 || $("#"+formId+" #counselorId").val()==null) {
		showMessage(true, 'counselor Name is Mandatory');
		return false
	}
	if (!validateEmail($("#" + formId + " #email").val().trim())) {
		showMessage(false, 'Either email-id  is blank or invalid');
		return false
	}
	if ($("#" + formId + " #alterEmail").val().trim()!='' 
		&& !validateEmail($("#" + formId + " #alterEmail").val().trim())) {
		showMessage(false, 'Alternate email-id is invalid');
		return false
	}
	if ($("#"+formId+" #instituteName").val()=='' || $("#"+formId+" #instituteName").val()==null) {
		showMessage(true, 'Institute Name is mandatory');
		return false
	}
	if ($("#"+formId+" #contactNo").val()=='' || $("#"+formId+" #contactNo").val()==null) {
		showMessage(true, 'Contact No is mandatory');
		return false
	}
	/*if ($("#"+formId+" #alterContactNo").val()=='' || $("#"+formId+" #alterContactNo").val()==null) {
		showMessage(true, 'Alternate contact No is mandatory');
		return false
	}*/
	if ($("#"+formId+" #fullAddress").val()==undefined || $("#"+formId+" #fullAddress").val()=='' || $("#"+formId+" #fullAddress").val()==null) {
		showMessage(true, 'full address is mandatory');
		return false
	}
//	if ($("#"+formId+" #branchAddress").val()==undefined || $("#"+formId+" #branchAddress").val()=='' || $("#"+formId+" #branchAddress").val()==null) {
//		showMessage(true, 'Branch address is mandatory');
//		return false
//	}
	if ($("#"+formId+" #selectStatus").val()==0 || $("#"+formId+" #selectStatus").val()==null) {
		showMessage(true, ' Status is mandatory');
		return false
	}
	if ($("#"+formId+" #stuPerFee9").val()=='' || $("#"+formId+" #stuPerFee9").val()==0) {
		showMessage(true, 'Grade 9th per student fee  is mandatory');
		return false
	}
	/*if(($parseInt(("#"+formId+" #stuPerDis9").val()))<($parseInt(("#"+formId+" #stuPerFee9").val()))){
		showMessage(true, 'Discount of grade 9th must be less than fee');
		return false
	}*/
	if ($("#"+formId+" #stuPerFee10").val()=='' || $("#"+formId+" #stuPerFee10").val()==0) {
		showMessage(true, 'Grade 10th per Student fee  is mandatory');
		return false
	}
	if ($("#"+formId+" #stuPerFee11").val()=='' || $("#"+formId+" #stuPerFee11").val()==0) {
		showMessage(true, 'Grade 11th per student fee  is mandatory');
		return false
	}
	if ($("#"+formId+" #stuPerFee12").val()=='' || $("#"+formId+" #stuPerFee12").val()==0) {
		showMessage(true, 'Grade 12th per student fee  is mandatory');
		return false
	}
	return true;
}
