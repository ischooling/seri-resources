console.log("gtested");
$(document).ready(function(){
	//tabActiveStatus(${schoolAffiliationFormDTO.position})
   
	var navListItems = $('div.setup-panel div a'),
	allWells = $('.setup-content'),
	allNextBtn = $('.nextBtn');

	  stepone= $('#step-1');
	  allWells.hide();
	  stepone.show()

	  navListItems.click(function (e) {
	      e.preventDefault();
	      var $target = $($(this).attr('href')),
	              $item = $(this);

	      if (!$item.hasClass('disabled')) {
	    	  
	          
	          allWells.hide();
	          $target.show();
	          $target.find('input:eq(0)').focus();
	      }
	  });
	<!--Next Button function-->
	  allNextBtn.click(function(){
	      var curStep = $(this).closest(".setup-content"),
	          curStepBtn = curStep.attr("id"),
	          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
	          curInputs = curStep.find("input[type='text'],input[type='url']"),
	          isValid = false;
//	      $(".form-group").removeClass("has-error");
//	      for(var i=0; i<curInputs.length; i++){
//	    	  console.log("curInputs[i] "+curInputs[i]);
//	          if (!curInputs[i].validity.valid){
//	              isValid = false;
//	              $(curInputs[i]).closest(".form-group").addClass("has-error");
//	          }
//	      }

	      if (isValid)
	          nextStepWizard.removeAttr('disabled').trigger('click');
	  });
	<!--Next Button function-->
	
	  $('div.setup-panel div a.btn-primary').trigger('click');
	});

function callForAffiliationForm(formId, moduleId, msg, position) {
	hideMessage('');
	if(!validateRequestForAffiliationForm(formId,moduleId, position)){
		//tabActiveStatus(position);
		return false;
	}
	$("#nextStep").prop("disabled", true);
	var formData = {};
	formData = JSON.stringify(getRequestForAffiliationSchoolForm(formId, moduleId, position))
	console.log('formData:: '+formData);
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','school-affiliation-form-content'),
		data : formData,
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
				tabActiveStatus(position);
			} else {
				showMessage(false, data['message']);
				tabActiveStatus(parseInt(position)+1);
				$('#warningMessageId').modal('hide');
				if(position==5){
					$('#step-5').hide();
					$('.setup-content').hide();
					$(".stepwizard-step").css("display", "none");
					$(".stepwizard").css("display", "none");
					$('#successPage').show();
				}
				console.log("position")
			}
			$("#nextStep").prop("disabled", false);
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			$("#nextStep").prop("disabled", false);
			tabActiveStatus(1);
			return false;
		}
	});
}
function getRequestForAffiliationSchoolForm(formId,moduleId, position){
	var request = {};
	var authentication = {};
	var requestData = {};
	var schoolAffiliationFormDTO = {};
	var ownerConatctDetailDTO=[];
	var ownerDetail = [];
	var ownerContactList = [];
	var ownerContactDetailDTO = {};
	var assurancesDetails = {};
	var academicYears = [];
	schoolAffiliationFormDTO['position'] = position;
	schoolAffiliationFormDTO['schoolId'] = $("#"+formId+" #schoolId").val();
	schoolAffiliationFormDTO['id'] = $("#"+formId+" #schlId").val();
	if(position==1){
		schoolAffiliationFormDTO['establishYear'] = $("#"+formId+" select#yearestablish option:selected").val();
		schoolAffiliationFormDTO['parentOrganisationName'] = $("#"+formId+" #parentOrg").val();
		schoolAffiliationFormDTO['dateOfRegistartion'] = $("#"+formId+" #regDate").val();
		//ownerDetail['id'] = checkAdd;
		$(".affiliationContact tbody tr").each(function() {
			var ownerDetail={};
			ownerDetail['name'] = $(this).find("input[name^=contactPersonName]").val();
			ownerDetail['designation'] = $(this).find("input[name^=contactPersonDesig]").val();
			ownerDetail['contactNo'] = $(this).find("input[name^=contactPersonContact]").val();
			ownerDetail['emailId'] = $(this).find("input[name^=contactPersonEmail]").val();
			ownerContactList.push(ownerDetail);
		});
		
		
		ownerContactDetailDTO['ownerDetailsDTO'] = ownerContactList;
		schoolAffiliationFormDTO['ownerContactDetailDTO'] = ownerContactDetailDTO;
		schoolAffiliationFormDTO['principalName'] = $("#"+formId+" #principalName ").val();
		if ($("#" + formId + " #principalDesign").val() != undefined &&  $("#" + formId + " #principalDesign").val() != '') {
			schoolAffiliationFormDTO['principalDesignation'] = $("#"+formId+" #principalDesign ").val();
		}
		schoolAffiliationFormDTO['contactPersonName'] = $("#"+formId+" #schoolContactPersonName ").val();
		schoolAffiliationFormDTO['schoolName'] = $("#"+formId+" #schoolName ").val();
		schoolAffiliationFormDTO['cityName'] = $("#"+formId+" #cityName ").val();
		schoolAffiliationFormDTO['schoolPersonName'] = $("#"+formId+" #schoolPersonName").val();
		schoolAffiliationFormDTO['designation'] = $("#"+formId+" #designation ").val();
		schoolAffiliationFormDTO['mobile'] = $("#"+formId+" #mobile ").val();
		schoolAffiliationFormDTO['schoolEmail'] = $("#"+formId+" #schoolEmail ").val();
		schoolAffiliationFormDTO['schoolWeb'] = $("#"+formId+" #schoolWeb ").val();
		schoolAffiliationFormDTO['registrationYears'] = $("#"+formId+" #regDur ").val();
		
		var school = "false";
		if($("#mySchool").is(":checked")){ 
			school = "true";
		}
		
		var colleage = "false";
		if($("#myCollege").is(":checked")){ 
			colleage = "true";
		}
		schoolAffiliationFormDTO['mySchool'] = school;
		schoolAffiliationFormDTO['myCollege'] = colleage;
		
		var grade9 = "false";
		if($("#grade1").is(":checked")){ 
			grade9 = "true";
		}
		
		var grade10 = "false";
		if($("#grade2").is(":checked")){ 
			grade10 = "true";
		}
		
		var grade11 = "false";
		if($("#grade3").is(":checked")){ 
			grade11 = "true";
		}
		schoolAffiliationFormDTO['grade1'] = grade9;
		schoolAffiliationFormDTO['grade2'] = grade10;
		schoolAffiliationFormDTO['grade3'] = grade11;
		//schoolAffiliationFormDTO['descriptionOfInstitute'] = $("#"+formId+" #vision ").val();
	
	}else if(position==2){
		var otherBoard = "false";
		if($("#chkBoardAssociated").is(":checked")){ 
			otherBoard = "true";
		}
		
		var nonOtherBoard = "false";
		if($("#chkBoardNotAssociated").is(":checked")){ 
			nonOtherBoard = "true";
		}
		if(otherBoard){
			schoolAffiliationFormDTO['affiliatedwithAnyBoard'] = otherBoard;
			schoolAffiliationFormDTO['affiliatedwithoutAnyBoard'] = nonOtherBoard;
			schoolAffiliationFormDTO['boardName'] = $("#"+formId+" #parentOrgName").val();
			schoolAffiliationFormDTO['dateOfCommencement'] = $("#"+formId+" #commenceDate").val();
			schoolAffiliationFormDTO['periodOfAffilationFrom'] = $("#"+formId+" #periodDateFrom").val();
			schoolAffiliationFormDTO['periodOfAffilationTo'] = $("#"+formId+" #periodDateTo").val();
			if ( $("#financialAid").val() != undefined &&  $("#financialAid").val() != '') {
				schoolAffiliationFormDTO['financialAid']  = encodeURIComponent($("#financialAid").val());
				}
			/*schoolAffiliationFormDTO['financialAid'] = $("#"+formId+" #financialAid").val();*/
		}
		
	}else if(position==3){
		var academicYearsDTO = {};
		var academicYearsList=[];
		var academicYearsDetailDTO = {};
		/*var improvePlan = "false";
		if($("#improvePlan1").is(":checked")){ 
			improvePlan = "true";
		}
		
		var withoutImprovePlan = "false";
		if($("#improvePlan2").is(":checked")){ 
			withoutImprovePlan = "true";
		}*/
		
		schoolAffiliationFormDTO['noOfBoys'] = $("#"+formId+" #totalBoys").val().trim();
		schoolAffiliationFormDTO['noOfGirls'] = $("#"+formId+" #totalGirls").val().trim();
		schoolAffiliationFormDTO['totalNoOfStaff'] = $("#"+formId+" #totalStaff").val();
		schoolAffiliationFormDTO['noOfTeachingstaff'] = $("#techingStaff").val();
		schoolAffiliationFormDTO['noOfNon_Teachingstaff'] = $("#"+formId+" #nonTeachStaff").val();
		//schoolAffiliationFormDTO['teachingstaffWithBachelorDegree'] = $("#"+formId+" #teachStaffDegree").val();
		/*schoolAffiliationFormDTO['instituteImprovementPlan'] = improvePlan;
		schoolAffiliationFormDTO['instituteImprovementWithoutPlan'] = withoutImprovePlan;*/
		
		$(".academicDetails").each(function(){
			var academicYearsDTO = {};
			academicYearsDTO['year']= $(this).find("option:selected").attr("value");
			academicYearsDTO['noOfStudent']= $(this).find("input[name^=academicYear]").val();
			academicYearsList.push(academicYearsDTO);
		});
		academicYearsDetailDTO['academicYearsDeatilDTO']=academicYearsList;
		schoolAffiliationFormDTO['academicYearsDTO'] = academicYearsDetailDTO;
		
		
	}else if(position==4){
		var societyOwner = "false";
		if($("#societyOwned").is(":checked")){ 
			societyOwner = "true";
		}
		
		var rentedOwned = "false";
		if($("#rented").is(":checked")){ 
			rentedOwned = "true";
		}
		
		var privatelyOwned = "false";
		if($("#privatelyOwned").is(":checked")){ 
			privatelyOwned = "true";
		}
		
		var chkPhysics = "false";
		if($("#chkPhysic").is(":checked")){ 
			chkPhysics = "true";
		}
		
		var chkChemistry = "false";
		if($("#chkChemistry").is(":checked")){ 
			chkChemistry = "true";
		}
		
		var chkBiology = "false";
		if($("#chkBiology").is(":checked")){ 
			chkBiology = "true";
		}
		
		var chkComputer = "false";
		if($("#chkComputer").is(":checked")){ 
			chkComputer = "true";
			/*$("#comp-num").show();*/
		}
		
		var chkDoctAvailability = "false";
		if($("#chkDoctAvail").is(":checked")){ 
			chkDoctAvailability = "true";
		}
		
		var chkAmbulAvail = "false";
		if($("#chkAmbulAvail").is(":checked")){ 
			chkAmbulAvail = "true";
		}
		
		var chkMusicRoom = "false";
		if($("#chkMusic").is(":checked")){ 
			chkMusicRoom = "true";
		}
		
		var chkAudioVisualRoom = "false";
		if($("#chkAudio").is(":checked")){ 
			chkAudioVisualRoom = "true";
		}
		
		var chkConferenceRoom = "false";
		if($("#chkConference").is(":checked")){ 
			chkConferenceRoom = "true";
		}
		
		var chkSatffRooms = "false";
		if($("#chkStaffRoom").is(":checked")){ 
			chkSatffRooms = "true";
		}
		
		var chkFireNoc = "false";
		if($("#fireNocHaving").is(":checked")){ 
			chkFireNoc = "true";
		}
		
		var chkWithoutFireNoc = "false";
		if($("#fireNocNotHaving").is(":checked")){ 
			chkWithoutFireNoc = "true";
		}
		
		schoolAffiliationFormDTO['ownerShipTrustStatus'] = societyOwner;
		schoolAffiliationFormDTO['ownerShipRentedStatus'] = rentedOwned;
		schoolAffiliationFormDTO['privatelyOwnedStatus'] = privatelyOwned;
		schoolAffiliationFormDTO['campusArea'] = $("#campusArea").val();
		schoolAffiliationFormDTO['builtUpArea'] = $("#"+formId+" #builtArea").val();
		schoolAffiliationFormDTO['noOfClassRoom'] = $("#"+formId+" select#noOfClassroom option:selected").val();
		schoolAffiliationFormDTO['seatingCapacityOfClassRoom'] =  $("#"+formId+" select#totSeatingClassroom option:selected").val();
		schoolAffiliationFormDTO['noOfRoomExceptClassRoom'] = $("#"+formId+" select#totalRoom option:selected").val();
		schoolAffiliationFormDTO['noOfWashRoomForStaff'] = $("#"+formId+" select#washRoomStaff option:selected").val();
		schoolAffiliationFormDTO['noOfWashRoomForBoys'] = $("#"+formId+" select#boyWashRoom option:selected").val();
		schoolAffiliationFormDTO['noOfWashRoomForGirls'] = $("#"+formId+" select#girlWashRoom option:selected").val();
		schoolAffiliationFormDTO['sizeOfLibrary'] = $("#"+formId+" #sizeOfLibrary").val();
		schoolAffiliationFormDTO['noOfBooksInLibrary'] = $("#"+formId+" select#noOfBookLibrary option:selected").val();
		schoolAffiliationFormDTO['noOfDailies'] = $("#"+formId+" select#noOfDailiesLibrary option:selected").val();
		schoolAffiliationFormDTO['noOfPeriodicals'] = $("#"+formId+" select#noOfPeriodicalsLibrary option:selected").val();
		schoolAffiliationFormDTO['lababoratoryInPhysics'] = chkPhysics;
		schoolAffiliationFormDTO['laboratoryInChemistry'] = chkChemistry;
		schoolAffiliationFormDTO['laboratoryInBiology'] = chkBiology;
		schoolAffiliationFormDTO['laboratoryInComputer'] = chkComputer;
		schoolAffiliationFormDTO['noOfComputers'] = $("#"+formId+" #noOfcomputer").val();
		schoolAffiliationFormDTO['sizeOfIndoorPlayArea'] = $("#"+formId+" #indoorArea").val();;
		schoolAffiliationFormDTO['sizeOfOutdoorPlayArea'] = $("#"+formId+" #outdoorArea").val();;
		schoolAffiliationFormDTO['spaceForGames'] = $("#"+formId+" #spaceAreaGames").val();;
		schoolAffiliationFormDTO['doctorAvailability'] = chkDoctAvailability;
		schoolAffiliationFormDTO['ambulanceAvailability'] = chkAmbulAvail;
		schoolAffiliationFormDTO['audioVisualRoom'] = chkAudioVisualRoom;
		schoolAffiliationFormDTO['musicRoom'] = chkMusicRoom;
		schoolAffiliationFormDTO['conferenceRoom'] = chkConferenceRoom;
		schoolAffiliationFormDTO['staffRoom'] = chkSatffRooms;
		schoolAffiliationFormDTO['differentlyAbleStudents'] = $("#"+formId+" #differentlyAbleStudent").val();
		schoolAffiliationFormDTO['fireNoc'] = chkFireNoc;
		schoolAffiliationFormDTO['withoutFireNoc'] = chkWithoutFireNoc;
		schoolAffiliationFormDTO['nocIssuingDate'] = $("#nocDate").val();
		
	}
/*	else if(position==5){
		var chkSecurityArrangement = "false";
		if($("#securityArrangementsWith").is(":checked")){ 
			chkSecurityArrangement = "true";
		}
		
		var chkWithoutSecurityArrangement = "false";
		if($("#securityArrangementsWithout").is(":checked")){ 
			chkWithoutSecurityArrangement = "true";
		}
		
		var chkEmergencyExitPlan = "false";
		if($("#emergencyExitPlan").is(":checked")){ 
			chkEmergencyExitPlan = "true";
		}
		
		var chkWithoutEmergencyExitPlan = "false";
		if($("#noEmergencyExitPlan").is(":checked")){ 
			chkWithoutEmergencyExitPlan = "true";
		}
		
		var chkFireNoc = "false";
		if($("#fireNocHaving").is(":checked")){ 
			chkFireNoc = "true";
		}
		
		var chkWithoutFireNoc = "false";
		if($("#fireNocNotHaving").is(":checked")){ 
			chkWithoutFireNoc = "true";
		}
		
		var chkFireFightingMockDrills = "false";
		if($("#mockDrills").is(":checked")){ 
			chkFireFightingMockDrills = "true";
		}
		
		var chkWithoutFireFightingMockDrills = "false";
		if($("#noMockDrills").is(":checked")){ 
			chkWithoutFireFightingMockDrills = "true";
		}
		
		var chkOverheadWaterTank = "false";
		if($("#overHeadWaterTank").is(":checked")){ 
			chkOverheadWaterTank = "true";
		}
		
		var chkWithoutOverheadWaterTank = "false";
		if($("#noOverHeadWaterTank").is(":checked")){ 
			chkWithoutOverheadWaterTank = "true";
		}
		
		var chkUnderGroundWaterTank = "false";
		if($("#undergroungWaterTank").is(":checked")){ 
			chkUnderGroundWaterTank = "true";
		}
		
		var chkWithoutUnderGroundWaterTank = "false";
		if($("#noUndergroungWaterTank").is(":checked")){ 
			chkWithoutUnderGroundWaterTank = "true";
		}
		
		schoolAffiliationFormDTO['securityArrangements'] = chkSecurityArrangement;
		schoolAffiliationFormDTO['withoutSecurityArrangements'] = chkWithoutSecurityArrangement;
		schoolAffiliationFormDTO['emergencyExitPlan'] = chkEmergencyExitPlan;
		schoolAffiliationFormDTO['withoutEmergencyExitPlan'] = chkWithoutEmergencyExitPlan;
		schoolAffiliationFormDTO['fireNoc'] = chkFireNoc;
		schoolAffiliationFormDTO['withoutFireNoc'] = chkWithoutFireNoc;
		schoolAffiliationFormDTO['nocIssuingDate'] = $("#nocDate").val();
		schoolAffiliationFormDTO['firefightingMockDrills'] = chkFireFightingMockDrills;
		schoolAffiliationFormDTO['withoutFirefightingMockDrills'] = chkWithoutFireFightingMockDrills;
		schoolAffiliationFormDTO['overheadWaterTank'] = chkOverheadWaterTank;
		schoolAffiliationFormDTO['withoutOverheadWaterTank'] = chkWithoutOverheadWaterTank;
		schoolAffiliationFormDTO['overheadWaterTankCapacity'] = $("#"+formId+" #overheadTankCapacity").val();
		schoolAffiliationFormDTO['undergroundWaterTank'] = chkUnderGroundWaterTank;
		schoolAffiliationFormDTO['withoutUndergroundWaterTank'] = chkWithoutUnderGroundWaterTank;
		schoolAffiliationFormDTO['undergroundWaterTankCapacity'] = $("#underGroundCapacity").val();
		schoolAffiliationFormDTO['noOfWater_CarbonTypeExtinguisher'] = $("#"+formId+" #carbonwaterCapacity").val();
		schoolAffiliationFormDTO['noOfCarbonDioxideTypeExtinguisher'] = $("#"+formId+" #carbondioxideCapacity").val();
		schoolAffiliationFormDTO['noOfDryChemicalTypeExtinguisher'] = $("#"+formId+" #chemicalPowderCapacity").val();
	}*/
	else if(position==5){
		/*schoolAffiliationFormDTO['overallRemarkOfInstitution'] = $("#"+formId+" #ethos1").val();*/
		var submit = "submitted";
		if ( $("#ethos2").val() != undefined &&  $("#ethos2").val() != '') {
			schoolAffiliationFormDTO['achievementOfInstitution']  = encodeURIComponent($("#ethos2").val());
			}
		
		if ( $("#ethos3").val() != undefined &&  $("#ethos3").val() != '') {
			schoolAffiliationFormDTO['collaborateOfInstitution']  = encodeURIComponent($("#ethos3").val());
			}
		
		
		if ( $("#ethos4").val() != undefined &&  $("#ethos4").val() != '') {
			schoolAffiliationFormDTO['majorChallengesOfInstitution']  = encodeURIComponent($("#ethos4").val());
			}
		schoolAffiliationFormDTO['status'] = submit;
	}/*else if(position==7){
		var assurancesDetailList=[];
		var index=1;
		$("#tbl_assurance tbody tr").each(function() {
			var assurancesDetailsDTO = {};
			assurancesDetailsDTO['assuranceId']=this.id;
			console.log($("#assuranceDescription"+this.id).text());	 
			assurancesDetailsDTO['description']=$("#assuranceDescription"+this.id).text();
			console.log("yesParentId :: "+$('#yesParentId'+index).is(":checked"));
			console.log("noParentId :: "+$('#noParentId'+index).is(":checked"));
			if($('#yesParentId'+index).is(":checked")){
				assurancesDetailsDTO['value']  = true;
			}else if($('#noParentId'+index).is(":checked")){
				assurancesDetailsDTO['nvalue']  = false; 
			}
			assurancesDetailList.push( assurancesDetailsDTO);
			index++;
		});
		assurancesDetails['assurancesDetailDTO'] = assurancesDetailList;
		schoolAffiliationFormDTO['assuarnceDetails'] = assurancesDetails;
		
	}		*/
	requestData['schoolAffiliationFormDTO'] = schoolAffiliationFormDTO;
	authentication['hash'] = getHash();
	authentication['userType'] = 'ADMIN';
	//authentication['userId'] = $("#"+formId+" #userId").val();
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
	
}

function validateRequestForAffiliationForm(formId,moduleId, position){
	if(position==1){
		/*if ($("#schoolContactPersonName").val()==null || $("#schoolContactPersonName ").val()=='') {
			showMessage(true, 'Please contact person name is mandatory');
			return false
		}*/
		
		var schools = "false";
		if($("#mySchool").is(":checked")){ 
			schools = "true";
		}
		var colleges = "false";
		if($("#myCollege").is(":checked")){ 
			colleges = "true";
		}
		
		if(schools=="false" && colleges=="false"){
			showMessage(true, 'Please choose school or college');
			return false
		}
		
		
		/*if ($("#schoolName").val()==null || $("#schoolName ").val()=='') {
			showMessage(true, 'School name is mandatory');
			return false
		}
		
		
		if ($("#cityName").val()==null || $("#cityName ").val()=='') {
			showMessage(true, 'City name is mandatory');
			return false
		}*/
		
		
		if ($("#"+formId+" #parentOrg").val()=='' || $("#"+formId+" #parentOrg").val()==null) {
			showMessage(true, 'Name of the parent trust/society/foundation/organisation	 is mandatory');
			return false
		}
		
		var grades1 = "false";
		if($("#grade1").is(":checked")){ 
			grades1 = "true";
		}
		var grades2 = "false";
		if($("#grade2").is(":checked")){ 
			grades2 = "true";
		}
		
		var grades3 = "false";
		if($("#grade3").is(":checked")){ 
			grades3 = "true";
		}
		
		if(grades1=="false" && grades2=="false" && grades3=="false"){
			showMessage(true, 'Please choose grades');
			return false
		}
		if ($("#"+formId+" #mobile").val()==null || $("#"+formId+" #mobile").val()=='') {
			showMessage(true, 'Contact No. is mandatory');
			return false
		}
		/*if ($("#schoolPersonName").val()==null || $("#schoolPersonName ").val()=='') {
			showMessage(true, 'School person name is mandatory');
			return false
		}
		
		if ($("#designation").val()==null || $("#designation ").val()=='') {
			showMessage(true, 'Designation is mandatory');
			return false
		}*/
		
		/*if ($("#"+formId+" #schoolEmail").val().trim()=="" && !validateEmail($("#" + formId + " #schoolEmail").val().trim())) {
			showMessage(true, 'Please enter email id');
			return false
		}*/
		
	/*	if ($("#"+formId+" #mobile").val()==null || $("#"+formId+" #mobile").val()=='') {
			showMessage(true, 'Contact no. is mandatory');
			return false
		}
		
		if (validUrl($("#" + formId + " #schoolWeb").val().trim())) {
			return true
		}else{
			showMessage(true, 'Website is invalid'); 
			return false
		}*/
		
		if ($("#yearestablish").val()==null || $("#yearestablish ").val()==0) {
			showMessage(true, 'Please select year of  establishment');
			return false
		}
		
		if($("#"+formId+" #regDate").val()==null || $("#"+formId+" #regDate").val()==""){
			showMessage(true, 'Date of registration  is mandatory');
			return false
		}
		if(!validateAffiliationContactDetails()){
			return false;
		}
		
		if ($("#"+formId+" #principalName").val()=='' || $("#"+formId+" #principalName").val()==null) {
			showMessage(true, 'Name of the principal is mandatory');
			return false
		}
		if ($("#"+formId+" #principalDesign").val()==undefined || $("#"+formId+" #principalDesign").val()=='' || $("#"+formId+" #principalDesign").val()==null) {
			showMessage(true, 'Qualification of the principal is mandatory');
			return false
		}
		/*if ($("#"+formId+" #vision").val()==undefined || $("#"+formId+" #vision").val()=='' || $("#"+formId+" #vision").val()==null) {
			showMessage(true, 'Vision of the Institution is Mandatory');
			return false
		}*/
	}else if(position==2){
		var otherBoard = "false";
		if($("#chkBoardAssociated").is(":checked")){ 
			otherBoard = "true";
		}
		var nonOtherBoard = "false";
		if($("#chkBoardNotAssociated").is(":checked")){ 
			nonOtherBoard = "true";
		}
		if(otherBoard=="false" && nonOtherBoard=="false"){
			showMessage(true, 'Please choose "is the institution associated/affilieated with any other board/university?"');
			return false
		}
		if(otherBoard=="true"){
			if ($("#"+formId+" #parentOrgName").val()==undefined || $("#"+formId+" #parentOrgName").val()=='' || $("#"+formId+" #parentOrgName").val()==null) {
				showMessage(true, 'Name of the board/university is mandatory');
				return false
			}
			
			if ($("#"+formId+" #commenceDate").val()==undefined || $("#"+formId+" #commenceDate").val()=='' || $("#"+formId+" #commenceDate").val()==null) {
				showMessage(true, 'Date of commencement is mandatory');
				return false
			}
			
			var pDateFrom =$("#"+formId+" #periodDateFrom").val();
			var newDate1 = pDateFrom.split('-');
			var resultSDate=(newDate1[2]+','+newDate1[1]+','+newDate1[0]);
			if(pDateFrom==null || pDateFrom==""){
				showMessage(true, 'Period of association/affiliation: from  is mandatory');
				return false
			}
			
			var pDateTo =$("#"+formId+" #periodDateTo").val();
			var newDate2 = pDateTo.split('-');
			var resultEDate=(newDate2[2]+','+newDate2[1]+','+newDate2[0]);
			if(pDateTo==null || pDateTo==""){
				showMessage(true, 'Period of association/affiliation: to  is mandatory');
				return false
			}
			
			if(resultSDate>=resultEDate){
				showMessage(true, 'End period of association/affiliation cannot be less than start period');
				return false
			}
			
			if ($("#"+formId+" #financialAid").val()==undefined || $("#"+formId+" #financialAid").val()=='' || $("#"+formId+" #financialAid").val()==null) {
				showMessage(true, 'Information regarding Institution receiving financial aid is mandatory');
				return false
			}
			
		}
	}else if(position==3){
		if ($("#"+formId+" #totalBoys").val()=='' || $("#"+formId+" #totalBoys").val()==null) {
			showMessage(true, 'Enter total no. of  boys');
			return false
		}
		if ($("#"+formId+" #totalGirls").val()=='' || $("#"+formId+" #totalGirls").val()==null) {
			showMessage(true, 'Enter total no. of girls');
			return false
		}
//		if ($("#session").val()==null || $("#session ").val()==0) {
//			showMessage(true, 'Please Select year of  Academic Year');
//			return false
//		}
//		if ($("#academicYear").val()=="" || $("#academicYear ").val()==null) {
//			showMessage(true, 'Enter Student Number');
//			return false
//		}
		if(!validateAffiliationAcademicDetails()){
			return false;
		}
//		var status=true;
//		$(".academicDetails").each(function() {
//			var academicYears= $(this).find("option:selected").attr("value");
//			var academicYearStudent= $(this).find("input[name^=academicYear]").val();
//			
//			if(academicYears!='' || academicYearStudent!=''){
//				if(academicYears=='' || academicYears==0 || academicYears==null){
//					showMessage(true, 'Please Select year of  Academic Year');
//					return false
//				}
//				if(academicYearStudent=='' || academicYearStudent==0 || academicYearStudent==null){
//					showMessage(true, 'Enter Student Number');
//					return false
//				}	
//			}
//		
//		});
		
		/*if ($("#"+formId+" #totalStaff").val()=='' || $("#"+formId+" #totalStaff").val()==null) {
			showMessage(true, 'Total number of staff is mandatory');
			return false
		}*/
		if ($("#"+formId+" #techingStaff").val()=='' || $("#"+formId+" #techingStaff").val()==null) {
			showMessage(true, 'Number of teaching staff is mandatory');
			return false
		}
		if ($("#"+formId+" #nonTeachStaff").val()=='' || $("#"+formId+" #nonTeachStaff").val()==null) {
			showMessage(true, 'Number of non-teaching staff is mandatory');
			return false
		}
		/*if ($("#"+formId+" #teachStaffDegree").val()=='' || $("#"+formId+" #teachStaffDegree").val()==null) {
			showMessage(true, 'Number of Teaching staff with Bachelor of Education Degree is Mandatory');
			return false
		}*/
		/*var improvePlan = "false";
		if($("#improvePlan1").is(":checked")){ 
			improvePlan = "true";
		}
		
		var withoutImprovePlan = "false";
		if($("#improvePlan2").is(":checked")){ 
			withoutImprovePlan = "true";
		}
		if(improvePlan=="false" && withoutImprovePlan=="false"){
			showMessage(true, 'Please check "Whether the Institution has a formal Improvement Plan?"');
			return false
		}*/
	}else if(position==4){
		var societyOwner = "false";
		if($("#societyOwned").is(":checked")){ 
			societyOwner = "true";
		}
		
		var rentedOwned = "false";
		if($("#rented").is(":checked")){ 
			rentedOwned = "true";
		}
		
		var privatelyOwned = "false";
		if($("#privatelyOwned").is(":checked")){ 
			privatelyOwned = "true";
		}
		
		if(societyOwner=="false" && rentedOwned=="false" && privatelyOwned=="false"){
			showMessage(true, 'Please check campus ownership status');
			return false
		}
		
		if ($("#"+formId+" #campusArea").val()=='' || $("#"+formId+" #campusArea").val()==null) {
			showMessage(true, 'Enter campus area in sq meters');
			return false
		}
		if ($("#"+formId+" #builtArea").val()=='' || $("#"+formId+" #builtArea").val()==null) {
			showMessage(true, 'Enter built up area in sq ft');
			return false
		}
		if ($("#"+formId+" #noOfClassroom option:selected").val()=='1' || $("#"+formId+" #noOfClassroom option:selected").val()==null) {
			showMessage(true, 'Enter no. of classrooms');
			return false
		}
		
		if ($("#"+formId+" #totSeatingClassroom option:selected").val()=='1' || $("#"+formId+" #totSeatingClassroom option:selected").val()==null) {
			showMessage(true, 'Enter total seating capacity of classrooms');
			return false
		}
		
		/*if ($("#"+formId+" #noOfClassroom").val()=='' || $("#"+formId+" #noOfClassroom").val()==null) {
			showMessage(true, 'Enter no. of classrooms');
			return false
		}*/
		/*if ($("#"+formId+" #totSeatingClassroom").val()=='' || $("#"+formId+" #totSeatingClassroom").val()==null) {
			showMessage(true, 'Enter total seating capacity of classrooms');
			return false
		}*/
		
		if ($("#"+formId+" #totalRoom option:selected ").val()=='1' || $("#"+formId+" #totalRoom option:selected").val()==null) {
			showMessage(true, 'Enter no. of rooms other than classrooms');
			return false
		}
		if ($("#"+formId+" #washRoomStaff  option:selected").val()=='' || $("#"+formId+" #washRoomStaff option:selected").val()==null) {
			showMessage(true, 'Enter no. of washrooms for staff');
			return false
		}
		if ($("#"+formId+" #boyWashRoom option:selected").val()=='' || $("#"+formId+" #boyWashRoom option:selected").val()==null) {
			showMessage(true, 'Enter no. of washrooms for boys');
			return false
		}
		if ($("#"+formId+" #girlWashRoom option:selected").val()=='' || $("#"+formId+" #girlWashRoom option:selected").val()==null) {
			showMessage(true, 'Enter no. of washrooms for girls');
			return false
		}
		
		var chkPhysics = "false";
		if($("#chkPhysic").is(":checked")){ 
			chkPhysics = "true";
		}
		
		var chkChemistry = "false";
		if($("#chkChemistry").is(":checked")){ 
			chkChemistry = "true";
		}
		
		var chkBiology = "false";
		if($("#chkBiology").is(":checked")){ 
			chkBiology = "true";
		}
		
		var chkComputer = "false";
		if($("#chkComputer").is(":checked")){ 
			chkComputer = "true";
		}
		
//		if(chkPhysics=="false" && chkChemistry=="false" && chkBiology=="false" && chkComputer"false"){
//			showMessage(true, 'Please check "Laboratory Facilities"');
//			return false
//		}
		
		if(chkComputer=="true"){
			if ($("#"+formId+" #noOfcomputer").val()=='' || $("#"+formId+" #noOfcomputer").val()==null) {
				showMessage(true, 'Enter total number of computers');
				return false
			}
		}
		
		if ($("#"+formId+" #sizeOfLibrary").val()=='' || $("#"+formId+" #sizeOfLibrary").val()==null) {
			showMessage(true, 'Enter the size of library in sq ft');
			return false
		}
		if ($("#"+formId+" #noOfBookLibrary option:selected").val()=='1' || $("#"+formId+" #noOfBookLibrary option:selected").val()==null) {
			showMessage(true, 'Enter no. of books in library');
			return false
		}
		if ($("#"+formId+" #noOfDailiesLibrary option:selected").val()=='1' || $("#"+formId+" #noOfDailiesLibrary option:selected").val()==null) {
			showMessage(true, 'Enter no. of dailies');
			return false
		}
		if ($("#"+formId+" #noOfPeriodicalsLibrary option:selected").val()=='1' || $("#"+formId+" #noOfPeriodicalsLibrary option:selected").val()==null) {
			showMessage(true, 'Enter no. of periodicals');
			return false
		}
		if ($("#"+formId+" #indoorArea").val()=='' || $("#"+formId+" #indoorArea").val()==null) {
			showMessage(true, 'Enter size of indoor play area in sq. ft');
			return false
		}
		if ($("#"+formId+" #outdoorArea").val()=='' || $("#"+formId+" #outdoorArea").val()==null) {
			showMessage(true, 'Enter size of outdoor play area in sq. ft');
			return false
		}
		if ($("#"+formId+" #spaceAreaGames").val()=='' || $("#"+formId+" #spaceAreaGames").val()==null) {
			showMessage(true, 'Enter space available for sports/games');
			return false
		}
		var chkDoctAvailability = "false";
		if($("#chkDoctAvail").is(":checked")){ 
			chkDoctAvailability = "true";
		}
		
		var chkAmbulAvail = "false";
		if($("#chkAmbulAvail").is(":checked")){ 
			chkAmbulAvail = "true";
		}
		
		if(chkDoctAvailability=="false" && chkAmbulAvail=="false"){
			showMessage(true, 'Please check medical facilities');
			return false
		}
		var chkMusicRoom = "false";
		if($("#chkMusic").is(":checked")){ 
			chkMusicRoom = "true";
		}
		
		var chkAudioVisualRoom = "false";
		if($("#chkAudio").is(":checked")){ 
			chkAudioVisualRoom = "true";
		}
		
		var chkConferenceRoom = "false";
		if($("#chkConference").is(":checked")){ 
			chkConferenceRoom = "true";
		}
		
		var chkSatffRooms = "false";
		if($("#chkStaffRoom").is(":checked")){ 
			chkSatffRooms = "true";
		}
		
		var chkFireNoc = "false";
		if($("#fireNocHaving").is(":checked")){ 
			chkFireNoc = "true";
		}
		
		var chkWithoutFireNoc = "false";
		if($("#fireNocNotHaving").is(":checked")){ 
			chkWithoutFireNoc = "true";
		}
		if(chkFireNoc=="false" && chkWithoutFireNoc=="false"){
			showMessage(true, 'Please check fire noc');
			return false
		}
		if(chkFireNoc=="true"){
			var nocDate =$("#"+formId+" #nocDate").val();
			if(nocDate==null || nocDate==""){
				showMessage(true, 'Enter noc issuing date');
				return false
			}
		}
		
	}
	/*else if(position==5){
		
		var chkSecurityArrangement = "false";
		if($("#securityArrangementsWith").is(":checked")){ 
			chkSecurityArrangement = "true";
		}
		
		var chkWithoutSecurityArrangement = "false";
		if($("#securityArrangementsWithout").is(":checked")){ 
			chkWithoutSecurityArrangement = "true";
		}
		

		if(chkSecurityArrangement=="false" && chkWithoutSecurityArrangement=="false"){
			showMessage(true, 'Please check "Does your Institution have security arrangements?"');
			return false
		}
		
		var chkEmergencyExitPlan = "false";
		if($("#emergencyExitPlan").is(":checked")){ 
			chkEmergencyExitPlan = "true";
		}
		
		var chkWithoutEmergencyExitPlan = "false";
		if($("#noEmergencyExitPlan").is(":checked")){ 
			chkWithoutEmergencyExitPlan = "true";
		}
		

		if(chkEmergencyExitPlan=="false" && chkWithoutEmergencyExitPlan=="false"){
			showMessage(true, 'Does your Institution have a formal Emergency Exit Plan?"');
			return false
		}
		var chkFireNoc = "false";
		if($("#fireNocHaving").is(":checked")){ 
			chkFireNoc = "true";
		}
		
		var chkWithoutFireNoc = "false";
		if($("#fireNocNotHaving").is(":checked")){ 
			chkWithoutFireNoc = "true";
		}
		if(chkFireNoc=="false" && chkWithoutFireNoc=="false"){
			showMessage(true, 'Please check "Fire NOC"');
			return false
		}
		if(chkFireNoc=="true"){
			var nocDate =$("#"+formId+" #nocDate").val();
			if(nocDate==null || nocDate==""){
				showMessage(true, 'Enter NOC issuing date');
				return false
			}
		}
		var chkFireFightingMockDrills = "false";
		if($("#mockDrills").is(":checked")){ 
			chkFireFightingMockDrills = "true";
		}
		
		var chkWithoutFireFightingMockDrills = "false";
		if($("#noMockDrills").is(":checked")){ 
			chkWithoutFireFightingMockDrills = "true";
		}
		

		if(chkFireFightingMockDrills=="false" && chkWithoutFireFightingMockDrills=="false"){
			showMessage(true, 'Please check "Firefighting mock drills carried out or not:"');
			return false
		}
		var chkOverheadWaterTank = "false";
		if($("#overHeadWaterTank").is(":checked")){ 
			chkOverheadWaterTank = "true";
		}
		var chkWithoutOverheadWaterTank = "false";
		if($("#noOverHeadWaterTank").is(":checked")){ 
			chkWithoutOverheadWaterTank = "true";
		}
		if(chkOverheadWaterTank=="false" && chkWithoutOverheadWaterTank=="false"){
			showMessage(true, 'Please check "Overhead water tank"');
			return false
		}
		
		if(chkOverheadWaterTank=="true"){
			if ($("#"+formId+" #overheadTankCapacity").val()=='' || $("#"+formId+" #overheadTankCapacity").val()==null) {
				showMessage(true, 'Enter Overhead water tank capacity');
				return false
			}
		} 
		var chkUnderGroundWaterTank = "false";
		if($("#undergroungWaterTank").is(":checked")){ 
			chkUnderGroundWaterTank = "true";
		}
		
		var chkWithoutUnderGroundWaterTank = "false";
		if($("#noUndergroungWaterTank").is(":checked")){ 
			chkWithoutUnderGroundWaterTank = "true";
		}

		if(chkUnderGroundWaterTank=="false" && chkWithoutUnderGroundWaterTank=="false"){
			showMessage(true, 'Please check "Underground water tank"');
			return false
		}
		if(chkUnderGroundWaterTank=="true"){
			if ($("#"+formId+" #underGroundCapacity").val()=='' || $("#"+formId+" #underGroundCapacity").val()==null) {
				showMessage(true, 'Enter Underground  water tank capacity');
				return false
			}
		}
		if ($("#"+formId+" #carbonwaterCapacity").val()=='' || $("#"+formId+" #carbonwaterCapacity").val()==null) {
			showMessage(true, 'Enter No. of water - CO2 type fire extinguishers 9 kg capacity is Mandatory');
			return false
		}
		if ($("#"+formId+" #carbondioxideCapacity").val()=='' || $("#"+formId+" #carbondioxideCapacity").val()==null) {
			showMessage(true, 'Enter No. of carbon dioxide type fire extinguishers 2 kg capacity is Mandatory');
			return false
		}
		if ($("#"+formId+" #chemicalPowderCapacity").val()=='' || $("#"+formId+" #chemicalPowderCapacity").val()==null) {
			showMessage(true, 'Enter No. of dry chemical powder type fire extinguisher 5 kg capacity is Mandatory');
			return false
		}
	}*/
	/*else if(position==5){
		if ($("#"+formId+" #ethos1").val()==undefined || $("#"+formId+" #ethos1").val()=='' || $("#"+formId+" #ethos1").val()==null) {
			showMessage(true, 'Enter ethos1 is Mandatory');
			return false
		}
		if ($("#"+formId+" #ethos2").val()==undefined || $("#"+formId+" #ethos2").val()=='' || $("#"+formId+" #ethos2").val()==null) {
			showMessage(true, 'Please fill-out list of Achievement(s) of the Institution');
			return false
		}
		if ($("#"+formId+" #ethos3").val()==undefined || $("#"+formId+" #ethos3").val()=='' || $("#"+formId+" #ethos3").val()==null) {
			showMessage(true, 'Please fill why you want to offer NWAC American High School Program at your Institution Campus');
			return false
		}
		if ($("#"+formId+" #ethos4").val()==undefined || $("#"+formId+" #ethos4").val()=='' || $("#"+formId+" #ethos4").val()==null) {
			showMessage(true, 'Please fill why you think you should collaborate with NWAC for your Institution');
			return false
		}
	}*/
return true;
}
function validateAffiliationContactDetails(){
	var status=true;
	$(".affiliationContact tbody tr").each(function() {
		var pname = $(this).find("input[name^=contactPersonName]").val();
		var pdesignation = $(this).find("input[name^=contactPersonDesig]").val();
		var pcontact = $(this).find("input[name^=contactPersonContact]").val();
		var pemail = $(this).find("input[name^=contactPersonEmail]").val();
		if(pname!='' || pdesignation!='' || pcontact!='' || pemail!=''){
			if(pname=='' || pname==undefined){
				showMessage(true, 'Name is required');
				status=false;
				return false;
			}
			if(pdesignation=='' || pdesignation==undefined){
				showMessage(true, 'Designation is required');
				status=false;
				return false;
			}
			if(pcontact=='' || pcontact==undefined){
				showMessage(true, 'Contact No. is required');
				status=false;
				return false;
			}
			if(pemail=='' || pemail==undefined ){
				showMessage(true, 'Email is required');
				status=false;
				return false;
			}
		}
	});
	return status;
}
function validateAffiliationAcademicDetails(){
			var yearArray=[];
			var status=true;
			var academicYears="";
			var flag=false;
			$(".academicDetails").each(function() {
				var academicYears= $(this).find("option:selected").attr("value");
				yearArray.push(academicYears);
				flag=true;
				var academicYearStudent= $(this).find("input[name^=academicYear]").val();
				
//				if(academicYears!='' || academicYearStudent!=''){
					if(academicYears=='' || academicYears==0 || academicYears==undefined){
						showMessage(true, 'Please select academic year');
						status=false;
						return false
					}
					if(academicYearStudent=='' || academicYearStudent==0 || academicYearStudent==undefined){
						showMessage(true, 'Enter total no. of students');
						status=false;
						return false
					}	
					
			});
////			if(flag){
//				var result=$.inArray(academicYears,yearArray);
//				if(result!=-1){
//					showMessage(true, 'Year can not be same');
//					status=false;
//					return false
//				}
//			}
	return status;
}

function resetUserForm(formId){
	/*$('#'+formId)[0].reset();
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
	$("#"+formId+" #chkPreStudent").prop('checked',false);*/
}

/*function decresePosition(processPage){
	processPage = processPage-1;
	callForAffiliationForm('addAffiliation','COMMON','processPage');
}*/
function validUrl(url) {
    var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!regexp.test(url)) {
        return false;
    }else{
    	 return true;
    } 
  
}

function preliminaryFormWarning(formId,moduleId, msg, step){
	if(!validateRequestForSubmitPreliminaryForm(formId, moduleId, step)){
		return false;
	}
	var warningYes = "callForAffiliationForm('"+formId+"','"+moduleId+"','"+msg+"','"+step+"')";  
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text(msg);
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}


function validateRequestForSubmitPreliminaryForm(formId, moduleId, position){
	if(position==5){
		if ($("#"+formId+" #ethos2").val()==undefined || $("#"+formId+" #ethos2").val()=='' || $("#"+formId+" #ethos2").val()==null) {
			showMessage(true, 'Please fill-out list of Achievement(s) of the Institution');
			return false
		}
		if ($("#"+formId+" #ethos3").val()==undefined || $("#"+formId+" #ethos3").val()=='' || $("#"+formId+" #ethos3").val()==null) {
			showMessage(true, 'Please fill why you want to offer NWAC American High School Program at your Institution Campus');
			return false
		}
		if ($("#"+formId+" #ethos4").val()==undefined || $("#"+formId+" #ethos4").val()=='' || $("#"+formId+" #ethos4").val()==null) {
			showMessage(true, 'Please fill why you think you should collaborate with NWAC for your Institution');
			return false
		}
	}
return true;
}


