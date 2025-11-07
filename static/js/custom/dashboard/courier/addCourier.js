console.log("courier");
function changeCourierSession(courierTypeMode, controllType){
	$("#courierType").val('');
	$("#consultantId").val('');
	$("#schoolId").val('');
	$("#othCType").val('');
	$("#cPName").val('');
	$("#cPNumber").val('');
	$("#address").val('');
	 $("#consultant").hide();
	 $("#school").hide();
	 $("#otherTypeC").hide();
	if($('select#session').val()!=undefined){
		var sessionValue = $('select#session option:selected').attr('sessionValue').split("-");
		var arg = "sessionVal="+sessionValue[0]+"&sessionMonth="+sessionValue[1]+"&courierTypeMode="+courierTypeMode+"&controllType="+controllType;
		courierSessionChange(arg);
	}
}

function courierSessionChange(arg) {
	var data = arg;
	$.ajax({
		type : "GET",
		url : getURLForHTML('dashboard','courierSession'),
		data : data,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			console.log('htmlContent '+htmlContent)
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
        			
        			$('#consultantSchoolData').html(htmlContent);
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



function validateRequestForDashboardAddCourierDetails(formId){
	if($("#controllType").val()=="application"){
		if($("#courierBasedOn").val()==3 && $("#courierTypeMode").val()==1){
			if ($("#"+formId+" #applicatonNumber").val()=='' || $("#"+formId+" #applicatonNumber").val()==null) {
				showMessage(true, 'Title is Required');
				return false
			}
			if ($("#"+formId+" #remarks").val()==undefined || $("#"+formId+" #remarks").val()=='' || $("#"+formId+" #remarks").val()==null) {
				showMessage(true, 'Remarks is Required');
				return false
			}
		}else if($("#courierTypeMode").val()==2){
			if($("#courierBasedOn").val()!=3){
				if (!validateIncomingDoc()) {
					//showMessage(true,'Please Select atleast one Students documents');
					return false;
				}
			}else if($("#courierBasedOn").val()==3){
//				if ($("#"+formId+" #studentName").val()=='' || $("#"+formId+" #studentName").val()==null) {
//					showMessage(true, 'Student name is required');
//					return false
//				}
//				if ($("#"+formId+" #remarks").val()==undefined || $("#"+formId+" #remarks").val()=='' || $("#"+formId+" #remarks").val()==null) {
//					showMessage(true, 'Remarks is Required');
//					return false
//				}
			}
		}else {
			if($("#courierTypeMode").val()==1){
				if(!validateCourierDocDetails()){
			//		showMessage(true, 'Please Select and comment atleast one Students documents');
					return false;
				}
			}  
		}
		//return true
		
	} else if($("#controllType").val()=="add" || $("#controllType").val()=="edit"){
		if ($("#session option:selected").val()==null || $("#session option:selected").val()==0) {
			showMessage(true, 'Please select Session first');
			return false
		}
		if($("#courierTypeMode").val()==2){
			if ($("#"+formId+" #docketNumber").val()=='' || $("#"+formId+" #docketNumber").val()==null) {
				showMessage(true, 'Docket Number  is Required');
				return false
			}
		}
		
		if ($("#"+formId+" #courierServiceName option:selected").val()==null || $("#"+formId+" #courierServiceName option:selected").val()==0) {
			showMessage(true, 'Please Select Courier Service Name ');
			return false
		}
//		if($("#"+formId+" #courierServiceName option:selected").val()=='6'){
//			if ($("#"+formId+" #othCSName").val()=='' || $("#"+formId+" #othCSName").val()==null) {
//				showMessage(true, 'Other Courier Service Name is Required');
//				return false
//			}
//		}
		if($("#"+formId+" #date").val()==null || $("#"+formId+" #date").val()==0){
			showMessage(true, 'Date is Required');
			return false
		}
		if ($("#"+formId+" #courierType option:selected").val()==null || $("#"+formId+" #courierType option:selected").val()==0) {
			if($("#courierTypeMode").val()==1){
				showMessage(true, 'Please Select Recipient Of Courier ');
			}else{
				showMessage(true, 'Please Select Sender Of Courier ');
			}
			return false
		}
		if($("#"+formId+" #courierType option:selected").val()!=null){
			
			if($("#"+formId+" #courierType option:selected").val()=='1'){
				if ($("#"+formId+" #consultantId option:selected").val()==null || $("#"+formId+" #consultantId option:selected").val()==0) {
					showMessage(true, 'Please Select Consultant Name');
					return false
				}
			}
			
			if($("#"+formId+" #courierType option:selected").val()=='2'){
				if ($("#"+formId+" #schoolId option:selected").val()==null || $("#"+formId+" #schoolId option:selected").val()==0) {
					showMessage(true, 'School Select is Required');
					return false
				}
			}
				if($("#"+formId+" #courierType option:selected").val()=='3'){
					if ($("#" + formId + " #othCType").val().trim()!='' 
						&& !validateEmail($("#" + formId + " #othCType").val().trim())) {
						showMessage(false, 'Email-id is invalid');
						return false
					}
			}
		}
		if ($("#"+formId+" #cPName").val()=='' || $("#"+formId+" #cPName").val()==null) {
			showMessage(true, 'Contact Person Name is Required');
			return false
		}
		if ($("#"+formId+" #cPNumber").val()=='' || $("#"+formId+" #cPNumber").val()==null) {
			showMessage(true, 'Contact Person Number is Required');
			return false
		}
		if ($("#"+formId+" #address").val()==undefined || $("#"+formId+" #address").val()=='' || $("#"+formId+" #address").val()==null) {
			showMessage(true, 'Address is Required');
			return false
		}
		if ($("#"+formId+" #sendName").val()=='' || $("#"+formId+" #sendName").val()==null) {
			if($("#courierTypeMode").val()==1){
				showMessage(true, "Sender's Name is Required");
			}else{
				showMessage(true, "Recipient's Name is Required");
			}
			return false
		}
		if ($("#"+formId+" #subject").val()=='' || $("#"+formId+" #subject").val()==null) {
			showMessage(true, 'Subject is Required');
			return false
		}
		if ($("#"+formId+" #remarks").val()==undefined || $("#"+formId+" #remarks").val()=='' || $("#"+formId+" #remarks").val()==null) {
			showMessage(true, 'Remarks is Required');
			return false
		}
	}
	if($("#controllType").val()=="updateDockit"){
		if ($("#"+formId+" #docketNumber").val()=='' || $("#"+formId+" #docketNumber").val()==null) {
			showMessage(true, 'Docket Number  is Required');
			return false
		}
	}
	if($("#controllType").val()=="edit"){
		if($("#courierTypeMode").val()==1){
				var imageName = $("#fileuploadsCourier").prev('span').prev('label').text().split('.').pop().toLowerCase().trim();
				if(imageName!='' && imageName!='click here to upload'){
					if ($.inArray($.trim(imageName), ['gif','png','jpg','jpeg']) == -1){
						showMessage(true, 'Please upload Courier Image in following formats (jpg, jpeg or png).');
						return false
					}
				}
				
				if($("#"+formId+" #recDate").val()==null || $("#"+formId+" #recDate").val()==0){
					showMessage(true, 'Courier  Recieve Date is Required');
					return false
				}
			
				
				var date1 = $("#date").val();
				var newDate1 = date1.split('-');
				var date=(newDate1[2]+','+newDate1[1]+','+newDate1[0]);
	
				
				var date2 = $("#recDate").val();
				var newDate2 = date2.split('-');
				var recDate=(newDate2[2]+','+newDate2[1]+','+newDate2[0]);
				
				console.log("date:"+date);
				console.log("recDate:"+recDate);
				
				if(recDate<date){
					showMessage(true, "Courier's receive date should not be lesser than courier's send date");
					return false
				}
			}
		}
	return true;
}

function callForAddCourierDetails(formId, moduleId, courierTypeMode) {
	hideMessage('');
	if(!validateRequestForDashboardAddCourierDetails(formId)){
		return false;
	}
	$("#saveCourier").prop("disabled", true);
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','add-edit-courier'),
		data : encodeURI("request="+JSON.stringify(getRequestForAddCourier(formId, moduleId))),
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			$("#saveCourier").prop("disabled", false);
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
        			setTimeout(function(){
        				if(courierTypeMode==2){
        					callDashboardPageSupAdmin('21','dashboardContentInHTML','?moduleId=courier&controllType=list&courierTypeMode=2','');
        				}else if(courierTypeMode==1){
        					callDashboardPageSupAdmin('21','dashboardContentInHTML','?moduleId=courier&controllType=list&courierTypeMode=1','');
        				}
        				
					}, 2000);
        			
        			resetCourierForm(formId);
        		}
        		return false;
			}
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#saveCourier").prop("disabled", false);
		}
	});
}
function validateRequestForAllPrintAddressDetails(formId){
	if ($("#printType").val()==null || $("#printType option:selected").val()==0 ) {
		showMessage(true, 'Please Select Print Lable');
		return false
	}
	if ($("#session").val()==null || $("#session option:selected").val()==0) {
		showMessage(true, 'Session  is Mandatory');
		return false
	}
	return true;
}
function getAllPrintAddressDetails(formId){
	hideMessage('');
	if(!validateRequestForAllPrintAddressDetails(formId)){
		return false;
	}
	var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
	var sessionYear = sessionValue[0];
	var sessionMonth = sessionValue[1];
	
	var postData="&printType="+$('#printType option:selected').text()
			+"&sessionYear="+sessionYear
			+"&sessionMonth="+sessionMonth;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','manage-print-address-list'),
		data : postData,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] =="SESSIONOUT"){
        			showMessage(true, stringMessage[1]);
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}
        		} else {
        			$('#printLableAddressList').html(htmlContent);
        		}
        		$("#callPrintLableDetails").prop("disabled", false);
        		return false;
			}
		},
		error : function(e) {
			$('#'+formId+' #printLableAddressList').html(e.responseText);
			$("#callPrintLableDetails").prop("disabled", false);
		}
	});
}
function downloadAllLink(formId){
		if(!validateRequestForAllPrintAddressDetails('printCourier')){
			return false;
		}
		var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
		var sessionYear = sessionValue[0];
		var sessionMonth = sessionValue[1];
		var printType=$('#printType option:selected').val();
		var postData="&printType="+printType
				+"&sessionYear="+sessionYear
				+"&sessionMonth="+sessionMonth;
		downloadAllPrint(sessionYear, sessionMonth, printType);
}
function downloadAllPrint(sessionYear, sessionMonth, printType) {
	window.open(window.location.origin+CONTEXT_PATH+'dashboard/courier-print-address-insit/'+sessionYear+'/'+sessionMonth+'/'+printType);
}

function callForSenderDetails(formId) {
	var userId='';
	var courierType=$('#courierType option:selected').text();
	if(courierType=="School"){
		userId=$('#schoolId option:selected').val();
	}else if(courierType=="Consultant"){
		userId=$('#consultantId option:selected').val();
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForCommon('masters'),
		data : JSON.stringify(getRequestForCourierAddressPreFilled(formId, 'COURIER-CON-SCHOOL',courierType, userId)),
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				if(data['mastersData']['courierListDTO'] !=null){
				 				$("#"+formId+" #cPName").val(data['mastersData']['courierListDTO']['contactPName']);
				 				$("#"+formId+" #cPNumber").val(data['mastersData']['courierListDTO']['contactPNumber']);
				 				$("#"+formId+" #address").val(data['mastersData']['courierListDTO']['address']);
				        }
				    }
		},
		error : function(e) {
			showMessage(true, e.responseText);
		}
	});
}
function getRequestForCourierAddressPreFilled(formId, key, courierType, userId) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = courierType;
	requestData['requestExtra'] = userId;
	authentication['hash'] = getHash();
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}
function resetCourierForm(formId){
	$("#"+formId+" #docketNumber").val('');
	$("#"+formId+" #courierServiceName").val('');
	$("#"+formId+" #othCSName").val('');
	$("#"+formId+" #date").val('');
	$("#"+formId+" #courierType").val('');
	$("#"+formId+" #consultantId").val('');
	$("#"+formId+" #schoolId").val('');
	$("#"+formId+" #othCType").val('');
	$("#"+formId+" #cPName").val('');
	$("#"+formId+" #cPNumber").val('');
	$("#"+formId+" #subject").val('');
	$("#"+formId+" #address").val('');
	$("#"+formId+" #sendName").val('');
	$("#"+formId+" #remarks").val('');
	$("#"+formId+" #studentName").val('');
	$("#"+formId+" #studentRoll").val('');
	$("#"+formId+" #sessionss").val('');
	$("#"+formId+" #standard").val('');
	$("#"+formId+" #applicatonNumber").val('');
	$("#"+formId+" #allDocs").prop('checked',false);
	$("#"+formId+" #migrationDoc").prop('checked',false);
	$("#"+formId+" #diplomaDoc").prop('checked',false);
	$("#"+formId+" #characterDoc").prop('checked',false);
	$("#"+formId+" #marksheetDoc").prop('checked',false);
	$("#"+formId+" #academicDoc").prop('checked',false);
	$("#"+formId+" #transferDoc").prop('checked',false);
	$("#"+formId+" #checkStatus").prop('checked',false);
	/*$('#fileuploadsCourier').prev('span').prev('label').removeClass('green');
	$('#fileuploadsCourier').prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
	$('#fileuploadsCourier').prev('span').html('');*/
}
function getRequestForAddCourier(formId){

	var courierListDTO = {};
	if($('#session').val()!=undefined){
		var sessionValue = $('#session option:selected').attr('sessionValue').split("-");
		courierListDTO['sessionYear'] = sessionValue[0];
		courierListDTO['sessionMonth'] = sessionValue[1];
		courierListDTO['sessionValue']=	$('#session').val()
	}
	courierListDTO['courierId'] = $("#courierId").val();
	courierListDTO['controllType'] = $("#controllType").val();
	courierListDTO['courierTypeMode'] = $("#courierTypeMode").val();
	courierListDTO['docketNumber'] = $("#docketNumber").val();
	var controllType = $("#controllType").val();
	if(controllType=="edit"){
		courierListDTO['receiveDate'] = $("#recDate").val();
		
		var imageName = $("#fileuploadsCourier").prev('span').prev('label').text().trim()
		if(imageName!='' && imageName!='Click here to upload'){
			if ($.inArray($.trim(imageName.split('.').pop().toLowerCase()), ['gif','png','jpg','jpeg','pdf']) == -1){
				
			}else{
				courierListDTO['image'] = imageName;
			}
		}
		
	}
	courierListDTO['courierService'] = $("#courierServiceName option:selected").val();
	if($("#courierServiceName").val()=='6'){
		courierListDTO['otherCourierService'] = $("#othCSName").val();
	}else{
		courierListDTO['otherCourierService'] = $("#courierServiceName option:selected").text();
	}
	courierListDTO['recDate'] = $("#date").val();
	courierListDTO['typeOfCourier'] = $("#courierType option:selected").val();
	if($("#courierType").val()=='1'){
		courierListDTO['consultantId'] = $("#consultantId option:selected").val();	
	}else if($("#courierType").val()=='2'){
		courierListDTO['schoolId'] = $("#schoolId option:selected").val();	
	}else{
		courierListDTO['otherDocs'] = $("#othCType").val();
	}
	courierListDTO['contactPName'] = $("#cPName").val();
	courierListDTO['contactPNumber'] = $("#cPNumber").val();
	courierListDTO['sendName'] = $("#sendName").val();
	
	courierListDTO['subject'] = $("#subject").val();
	
	if ($("#"+formId+" #address").val() != undefined && $("#"+formId+" #address").val() != '') {
		courierListDTO['address'] = encodeURIComponent($("#"+formId+" #address").val());
	}
//	courierListDTO['address'] = $("#address").val();
	courierListDTO['sendName'] = $("#sendName").val();
	if(controllType=="add" || controllType=="edit" || controllType=="application"){
		if ($("#"+formId+" #remarks").val() != undefined && $("#"+formId+" #remarks").val() != '') {
			courierListDTO['remarks'] = encodeURIComponent($("#"+formId+" #remarks").val());
		}
	}
	if(controllType=="applicationEdit"){
		courierListDTO['courierRefNum'] = $("#courierRefNum").val();
		var incomingDocumentMastersDTOLists=[]; 
		var courierDocumentListDTOLists=[];
		var rowi=1;
		$(".studtIncomingCourierDocs").each(function() {
			var  refernceNum=$("#referenceNum").val();
			console.log(refernceNum);
			var documents={};
			courierDocumentListDTOLists=[];
			
			documents['studentName'] = $(this).find("#incom_docs"+refernceNum).find("#studentName").val();
			if ($(this).find("#incom_docs"+refernceNum).find("#remarks").val()!= undefined && $(this).find("#incom_docs"+refernceNum).find("#remarks").val() != '') {
				documents['comments'] = $(this).find("#incom_docs"+refernceNum).find("#remarks").val();
			}
			documents['referenceNum'] =refernceNum;
			console.log("index "+rowi);
			$('.titileListing'+rowi+' label').each(function() {
				var documentListDTO={};
				documentListDTO['documentId'] = this.id;
				docId=this.id;
				documentListDTO['documentTitle']= $(this).find("#docTitle"+docId).html();
				if($(this).find("#checkStatus").is(":checked")){
					documentListDTO['value'] = true;
				}else{
					documentListDTO['value'] = false;
				}
				courierDocumentListDTOLists.push(documentListDTO);
				
			});
			rowi++;
			documents['documentMastersDTO'] =courierDocumentListDTOLists;
			incomingDocumentMastersDTOLists.push(documents);

		});
		courierListDTO['documentMasters'] = incomingDocumentMastersDTOLists;
	}
	
	if(controllType=="application"){
		courierListDTO['courierDetailsId'] = $("#courierDetailsId").val();
		courierListDTO['courierRefNum'] = $("#courierRefNum").val();

		if ($("#applicatonNumber").val() != undefined && $("#"+formId+"#applicationNumber").val() != '') {
			courierListDTO['applicationNumber'] = encodeURIComponent($("#applicatonNumber").val());
		}
		courierListDTO['name'] = $("#studentName").val();
		var studentCourierDTOList = [];
		var studentRollNoList = [];
		var studentCourierDocumentDTOList = {};
		
		//courierListDTO['courierRefNum'] = $("#courierRefNum").val();
		$(".studentCourierDocs").each(function() {
			var rollNo = $(this).find("input[name=studentRollNo]").val();
			var  refernceNum=$("#courierRefNum").val();
			console.log(rollNo);
			var comments = $(this).find("#stud_rec"+rollNo).find(".comment").val();
			var studentCourierDTO={};
			
			studentCourierDTO['studentName'] = $(this).find("#stud_rec"+rollNo).find(".studentName").html();
			studentCourierDTO['rollNo'] = rollNo;
			console.log(studentCourierDTO['studentName']);
			studentCourierDTO['sessionYear'] = $(this).find("#stud_rec"+rollNo).find(".session").html().split("-")[0];
			studentCourierDTO['sessionMonth'] = $(this).find("#stud_rec"+rollNo).find(".session").html().split("-")[1];
			studentCourierDTO['standard'] = $(this).find("#stud_rec"+rollNo).find(".standard").html();
			if ($(this).find("#stud_rec"+rollNo).find(".comment").val() != undefined && $(this).find("#stud_rec"+rollNo).find(".comment").val()!= '') {
				studentCourierDTO['comments'] = $(this).find("#stud_rec"+rollNo).find(".comment").val();
			}
			
			
			var checkAllDoc = false;
			var checkMigration = false;
			var checkDiploma = false;
			var checkCharacter = false;
			var checkCharacter = false;
			var checkMarkSheet = false;
			var checkAcademic = false;
			var checkTransfer = false;
			
			
			if($(this).find("#stud_rec"+rollNo).find(".allDocument").is(":checked")){
				checkAllDoc = true;
			}
			
			
			if($(this).find("#stud_rec"+rollNo).find(".migrationDocument").is(":checked")){
				checkMigration = true;
			}
			
			
			if($(this).find("#stud_rec"+rollNo).find(".diplomaDocument").is(":checked")){
				checkDiploma = true;
			}
			
			
			if($(this).find("#stud_rec"+rollNo).find(".characterDocument").is(":checked")){
				checkCharacter = true;
			}
			
			if($(this).find("#stud_rec"+rollNo).find(".markSheetDocument").is(":checked")){
				checkMarkSheet = true;
			}
			
			
			if($(this).find("#stud_rec"+rollNo).find(".academicDocument").is(":checked")){
				checkAcademic = true;
			}
			
			if($(this).find("#stud_rec"+rollNo).find(".transferDocument").is(":checked")){
				checkTransfer = true;
			}
			
			var courierDocumentListDTO = {};
			courierDocumentListDTO['allDocument'] = checkAllDoc;
			courierDocumentListDTO['academicDocument'] = checkAcademic;
			courierDocumentListDTO['characterDocument'] = checkCharacter;
			courierDocumentListDTO['migrationDocument'] = checkMigration;
			courierDocumentListDTO['marksheetDocument'] = checkMarkSheet;
			courierDocumentListDTO['diplomaDocument'] = checkDiploma;
			courierDocumentListDTO['transferDocument'] = checkTransfer;
			studentCourierDTO['documents'] = courierDocumentListDTO;
			
            if(checkAllDoc || checkAcademic || checkCharacter || checkMigration || checkMarkSheet || checkDiploma || checkTransfer || comments!=''){
            	studentCourierDTOList.push(studentCourierDTO);
            	studentRollNoList.push(rollNo);
            }
        	courierListDTO['studentRollNo'] = studentRollNoList.toString();
			courierListDTO['studentCouriers'] = studentCourierDTOList;	
			
		});

		var incomingDocumentMastersDTOList=[]; 
		var courierDocumentListDTOList=[];
		var rowj=1;
		$(".studtIncomingCourierDocs").each(function() {
			var  refernceNum=$("#referenceNum").val();
			console.log(refernceNum);
			var documentMasters={};
			courierDocumentListDTOList=[];
			
			documentMasters['studentName'] = $(this).find("#incom_docs"+refernceNum).find("#studentName").val();
			if ($(this).find("#incom_docs"+refernceNum).find("#remarks").val()!= undefined && $(this).find("#incom_docs"+refernceNum).find("#remarks").val() != '') {
				documentMasters['comments'] = $(this).find("#incom_docs"+refernceNum).find("#remarks").val();
			}
			documentMasters['referenceNum'] =refernceNum;
			
			$('.titileListing'+rowj+' label').each(function() {
				var documentMastersDTO={};
				documentMastersDTO['documentId'] = this.id;
				docId=this.id;

				documentMastersDTO['documentTitle']= $(this).find("#docTitle"+docId).html();
				if($(this).find("#checkStatus").is(":checked")){
					documentMastersDTO['value'] = true;
				}else{
					documentMastersDTO['value'] = false;
				}
				courierDocumentListDTOList.push(documentMastersDTO);
				
			});
			rowj++;
			documentMasters['documentMastersDTO'] =courierDocumentListDTOList;
			incomingDocumentMastersDTOList.push(documentMasters);

		});
		courierListDTO['documentMasters'] = incomingDocumentMastersDTOList;
	}
	return courierListDTO;
}
function chooseAll(splitId){
	for(var index=1;index<=6;index++){
		if($('#allDocs'+splitId).is(":checked")){
			$('#sub'+splitId+index).prop('checked', true);
		}else{
			$('#sub'+splitId+index).prop('checked', false);
		}
	}
}
function unSelectAll(splitId){
	var checkedCount=0;
	for(var index=1;index<=6;index++){
		if($('#sub'+splitId+index).is(":checked")){
			checkedCount++;
		}
	}
	if(checkedCount==6){
		$('#allDocs'+splitId).prop('checked', true);
	}else{
		$('#allDocs'+splitId).prop('checked', false);
	}
}
function showCourierListingWithQueries(elementId, argument, placeholder){
	$('#'+elementId).DataTable( {
		"select": true,
        "processing": true,
        "serverSide": true,
        "pageLength": 10,
        "searching":true,
        language: { search: 'Search', searchPlaceholder: placeholder},	
        "ajax": {
            "url": CONTEXT_PATH+"dashboard/manage-courier-content-1"+argument,
            "data": function ( data ) {
			//console.log(data);
         	}
		},
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
        	$('td:nth-last-child(2)', nRow).addClass('text-center');
        	$('td:nth-last-child(3)', nRow).addClass('text-center');
        	$('td:nth-last-child(4)', nRow).addClass('text-center');
        	$('td:nth-last-child(5)', nRow).addClass('text-center');
        	$('td:nth-last-child(6)', nRow).addClass('text-center');
         },
         "columns": [
             { "data": "sno", 				"name" : "sno", 				"title" : "S.No"  },
             { "data": "docketNumber", 		"name" : "docketNumber" , 		"title" : "Docket Number"},
             { "data": "recDate", 			"name" : "recDate" , 			"title" : "Received Date"},
             { "data": "courierService",	"name" : "courierService" , 	"title" : "Courier Service"},
             { "data": "name", 				"name" : "name" , 				"title" : "Consultant / School Name"},
             { "data": "subject", 			"name" : "subject" , 			"title" : "Subject"},
             { "data": "applicationCount", 	"name" : "applicationCount" , 	"title" : "View No. of Application"},
             { "data": "contactPName", 		"name" : "contactPName" ,		"title" : "Contact Person"},
             { "data": "contactPNumber", 	"name" : "contactPNumber" , 	"title" : "Contact Number"},
             { "data": "updateDate", 		"name" : "updateDate" , 		"title" : "Update Date"},
             { "data": "savedBy", 			"name" : "savedBy" , 			"title" : "Saved By"},
             { "data": "action", 			"name" : "action" , 			"title" : "Action"}
         ]
	});
	$('#'+elementId).dataTable().fnSetFilteringEnterPress();
}

function callApplicationNumberListing(referenceNumber,docketNumber) {
	//hideMessage('');
	var data = "referenceNumber="+referenceNumber
				+"&docketNumber="+docketNumber;
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard','application-list'),
		data : data,
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
//			console.log('htmlContent '+htmlContent)
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
        			$('#applicationsList').html(htmlContent);
        			$('#applicationModel').modal('show');
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

function validateCourierDocDetails(){
	var status=false;
	var studentCourierDTOList = [];
	var errorMessage =[];
	$(".studentCourierDocs").each(function() {
		var rollNo = $(this).find("input[name=studentRollNo]").val();
		var  refernceNum=$("#courierRefNum").val();
		console.log(rollNo);
		var comments = $(this).find("#stud_rec"+rollNo).find(".comment").val();
		var studentCourierDTO={};
		
		studentCourierDTO['studentName'] = $(this).find("#stud_rec"+rollNo).find(".studentName").html();
		studentCourierDTO['rollNo'] = rollNo;
		console.log(studentCourierDTO['studentName']);
		studentCourierDTO['sessionYear'] = $(this).find("#stud_rec"+rollNo).find(".session").html().split("-")[0];
		studentCourierDTO['sessionMonth'] = $(this).find("#stud_rec"+rollNo).find(".session").html().split("-")[1];
		studentCourierDTO['standard'] = $(this).find("#stud_rec"+rollNo).find(".standard").html();
		studentCourierDTO['comments'] = $(this).find("#stud_rec"+rollNo).find(".comment").val();
		
		var innerLoop=0;
		var checkAllDoc = false;
		var checkMigration = false;
		var checkDiploma = false;
		var checkCharacter = false;
		var checkMarkSheet = false;
		var checkAcademic = false;
		var checkTransfer = false;
		
		if($(this).find("#stud_rec"+rollNo).find(".allDocument").is(":checked")){
			checkAllDoc = true;
			innerLoop++;
		}
		
		
		if($(this).find("#stud_rec"+rollNo).find(".migrationDocument").is(":checked")){
			checkMigration = true;
			innerLoop++;
		}
		
		
		if($(this).find("#stud_rec"+rollNo).find(".diplomaDocument").is(":checked")){
			checkDiploma = true;
			innerLoop++;
		}
		
		
		if($(this).find("#stud_rec"+rollNo).find(".characterDocument").is(":checked")){
			checkCharacter = true;
			innerLoop++;
		}
		
		if($(this).find("#stud_rec"+rollNo).find(".markSheetDocument").is(":checked")){
			checkMarkSheet = true;
			innerLoop++;
		}
		
		
		if($(this).find("#stud_rec"+rollNo).find(".academicDocument").is(":checked")){
			checkAcademic = true;
			innerLoop++;
		}
		
		if($(this).find("#stud_rec"+rollNo).find(".transferDocument").is(":checked")){
			checkTransfer = true;
			innerLoop++;
		}
		
		
		var courierDocumentListDTO = {};
		courierDocumentListDTO['allDocument'] = checkAllDoc;
		courierDocumentListDTO['academicDocument'] = checkAcademic;
		courierDocumentListDTO['characterDocument'] = checkCharacter;
		courierDocumentListDTO['migrationDocument'] = checkMigration;
		courierDocumentListDTO['marksheetDocument'] = checkMarkSheet;
		courierDocumentListDTO['diplomaDocument'] = checkDiploma;
		courierDocumentListDTO['transferDocument'] = checkTransfer;
		studentCourierDTO['documents'] = courierDocumentListDTO;
		
		if(innerLoop > 0 && comments=="" ){
			errorMessage.push('Please fill comments for selected students');
		}else if(innerLoop == 0 && comments!="" ){
			errorMessage.push('Please select at least one  document  before commenting');
		} else if(innerLoop == 0 && comments=="") {
			
		}else{
			status=true;
		}
	})
	if(!status){
		errorMessage.push('Please Select and comment atleast one Students documents');
	}
	if(errorMessage.length>0){
		showMessage(true, errorMessage[0]);
		return false;
	}
	return true;
}

function validateIncomingDoc(){
	var chkStatus=false;
	var courierDocumentListDTOList=[];
	var errorMsg =[];
	var rowj=1;
	$(".studtIncomingCourierDocs").each(function() {
		var  refernceNum=$("#referenceNum").val();
		console.log(refernceNum);
		var documentMasters={};
		courierDocumentListDTOList=[];
		
		documentMasters['studentName'] = $(this).find("#incom_docs"+refernceNum).find("#studentName").val();
		if ($(this).find("#incom_docs"+refernceNum).find("#remarks").val()!= undefined && $(this).find("#incom_docs"+refernceNum).find("#remarks").val() != '') {
			documentMasters['comments'] = $(this).find("#incom_docs"+refernceNum).find("#remarks").val();
		}
		documentMasters['referenceNum'] =refernceNum;
		var docCount = 0;
		$('.titileListing'+rowj+' label').each(function() {
			var documentMastersDTO={};
			documentMastersDTO['documentId'] = this.id;
			docId=this.id;
			documentMastersDTO['documentTitle']= $(this).find("#docTitle"+docId).html();
			if($(this).find("#checkStatus").is(":checked")){
				documentMastersDTO['value'] = true;
				docCount++;
			}else{
				documentMastersDTO['value'] = false;
			}
			courierDocumentListDTOList.push(documentMastersDTO);
			
		});
		rowj++;
		documentMasters['documentMastersDTO'] =courierDocumentListDTOList;
		
		if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()!="" && docCount > 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()==""){
			errorMsg.push('Please fill comments for selected students');
		}else if(docCount == 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()!="" && $(this).find("#incom_docs"+refernceNum).find("#studentName").val()!=""){
			errorMsg.push('Please select at least one  document  before commenting');
		}else if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()=="" && docCount > 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()!=""){
			errorMsg.push('Please fill student name');
		}else if( docCount==0 && $(this).find("#incom_docs"+refernceNum).find("#studentName").val()!="" && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()!=""){
			errorMsg.push('Please select at least one  document  before commenting');
		}else if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()!="" && docCount == 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()==""){
			errorMsg.push('Please select at least one  document');
		}else if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()=="" && docCount == 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()!=""){
			errorMsg.push('Please fill student name');
		}else if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()=="" && docCount > 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()==""){
			errorMsg.push('Please fill student name');
		}else if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()=="" && docCount == 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()=="") {
			
		}else if($(this).find("#incom_docs"+refernceNum).find("#studentName").val()!="" && docCount > 0 && $(this).find("#incom_docs"+refernceNum).find("#remarks").val()!=""){
			chkStatus=true;
		}else{
			chkStatus=false;
		}

	});
	
	if(!chkStatus){
		errorMsg.push('Please add atleast one student');
	}
	if(errorMsg.length>0){
		showMessage(true, errorMsg[0]);
		return false;
	}
	return true;
}

function showEmailSendMessage(module, url, divId){
	var functionName = "$('#emailSend').modal('hide');callSupAdminInneraction('"+module+"','"+url+"','"+divId+"')";
	$('#sendMail').attr('onclick',functionName);
	$('#emailSend').modal('show');
}
