
$(document).ready(function() {

});

function callDashboardPageSchoolUser(pageNo, replaceDiv, agrs){
	if(pageNo=='1'){
		callForDashboardData('formIdIfAny','school-content',replaceDiv);
	}else if(pageNo=='2a'){
		callForDashboardData('formIdIfAny','manage-student-request-content', replaceDiv);
	}
	else if(pageNo=='2b'){
		callForDashboardData('formIdIfAny','school-add-student-content'+agrs, replaceDiv);
	}
	/*else if(pageNo=='3a'){
		callForDashboardData('formIdIfAny','manage-student-content', replaceDiv);
	}else if(pageNo=='3b'){
		callForDashboardData('formIdIfAny','add-student-content'+agrs, replaceDiv);
	}*/
//	else if(pageNo=='3b'){
//		callForDashboardsData('formIdIfAny','add-student', replaceDiv);
//	}else if(pageNo=='3b'){
//		callForDashboardData('formIdIfAny','examination-attendance-sheet', replaceDiv);
//    }
	/*else if(pageNo=='4'){
		callForDashboardData('formIdIfAny','manage-subject-content', replaceDiv);
	}else if(pageNo=='4a'){
		callForDashboardData('formIdIfAny','view-subject-content'+agrs, replaceDiv);
	}else if(pageNo=='4b'){
		callForDashboardData('formIdIfAny','add-subject-content'+agrs, replaceDiv);
	}else if(pageNo=='5a'){
		callForDashboardData('formIdIfAny','manage-counsultant-content'+agrs, replaceDiv);
	}else if(pageNo=='5b'){
		callForDashboardData('formIdIfAny','add-counsultant-content'+agrs, replaceDiv);
	}else if(pageNo=='6a'){
		callForDashboardData('formIdIfAny','manage-Counselor-Content', replaceDiv);
	}else if(pageNo=='6b'){
		callForDashboardData('formIdIfAny','add-counseler-content'+agrs, replaceDiv);
	}*/
	/*else if(pageNo=='7'){
		callForDashboardData('formIdIfAny','manage-accounts', replaceDiv);
	}else if(pageNo=='8a'){
		callForDashboardData('formIdIfAny','all-incoming-courier', replaceDiv);
	}else if(pageNo=='8b'){
		callForDashboardData('formIdIfAny','all-outcoming-courier', replaceDiv);
	}*/
//	else if(pageNo=='9a'){
//		callForDashboardData('formIdIfAny','manage-user', replaceDiv);
//	}
	/*else if(pageNo=='9b'){
		callForDashboardData('formIdIfAny','add-user', replaceDiv);
	}*/
//	else if(pageNo=='10a'){
//		callForDashboardData('formIdIfAny','added-by-admin', replaceDiv);
//	}else if(pageNo=='10b'){
//		callForDashboardData('formIdIfAny','added-by-school', replaceDiv);
//	}else if(pageNo=='11'){
//		callForDashboardData('formIdIfAny','list-of-students', replaceDiv);
//	}else if(pageNo=='12a'){
//		callForDashboardData('formIdIfAny','enquiry', replaceDiv);
//	}else if(pageNo=='12b'){
//		callForDashboardData('formIdIfAny','accrediation-enquiry', replaceDiv);
//	}else if(pageNo=='13'){
//		callForDashboardData('formIdIfAny','application-details', replaceDiv);
//	}

}
function callSchoolUserInneraction(actionType, arg0, replaceDiv){
	if(actionType=='student'){
		callForDashboardData('formIdIfAny','school-add-student-content'+arg0, replaceDiv);	
	}
	/*else if(actionType=='consultant'){
		callForDashboardData('formIdIfAny','add-counsultant-content'+arg0, replaceDiv);	
	}else if(actionType=='school'){
		callForDashboardData('formIdIfAny','add-school-content'+arg0, replaceDiv);
	}else if(actionType=='student'){
		callForDashboardData('formIdIfAny','add-student-content'+arg0, replaceDiv);
	}else if(actionType=='subject'){
		callForDashboardData('formIdIfAny','add-subject-content'+arg0, replaceDiv);
	}*/
}
