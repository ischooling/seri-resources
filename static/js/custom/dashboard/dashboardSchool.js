function callDashboardPageSchool(pageNo, replaceDiv){
	if(pageNo=='target1'){
		callForDashboardData('formIdIfAny','set-target-content');
	}else if(pageNo=='target2'){
		callForDashboardData('formIdIfAny','daily-target-content');
	}else if(pageNo=='targetCount'){
		callForDashboardData('formIdIfAny','target-count-content?targetid=1');
	}else if(pageNo=='counselorTargetCount'){
		callForDashboardData('formIdIfAny','counselor-leaderboard-content?targetid=1');
	}else if(pageNo=='erp001'){
		callForDashboardData('formIdIfAny','account-dashboard-content');
	}else if(pageNo=='erp002'){
		callForDashboardData('formIdIfAny','director-dashboard-content');
	}else if(pageNo=='erp101'){
		callForDashboardData('formIdIfAny','master-mode-of-payment-add-content');
	}else if(pageNo=='erp102'){
		callForDashboardData('formIdIfAny','master-mode-of-payment-content');
	}else if(pageNo=='erp103'){
		callForDashboardData('formIdIfAny','debit-credit-type-content');
	}else if(pageNo=='erp104'){
		callForDashboardData('formIdIfAny','debit-credit-type-add-content');
	}else if(pageNo=='erp105'){
		callForDashboardData('formIdIfAny','prospective-form-content');
	}else if(pageNo=='erp106'){
		callForDashboardData('formIdIfAny','prospective-form-content');
	}else if(pageNo=='erp201'){
		callForDashboardData('formIdIfAny','prospective-form-content');
	}else if(pageNo=='erp301'){
		callForDashboardData('formIdIfAny','prospective-form-content');
	}
}

function callSchoolInneractionNew(actionType, arg0,replaceDiv){
	if(actionType=='counttargets'){
		callForDashboardData('formIdIfAny','target-count-content?targetid='+arg0);	
	}
}