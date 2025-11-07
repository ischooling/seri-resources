var API_VERSION = CONTEXT_PATH+'api/v1/';
var GLOBAL_EMAIL = '';
var moduleId='STUDENT';
var needToCallPreviousSubject=false;
var STUDENT_UPLOADED_BY_SCHOOL=false;
var GLOBAL_SESSION_YEAR='0';
var PRESERVE_CURRENT_SUBJECTS='';
var PRESERVE_CURRENT_SUBJECTSDB='';
var PRESERVE_PREVIOUS_QUALIFICATION=[];
var PRESERVE_PREVIOUS_MARKS=[];
//var USER_PERMISSION={};
//var openMode='';
var STANDARD_ID='0';
var PRESERVE_PREVIOUS_MARKS_SUBJECT_IDS='';

var PRESERVE_CURRENT_SUBJECTS_NAME='';
var PRESERVE_PREVIOUS_MARKS_SUBJECT_NAME='';
var SESSION_MONTH='0';
var SESSION_YEAR='0';
var CHAL_HAT=0;
var CHAL_HAT_TIMEOUT='';
$( document ).ajaxStart(function() {
	customLoader(true);
});
//$( document ).ajaxSend(function() {
//	customLoader(true);
//});
//$( document ).ajaxSuccess(function() {
//	customLoader(false);
//});
//$( document ).ajaxError(function() {
//	customLoader(false);
//});
$( document ).ajaxComplete(function() {
//	customLoader(false);
	countdown();
});
$( document ).ajaxStop(function() {
	customLoader(false);
});
function customLoader(needToShow){
	if(needToShow){
		$('#commonloaderId').removeClass('hide');
		$('#commonloaderBody').addClass('loader');
		$('#commonloaderId').addClass('loader-bg');
		$('#commonloaderId').show();
	}else{
		$('#commonloaderId').addClass('hide');
		$('#commonloaderBody').removeClass('loader');
		$('#commonloaderId').removeClass('loader-bg');
		$('#commonloaderId').hide();
	}
}
function showMessage(isWarnig, message, id) {
	if (isWarnig) {
		$('#errorHeading').html('Error! Be focus on work');
		$('#statusMessage').addClass('danger-color');
		$('#statusMessage').removeClass('success-color');
	} else {
		$('#errorHeading').html('Information!');
		$('#statusMessage').removeClass('danger-color');
		$('#statusMessage').addClass('success-color');
	}
	$('#statusMessage').html(message);
	$('#modalMessage').modal("show");
	setTimeout(function(){
		$('#modalMessage').modal("hide");
	}, 6000);
}
function hideMessage(id) {
	$('#errorHeading').html('');
	$('#statusMessage').removeClass('success-color');
	$('#statusMessage').removeClass('danger-color');
	$('#statusMessage').html('');
	$('#modalMessage').modal("hide");
}
function getHash() {
	return 'ajslfkjalksdf'
}
function showHideDiv(isHide, divId) {
	if (isHide) {
		$('#' + divId).removeClass('show');
		$('#' + divId).addClass('hide');
	} else {
		$('#' + divId).removeClass('hide');
		$('#' + divId).addClass('show');
	}
}

function getURLFor(apiType, suffixUrl) {
	return  API_VERSION + apiType + '/' + suffixUrl;
}

function getURLForCommon(suffixUrl){
	return  API_VERSION + 'common' + '/' + suffixUrl;
}
function logout(){
	var url = CONTEXT_PATH+'common/login';
	goAheadGet(url,'');
}

function getURLForHTML(apiType, suffixUrl) {
	return  CONTEXT_PATH+apiType + '/' + suffixUrl;
}

//upload document function

function bindFileUpload(uploadIndex, uploadCategoryId, module, enrolmentNo){
	$('#'+uploadIndex).fileupload({
		formData: {uploadCategory: uploadCategoryId, module: module, enrolmentNo: enrolmentNo},
		url : CONTEXT_PATH+'api/upload',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /^image\/(png|jpe?g)$/i;
        	var acceptFileTypesPDF = /^application\/pdf$/i;
            var isError = false;
            if(data.originalFiles[0]['type'].length 
            		&& ( acceptFileTypes.test(data.originalFiles[0]['type']) 
            				|| acceptFileTypesPDF.test(data.originalFiles[0]['type']))  ) {
            }else{
            		isError = true;	
            }
//            else{
//	            	if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
//	            		isError = true;
//	            	}
//            }
            if(isError){
            		uploadErrors.push('Please upload files in following formats (jpg, jpeg, pdf or png).');
            }
            if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 1048576) {
                uploadErrors.push('Please upload maximum 1MB file in size.');
            }
            if(uploadErrors.length > 0) {
                showMessage(true, uploadErrors.join("\n"));
                return false;
            } 
        	data.process().done(function () {
                data.submit();
            });
		},
		start: function (e) {
			$('#'+uploadIndex).prev('span').prev('label').removeClass("upload-red");
			$('#'+uploadIndex).prev('span').prev('label').removeClass("green");
			$('#'+uploadIndex).prev('span').html('<i class="fa fa-refresh loading"></i>');
			$('#'+uploadIndex).attr('disabled',true);
		},
		send: function (e, data) {
		},
		done : function(e, data) {
			$('#'+uploadIndex).attr('disabled',false);
			if(data.result.status==0){
				$('#'+uploadIndex).prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
				$('#'+uploadIndex).prev('span').prev('label').addClass("upload-red");
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					if(file.status==1){
						var removeClassName ='';
						$('#'+uploadIndex).prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> '+file.fileName);
						$('#'+uploadIndex).prev('span').prev('label').addClass("green");
						$('#'+uploadIndex).prev('span').html('<i class="fa fa-times"></i>');
					}
				});
			}
		},
		progressall : function(e, data) {
			$('#fileupload'+uploadIndex+'ProgressStatus').addClass('progress-bar-success');
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
		},
		fail: function (e, data) {
			$('#'+uploadIndex).prev('span').prev('label').html('<i class="fa fa-cloud-upload"></i> Click here to upload');
			$('#'+uploadIndex).prev('span').prev('label').addClass("upload-red");
			$('#'+uploadIndex).prev('span').html('');
			$('#'+uploadIndex).attr('disabled',false);
			showMessage(true, 'Please upload maximum 1MB file in size');
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}

function bindFileUploadNew(uploadIndex, uploadCategoryId, module, enrolmentNo){
	console.log('dd');
	$('#'+uploadIndex).fileupload({
		formData: {uploadCategory: uploadCategoryId, module: module, enrolmentNo: enrolmentNo},
		url : CONTEXT_PATH+'api/upload',
		dataType : 'json',
		type: "POST",
		enctype: 'multipart/form-data',
		add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /^image\/(png|jpe?g)$/i;
        		var acceptFileTypesPDF = /^application\/pdf$/i;
            var isError = false;
            if(data.originalFiles[0]['type'].length 
            		&& ( acceptFileTypes.test(data.originalFiles[0]['type']) 
            				|| acceptFileTypesPDF.test(data.originalFiles[0]['type']))  ) {
            		
            }else{
            		isError = true;	
            }
//            else{
//	            
//	            	if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
//	            		isError = true;
//	            	}
//            }
            if(isError){
            		uploadErrors.push('Please upload files in following formats (jpg, jpeg, pdf or png).');
            }
            if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 1048576) {
                uploadErrors.push('Please upload maximum 1MB file in size.');
            }
            if(uploadErrors.length > 0) {
                showMessage(true, uploadErrors.join("\n"));
                return false;
            } 
        	data.process().done(function () {
                data.submit();
            });
		},
		start: function (e) {
			console.log('start');
			$("#"+uploadIndex).parents(".file-tab").find("span.fileName").text();
		},
		send: function (e, data) {
			console.log('send');
		},
		done : function(e, data) {
			console.log('done');
			if(data.result.status==0){
				//$("#"+uploadIndex).parents(".file-tab").find("span.fileName").text();
			}else{
				$.each(data.result.uploadFiles, function(index, file) {
					if(file.status==1){
						console.log('aya');
						console.log('file: '+file);
						$("#"+uploadIndex).parents(".file-tab").find("span.fileName").text(file.fileName);
						console.log($("#"+uploadIndex).parents(".file-tab").find("span.fileName").text(file.fileName));
						//console.log('type'+data.originalFiles[0]['type']);
						if(data.originalFiles[0]['type']=='application/pdf'){
							$("#"+uploadIndex).parents(".file-tab").find("img").attr('src', PATH_FOLDER_IMAGE+'pdf.jpg');
						}
						
					}
				});
			}
		},
		progressall : function(e, data) {
			console.log('progressall');
		},
		fail: function (e, data) {
			console.log('fail');
			$('#fileupload'+uploadIndex+'Progress .progress-bar').css('width', 100 + '%');
			$('#fileupload'+uploadIndex+'ProgressStatus').removeClass('progress-bar-success').addClass('progress-bar-danger');
			showMessage(true, 'Please upload maximum 1MB file in size');
		}
	}).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}

//disable back button
window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);           
        };
    }
    else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();                
            }
            else {
                ignoreHashChange = false;   
            }
        };
    }
};
function validateRequestForMaster(formId, elementId) {
	if($('#'+formId+ ' #'+elementId).val()=='' || $('#'+formId+ ' #'+elementId).val()<=0){
		return false;
	}
	return true;
}

function getRequestForMaster(formId, key, value, requestExtra) {
	var request = {};
	var authentication = {};
	var requestData = {};
	requestData['requestKey'] = key;
	requestData['requestValue'] = value;
	if(requestExtra!=undefined){
		requestData['requestExtra'] = requestExtra;
	}
	authentication['hash'] = getHash();
	authentication['userType'] = 'COMMON';
	request['authentication'] = authentication;
	request['requestData'] = requestData;
	return request;
}

function closeCurrentWindow(src) {
	var warningYes = "window.close();";
	var warningNo = "$('#warningMessageId').modal('hide');";
	$('#warningYes').attr('onclick',warningYes);
	$('#warningNo').attr('onclick',warningNo);
	$('#warnningMessageText').text('Are You sure want to cancel:');
	$('#warningMessageId').modal({backdrop: 'static', keyboard: false});
}


function onClickModel(modalId, enqId ){
	$(modalId).on("show.bs.modal", function(e) {
       
        callRemarkList(id);
    });
}


function refreshCaptcha(id){
	if(id!=undefined && id!=''){
		document.images[id].src=API_VERSION+'common/captcha.jpg?v='+new Date().getTime();
	}
}
function disabledCountdown(){
	if(CHAL_HAT_TIMEOUT!=''){
		clearTimeout(CHAL_HAT_TIMEOUT);
	}
}
function countdown() {
	if(CHAL_HAT==0){
		return false;
	}
	$('#timeoutMessage').html('Timeout in:');
	$('#minutesStatic').html('Minute(s)');
	$('#secondsStatic').html('Second(s)');
	let days, hours, minutes, seconds;
	var endDate = new Date();
	endDate.setMinutes(endDate.getMinutes()+parseInt(CHAL_HAT));
	endDate = new Date(endDate).getTime();
	if (isNaN(endDate)) {
		return;
	}
	disabledCountdown();
	CHAL_HAT_TIMEOUT = setInterval(calculate, 1000);
	function calculate() {
		let startDate = new Date();
		startDate = startDate.getTime();
		let timeRemaining = parseInt((endDate - startDate) / 1000);
		if (timeRemaining >= 0) {
			days = parseInt(timeRemaining / 86400);
			timeRemaining = (timeRemaining % 86400);
			hours = parseInt(timeRemaining / 3600);
			timeRemaining = (timeRemaining % 3600);
			minutes = parseInt(timeRemaining / 60);
			timeRemaining = (timeRemaining % 60);
			seconds = parseInt(timeRemaining);
//			$('#days').html(parseInt(days, 10));
//			$('#hours').html(("0" + hours).slice(-2));
			$('#minutes').html(("0" + minutes).slice(-2));
			$('#seconds').html(("0" + seconds).slice(-2));
		} else {
			sessionTimedOut();
			return;
		}
	}
}
function sessionTimedOut() {
	disabledCountdown();
	$('#timeoutMessage').html('Your session has been time out! Please login again.');
	$('#minutes').html('');
	$('#seconds').html('');
	$('#minutesStatic').html('');
	$('#secondsStatic').html('');
	redirectLoginPage();
}