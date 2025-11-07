$(document).ready(function() {
	
});
function externalSearch(elementId, parms){
	callDashboardPageSupAdmin('3a','dashboardContentInHTML','?moduleId=student&controllType=list&searchInput=0&openMode=&extSearch=true&feeStatus=false&studentStatus=', parms);
}
function customLoaderDashBoard(index, needToShow){
	if(needToShow){
		$('#commonloaderDashboardId'+index).removeClass('hide');
		$('#commonloaderDashboardBody'+index).addClass('loader-new');
		$('#commonloaderDashboardId'+index).addClass('loader-bg-new');
		$('#commonloaderDashboardId'+index).show();
	}else{
		$('#commonloaderDashboardId'+index).addClass('hide');
		$('#commonloaderDashboardBody'+index).removeClass('loader-new');
		$('#commonloaderDashboardId'+index).removeClass('loader-bg-new');
		$('#commonloaderDashboardId'+index).hide();
	}
}
function dashboardSection7() {
	customLoaderDashBoard(7, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-7?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(7, false);
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
        			$('#dashboardSection7').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(7, false);
			showMessage(true, e.responseText);
		}
	});
}
function dashboardSection6() {
	customLoaderDashBoard(6, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-6?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(6, false);
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
        			$('#dashboardSection6').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(6, false);
			showMessage(true, e.responseText);
		}
	});
}
function dashboardSection1() {
	//customLoaderDashBoard(1, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-1?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(1, false);
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
        			$('#dashboardSection1').html(htmlContent);
        			
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(1, false);
			showMessage(true, e.responseText);
		}
	});
}

function dashboardSection2() {
	customLoaderDashBoard(2, true);
	var months = "";
	if($('#sessionMonthStudent').val()!='' || $('#sessionMonthStudent').val()!=undefined){
		months = $('#sessionMonthStudent').val();
	}
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-2?years='+$('#years').val()+'&months='+months),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(2, false);
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
        			$('#dashboardSection2').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(2, false);
			showMessage(true, e.responseText);
		}
	});
}

function dashboardSection3() {
	customLoaderDashBoard(3, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-3?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(3, false);
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
        			$('#dashboardSection3').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(3, false);
			showMessage(true, e.responseText);
		}
	});
}

function dashboardSection4() {
	customLoaderDashBoard(4, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-4?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(4, false);
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
        			$('#dashboardSection4').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(4, false);
			showMessage(true, e.responseText);
		}
	});
}

function dashboardSection5() {
	customLoaderDashBoard(5, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-5?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(5, false);
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
        			$('#dashboardSection5').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(5, false);
			showMessage(true, e.responseText);
		}
	});
}
function dashboardSection8() {
	customLoaderDashBoard(8, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-8?years='+$('#years').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(8, false);
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
        			$('#dashboardSection8').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(8, false);
			showMessage(true, e.responseText);
		}
	});
}

function dashboardSection9() {
	customLoaderDashBoard(9, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','super-admin-student-count-section-9?years='+$('#years').val()+'&month='+$('#sessionMonth').val()+'&formdate='+$('#formdate').val()),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(9, false);
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
        			$('#dashboardSection9').html(htmlContent);
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(9, false);
			showMessage(true, e.responseText);
		}
	});
}

function dashboardNotification() {
	//customLoaderDashBoard(1, true);
	$.ajax({
		global: false,
		type : "POST",
		url : getURLForHTML('dashboard','manage-notification-content'),
		data : '',
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			customLoaderDashBoard(1, false);
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
        			$('#notificationPopup').modal('show');
        			$('#notificationTbl').html(htmlContent);
        			$("#blinkingBell .fa-bell").removeClass("blinking");
        			$("#notifiRead").text('');
        			
        		}
    			return false;
			}
		},
		error : function(e) {
			customLoaderDashBoard(1, false);
			showMessage(true, e.responseText);
		}
	});
}


