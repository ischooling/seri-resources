function callForDashboardData(formId, actionUrl, replaceDiv, secondArgs) {
	hideMessage('');
	$.ajax({
		type : "POST",
		url : getURLForHTML('dashboard',actionUrl),
		data : "",
		dataType : 'html',
		cache : false,
		timeout : 600000,
		success : function(htmlContent) {
			if(htmlContent!=""){
            	var stringMessage = [];
            	stringMessage = htmlContent.split("|");
        		if(stringMessage[0] == "FAILED" || stringMessage[0] == "EXCEPTION" || stringMessage[0] == "SESSIONOUT"){
        			if(stringMessage[0] == "SESSIONOUT"){
        				redirectLoginPage();
        			}else {
        				showMessage(true, stringMessage[1]);
        			}
        		} else {
        			if(replaceDiv==undefined || replaceDiv==''){
        				$('#dashboardContentInHTML').html(htmlContent);
        			}else{
        				if(actionUrl!=undefined && actionUrl!=''){
        					//moduleId=counselor & controllType=add & counselorId=0
        					var urls = actionUrl.split('&');
        					var modules=urls[0].split('=');
        					var controls=urls[1].split('=');
        					if(modules[1]=='counselor'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#viewModal').modal('show');
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='inActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='consultant'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#viewModal').modal('show');
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='InActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        						
        					}else if(modules[1]=='school'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#viewModal').modal('show');
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='InActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, stringMessage[1]);
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='affschoollist'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='datevisit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='student'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
//        							$('#commonView').html(htmlContent);
//        							$('#viewModal').modal({backdrop: 'static', keyboard: false});
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='inActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='resetDelete'){
        							showMessage(true, 'Rollback Student Successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}
        						else if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        							console.log("SCHOOL_TYPE => "+SCHOOL_TYPE);
        							if(secondArgs!=undefined && secondArgs!=null && secondArgs!=''){
        								setTimeout(function(){
        									showStudentListingWithQueries('manageStudent', secondArgs, SCHOOL_TYPE);
        								}, 1000);
        							}
        							customLoader(false);
        							$('#warningMessageId').modal('hide');
        							$('#rollNoModal').modal('hide');
        							//$('.modal-backdrop').remove();
        						}
        						else if(controls[1]=='email'){
        							$('#'+replaceDiv).html(htmlContent);
        							$('#emailModal').modal('show');
        						}
        						else if(controls[1]=='addPayment'){
        							$('#'+replaceDiv).html(htmlContent);
        							/*$('#addPaymentModal').modal('show');*/
        						}
        						else if(controls[1]=="changeSession"){
        							$('#'+replaceDiv).html(htmlContent);
        							$('#sessionChangeModal').modal('show');
        						}
        					}else if(modules[1]=='subject'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='inActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}
        					}
        					else if(modules[1]=='accounts'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#viewModal').modal('show');
        						}else if(controls[1]=='list'){
        							//showMessage(true, 'Active successfull');
        							var entityArg = urls[2].split('=');
        							var entity = entityArg[1].split('-');
        							$("#entityId").val(entity[0]);
        							$("#entityName").val(entity[1]);
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}
        					else if(modules[1]=='user'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#viewModal').modal('show');
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='InActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='logs'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='sessionOut'){
        						if(controls[1]=='sessionOut'){
        							showMessage(true, 'Session out successfully');
        						}
        					}
        					else if(modules[1]=='studentPre'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#studentPreModal').modal('show');
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='InActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='meetingSlot'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#meetingSlotsModal').modal('show');
        						}else if(controls[1]=='delete'){
        							showMessage(true, 'Deleted successfully');
        							$('.bs-example-modal-lg').modal('hide');
        						}
        					}
        					else if(modules[1]=='totalAmount'){
        						if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        							$('#paymentListModal').modal('show');
        						}
        					}else if(modules[1]=='applicationFrom'){
        						if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='courier'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='edit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='view'){
        							$('#commonView').html(htmlContent);
        							$('#viewModal').modal('show');
        						}else if(controls[1]=='active'){
        							showMessage(true, 'Active successfull');
        						}else if(controls[1]=='InActive'){
        							showMessage(true, 'Inactive successfull');
        						}else if(controls[1]=='delete'){
        							showMessage(true, stringMessage[1]);
        							$('.bs-example-modal-lg').modal('hide');
        						}else if(controls[1]=='application'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='list'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='applicationEdit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='updateDockit'){
        							$('#'+replaceDiv).html(htmlContent);
        						}else if(controls[1]=='sendEmail'){
        							showMessage(true, stringMessage[1]);
        							$('.bs-example-modal-lg').modal('hide');
        						}
        					}else if(modules[1]=='studentPromotion'){
        						$('#'+replaceDiv).html(htmlContent);
        						
        					}
        					else if(modules[1]=='saveAffiliationForm'){
        						if(controls[1]=='view'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='affiliationForm'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}else if(modules[1]=='readinessForm'){
        						if(controls[1]=='add'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        						if(controls[1]=='view'){
        							$('#'+replaceDiv).html(htmlContent);
        						}
        					}
        				}
        				
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

function callDashboardMenu(pageNo){
	if(pageNo=='1'){
		callForDashboardData('formIdIfAny','profile-view-content?userId=');
	}else if(pageNo=='2'){
		//callForDashboardData('form','school-admin-content-content');
	}else if(pageNo=='3'){
		callForDashboardData('formIdIfAny','/common/logout');
	}else if(pageNo=='4'){
		//callForDashboardData('formIdIfAny','common/logout');
	}else if(pageNo=='5c'){
		//callForDashboardData('formIdIfAny','teacher-profile-request-content?ids=16&types=0,1');
	}else if(pageNo=='5d'){
		//callForDashboardData('formIdIfAny','teacher-profile-request-content?ids=15&types=0,1');
	}else if(pageNo=='5e'){
		//callForDashboardData('formIdIfAny','teacher-profile-request-content?ids=14,1&types=0,1');
	}else if(pageNo=='6a'){
		//callForDashboardData('formIdIfAny','teacher-profile-request-content?ids=1&types=0,1');
	}else if(pageNo=='6b'){
		//callForDashboardData('formIdIfAny','school-profile-request-content?ids=12&types=0,1');
	}else if(pageNo=='7b'){
		//callForDashboardData('formIdIfAny','student-attendance-request-content');
	}else if(pageNo=='3'){
		//callForDashboardData('formIdIfAny','student-teacher-mapping-content');
	}else if(pageNo=='13'){
		//callForDashboardData('formIdIfAny','inquiry-request-content');
	}else if(pageNo=='14'){
		callForDashboardData('formIdIfAny','changed-password-request');
	}else if(pageNo=='01compose'){
		callForDashboardData('formIdIfAny','email-compose-content?emailType=&emailId=0');
	}else if(pageNo=='01inbox'){
		callForDashboardData('formIdIfAny','email-inbox-content');
	}else if(pageNo=='01sent'){
		callForDashboardData('formIdIfAny','email-sent-content');
	}else if(pageNo=='01draft'){
		callForDashboardData('formIdIfAny','email-draft-content');
	}else if(pageNo=='01read'){
		callForDashboardData('formIdIfAny','email-inbox-read-content?readType=read');
	}else if(pageNo=='01unread'){
		callForDashboardData('formIdIfAny','email-inbox-read-content?readType=unread');
	}
}
function callCommonDashboardPage(pageNo){
	if(pageNo=='1'){
		callForDashboardData('formIdIfAny','edit-profile-content?userId=');
	}else if(pageNo=='2'){
		//callForDashboardData('form','school-admin-content-content');
	}	
}

function showWarningMessage(module, url, divId){
	var functionName = "$('#remarksModal').modal('hide');callSupAdminInneraction('"+module+"','"+url+"','"+divId+"')";
	$('#deleteErrorWarning').attr('onclick',functionName);
	$('#remarksModal').modal('show');
}
function showResetDelete(module, url, divId){
	var functionName = "$('#remarksresetDelete').modal('hide');callSupAdminInneraction('"+module+"','"+url+"','"+divId+"')";
	$('#resetDeleteErrorWarning').attr('onclick',functionName);  
	$('#remarksresetDelete').modal('show');
}

/*function getPaymentUrl(schoolId){
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : getURLForHTML('dashboard','get-payment-url'),
		data : {},
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				showMessage(true, data['message']);
			} else {
				//showMessage(false, data['message']);
				window.location.replace(data['responseData']['path']);
			}
			return false;
		},
		error : function(e) {
			showMessage(true, e.responseText);
			return false;
		}
	});
}*/




//headers: {
//    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJteWtzaHVrbGEiLCJpYXQiOjE1NTU0MDU2MzcsImV4cCI6MTU1NTQ5MjAzN30.uwI1iTx2VBw5Phg3n8BhogPhfkglbKygPCtzuOOSWh7Aao2cJ1yT-XUmm02QPE3uwLyo2nzGdjvjsX7TN30vmg"
//  },
//function callPaymentGateway(jsonData){
//	$.ajax({
//		async: true,
//		crossDomain: true,
//		url : "http://localhost:8125/service-payment/api/v1/create-payment",
//		method : "POST",
//		headers: {
//			"content-type": "application/json",
//			"authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJteWtzaHVrbGEiLCJpYXQiOjE1NTU0MDU2MzcsImV4cCI6MTU1NTQ5MjAzN30.uwI1iTx2VBw5Phg3n8BhogPhfkglbKygPCtzuOOSWh7Aao2cJ1yT-XUmm02QPE3uwLyo2nzGdjvjsX7TN30vmg",
//			"cache-control": "no-cache",
//		},
//		processData: false,
//		data : jsonData,
//		dataType : 'json',
//		success : function(data) {
//			if (data['status'] == '0' || data['status'] == '2') {
//				showMessage(true, data['message']);
//			} else {
//				showMessage(false, data['message']);
//				window.location.replace(data['path']);
//			}
//			return false;
//		},
//		error : function(e) {
//			showMessage(true, e.responseText);
//		}
//	});
//
//}
//function getRequestForCommonPayment(){
//	var paymentRequestDTO = {};
//	var shippingAddress = {};
//	var billingAddress = {};
//	paymentRequestDTO['vendorId'] = "SERI";
//	paymentRequestDTO['paymentMode'] = "UAT";
//	paymentRequestDTO['returnUrl'] = "http://localhost:8123/seritest/dashboard/school";
//	paymentRequestDTO['paymentGateway'] = "PAYTAB";
//	paymentRequestDTO['currencyISOCode'] = "USD";
//	paymentRequestDTO['amount'] = "500";
//	paymentRequestDTO['email'] = "dev@serindia.org";
//		shippingAddress['firstName'] = "mayank";
//		shippingAddress['lastName'] = "Shukla";
//		shippingAddress['address1'] = "test address1";
//		shippingAddress['address2'] = "test address2";
//		shippingAddress['city'] = "Delhi";
//		shippingAddress['state'] = "Delhi";
//		shippingAddress['country'] = "IND";
//		shippingAddress['postalCode'] = "110046";
//		shippingAddress['phoneCode'] = "91";
//		shippingAddress['phoneNumber'] = "9716484977";
//	paymentRequestDTO['shippingAddress'] = shippingAddress;
//	
//		billingAddress['firstName'] = "mayank";
//		billingAddress['lastName'] = "Shukla";
//		billingAddress['address1'] = "test address1";
//		billingAddress['address2'] = "test address2";
//		billingAddress['city'] = "Delhi";
//		billingAddress['state'] = "Delhi";
//		billingAddress['country'] = "IND";
//		billingAddress['postalCode'] = "110046";
//		billingAddress['phoneCode'] = "91";
//		billingAddress['phoneNumber'] = "9716484977";
//	paymentRequestDTO['billingAddress'] = billingAddress;
//	return JSON.stringify(paymentRequestDTO);
//}
