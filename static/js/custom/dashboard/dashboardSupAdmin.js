$(document).ready(function() {

});
function callDashboardPageSupAdmin(pageNo, replaceDiv, agrs, secondArgs){
	if(pageNo=='1'){
		callForDashboardData('formIdIfAny','super-admin-content',replaceDiv);
	}else if(pageNo=='2a'){
		callForDashboardData('formIdIfAny','manage-school-content', replaceDiv);
	}else if(pageNo=='2aa'){
		callForDashboardData('formIdIfAny','manage-affiliation-school-content'+agrs, replaceDiv);
	}else if(pageNo=='2b'){
		callForDashboardData('formIdIfAny','add-school-content'+agrs, replaceDiv);
	}else if(pageNo=='2bb'){
		callForDashboardData('formIdIfAny','school-enabled-date-content?dateOfMonth=', replaceDiv);
	}else if(pageNo=='3a'){
		callForDashboardData('formIdIfAny','manage-student-content'+agrs, replaceDiv, secondArgs);
	}else if(pageNo=='3approve'){
		callForDashboardData('formIdIfAny','manage-student-content'+agrs, replaceDiv, secondArgs);
	}else if(pageNo=='3b'){
		callForDashboardData('formIdIfAny','add-student-content'+agrs, replaceDiv);
	}else if(pageNo=='3c'){
		callForDashboardData('formIdIfAny','student-id-card'+agrs, replaceDiv);
	}else if(pageNo=='3d'){
		callForDashboardData('formIdIfAny','student-promotion'+agrs, replaceDiv);
	}else if(pageNo=='3e'){
		callForDashboardData('formIdIfAny','student-promotion-request'+agrs, replaceDiv);
	}else if(pageNo=='3f'){
		callForDashboardData('formIdIfAny','manage-student-content'+agrs, replaceDiv);
	}else if(pageNo=='4'){
		callForDashboardData('formIdIfAny','manage-subject-content', replaceDiv);
	}else if(pageNo=='4a'){
		callForDashboardData('formIdIfAny','view-subject-content'+agrs, replaceDiv);
	}else if(pageNo=='4b'){
		callForDashboardData('formIdIfAny','add-subject-content'+agrs, replaceDiv);
	}else if(pageNo=='4c'){
		callForDashboardData('formIdIfAny','manage-exams-content'+agrs, replaceDiv);
	}else if(pageNo=='4d'){
		callForDashboardData('formIdIfAny','manage-exams-subject-List'+agrs, replaceDiv);
	}else if(pageNo=='5a'){
		callForDashboardData('formIdIfAny','manage-counsultant-content'+agrs, replaceDiv);
	}else if(pageNo=='5b'){
		callForDashboardData('formIdIfAny','add-counsultant-content'+agrs, replaceDiv);
	}else if(pageNo=='6a'){
		callForDashboardData('formIdIfAny','manage-Counselor-Content'+agrs, replaceDiv);
	}else if(pageNo=='6b'){
		callForDashboardData('formIdIfAny','add-counseler-content'+agrs, replaceDiv);
	}else if(pageNo=='7a'){
		callForDashboardData('formIdIfAny','manage-banks-content'+agrs, replaceDiv);
	}else if(pageNo=='7b'){
		callForDashboardData('formIdIfAny','manage-accounts-content'+agrs, replaceDiv);
	}else if(pageNo=='8'){
		callForDashboardData('formIdIfAny','manage-enquiry-content', replaceDiv);
	}else if(pageNo=='9a'){
		callForDashboardData('formIdIfAny','manage-user-content', replaceDiv);
	}else if(pageNo=='9b'){
		callForDashboardData('formIdIfAny','add-user-content?controllType=add&id=0', replaceDiv);
	}else if(pageNo=='9a1'){
		callForDashboardData('formIdIfAny','online-user-content', replaceDiv);
	}else if(pageNo=='9b1'){
		callForDashboardData('formIdIfAny','sessionout-user-content?controllType=sessionOut&id=0', replaceDiv);
	}else if(pageNo=='12b'){
		callForDashboardData('formIdIfAny','manage-accrediation-content', replaceDiv);
	}else if(pageNo=='15a'){
		callForDashboardData('formIdIfAny','manage-pre-student-content'+agrs, replaceDiv);
	}else if(pageNo=='15b'){
		callForDashboardData('formIdIfAny','add-pre-student-content'+agrs, replaceDiv);
	}else if(pageNo=='erp101'){
	    callForDashboardData('formIdIfAny','depositer-payment'+agrs, replaceDiv);
	}else if(pageNo=='session1'){
	    callForDashboardData('formIdIfAny','manage-session-content', replaceDiv);
	}else if(pageNo=='certificate'){
	    callForDashboardData('formIdIfAny','student-certificates', replaceDiv);
	}else if(pageNo=='18'){
	    callForDashboardData('formIdIfAny','manage-duplicate-certificate-request', replaceDiv);
	}else if(pageNo=='19'){
	    callForDashboardData('formIdIfAny','manage-external-verification-request', replaceDiv);
	}else if(pageNo=='17'){
	    callForDashboardData('formIdIfAny','available-slots', replaceDiv);
	}else if(pageNo=='10a'){
		callForDashboardData('formIdIfAny','manage-payment-list', replaceDiv);
	}else if(pageNo=='10b'){
		callForDashboardData('formIdIfAny','download-form-list'+agrs, replaceDiv);
	}else if(pageNo=='10c'){
		callForDashboardData('formIdIfAny','download-logs/1', replaceDiv);
	}else if(pageNo=='10d'){
	    callForDashboardData('formIdIfAny','student-marks', replaceDiv);
	}else if(pageNo=='20'){
	    callForDashboardData('formIdIfAny','appointment-list', replaceDiv);
	}else if(pageNo=='21'){
	    callForDashboardData('formIdIfAny','manage-courier-content'+agrs, replaceDiv,secondArgs);
	}else if(pageNo=='21c'){
	    callForDashboardData('formIdIfAny','manage-courier-content?courierTypeMode=2', replaceDiv);   
	}else if(pageNo=='21a'){
	    callForDashboardData('formIdIfAny','add-courier-content'+agrs, replaceDiv, secondArgs);
	}else if(pageNo=='21b'){
	    callForDashboardData('formIdIfAny','print-courier-content', replaceDiv);
	}else if(pageNo=='22'){
	    callForDashboardData('formIdIfAny','school-affiliation-form'+agrs, replaceDiv);
	}else if(pageNo=='22c'){
	    callForDashboardData('formIdIfAny','school-date-visit-form?startDate=', replaceDiv);
	}else if(pageNo=='2aa1'){
	    callForDashboardData('formIdIfAny','manage-date-visit-school-content', replaceDiv);
	}
	else if(pageNo=='23a'){
	    callForDashboardData('formIdIfAny','previously-submitted-form'+agrs, replaceDiv);
	}
	else if(pageNo=='23b'){
	    callForDashboardData('formIdIfAny','all-affiliation-school?controllType=submittedForm', replaceDiv);
	}
	else if(pageNo=='23c'){
	    callForDashboardData('formIdIfAny','all-affiliation-school?controllType=savedForm', replaceDiv);
	}
	else if(pageNo=='23d'){
	    callForDashboardData('formIdIfAny','all-affiliation-school?controllType=pendingReport', replaceDiv);
	}
	else if(pageNo=='23e'){
	    callForDashboardData('formIdIfAny','all-affiliation-school?controllType=prevSubmittedReport', replaceDiv);
	}
	else if(pageNo=='23f'){
	    callForDashboardData('formIdIfAny','manage-affiliation-request', replaceDiv);
	}
	else if(pageNo=='23g'){
		callForDashboardData('formIdIfAny','audit-visit-remark', replaceDiv);
	}
	else if(pageNo=='23h'){
		callForDashboardData('formIdIfAny','school-payment-receipt', replaceDiv);
	}
	else if(pageNo=='announce'){
		pdfDownload(replaceDiv);
	}else if(pageNo=='information'){
	    callForDashboardData('formIdIfAny','manage-information-content', replaceDiv);
	}else if(pageNo=='stufee'){
	    callForDashboardData('formIdIfAny','manage-student-fee', replaceDiv);
	}else if(pageNo=='examguide'){
	    callForDashboardData('formIdIfAny','manage-examination-guideline', replaceDiv);
	}else if(pageNo=='stueligi'){
	    callForDashboardData('formIdIfAny','manage-eligibility-criteria', replaceDiv);
		//pdfDownload("https://seriindia.org/ELIGIBILITY_CRITERIA_ADMISSION_2023_24.pdf");
	}else if(pageNo=='studentFee'){
	    callForDashboardData('formIdIfAny','manage-student-fee-struct', replaceDiv);
	}else if(pageNo=='24a'){
		callForDashboardData('formIdIfAny','iti-center-content', replaceDiv);
	}else if(pageNo=='24b'){
		callForDashboardData('formIdIfAny','iti-student-content', replaceDiv);
	}

}
function pdfDownload(pathFile) { 
    window.open(""+pathFile+"", "_blank"); 
} 
function callSupAdminInneraction(actionType, arg0, replaceDiv, secondArgs){
	if(actionType=='counselor'){
		callForDashboardData('formIdIfAny','add-counseler-content'+arg0, replaceDiv);	
	}else if(actionType=='consultant'){
		callForDashboardData('formIdIfAny','add-counsultant-content'+arg0, replaceDiv);	
	}else if(actionType=='school'){
		callForDashboardData('formIdIfAny','add-school-content'+arg0, replaceDiv);
	}else if(actionType=='student'){
		callForDashboardData('formIdIfAny','add-student-content'+arg0, replaceDiv);
	}else if(actionType=='subject'){
		callForDashboardData('formIdIfAny','add-subject-content'+arg0, replaceDiv);
	}
	else if(actionType=='user'){
		callForDashboardData('formIdIfAny','add-user-content'+arg0, replaceDiv);
	}else if(actionType=='sessionout'){
		callForDashboardData('formIdIfAny','sessionout-user-content'+arg0, replaceDiv);
	}
	else if(actionType=='studentPre'){
		callForDashboardData('formIdIfAny','add-pre-student-content'+arg0, replaceDiv);
	}else if(actionType=='totalAmount'){
		callForDashboardData('formIdIfAny','paymentList-Content'+arg0, replaceDiv);
	}else if(actionType=='meetingSlot'){
		callForDashboardData('formIdIfAny','add-meeting-slot-content'+arg0, replaceDiv);
	}else if(actionType=='courier'){
		callForDashboardData('formIdIfAny','add-courier-content'+arg0, replaceDiv);
	}else if(actionType=='22cc'){
		callForDashboardData('formIdIfAny','school-date-visit-form'+arg0, replaceDiv);
	}else if(actionType=='22c1'){
	    callForDashboardData('formIdIfAny','school-date-visit-form?startDate='+arg0, replaceDiv);
	}else if(actionType=='affiliationForm'){
	    callForDashboardData('formIdIfAny','school-affiliation-form'+arg0, replaceDiv);
	}else if(actionType=='saveAffiliationForm'){
	    callForDashboardData('formIdIfAny','save-school-affiliation-form'+arg0, replaceDiv);
	}else if(actionType=='courier'){
		callForDashboardData('formIdIfAny','add-courier-content'+arg0, replaceDiv, secondArgs);
	}else if(actionType=='readinessForm'){
		callForDashboardData('formIdIfAny','readiness-remark-content'+arg0, replaceDiv, secondArgs);
	}
}


