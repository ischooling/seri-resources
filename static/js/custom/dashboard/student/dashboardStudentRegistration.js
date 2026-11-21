// ============================================================
// Student Registration Form - 5 Step Wizard JS (New Design)
// ============================================================

var regCurrentStep = 1;
var regSelectedSubjects = [];
var regMandatorySubjects = [];
var regOptionalSubjectsList = [];

// ---------- Step Navigation ----------
function regShowStep(n) {
	regCurrentStep = n;
	$('.sreg .step-panel').removeClass('show');
	$('.sreg .step-panel[data-panel="' + n + '"]').addClass('show');
	$('.sreg .step').each(function () {
		var sn = parseInt($(this).data('step'));
		$(this).toggleClass('active', sn === n);
		$(this).toggleClass('done', sn < n);
	});
	$('#regErrorBanner').removeClass('show');
	$('html, body').animate({ scrollTop: 0 }, 300);
	if (n === 4) regBuildReview();
	regUpdateProgress();
}

function regGoToStep(n) {
	regShowStep(n);
}

// ---------- Validation ----------
function regValidateStep(step) {
	$('#regErrorBanner').removeClass('show');
	if (step === 1) {
		var errors = [];
		if (!$.trim($('#regFirstName').val())) errors.push('First Name');
		if (!$.trim($('#regLastName').val())) errors.push('Last Name');
		var stdVal = $('#regStandardId').val();
		if (!stdVal || stdVal == '0') errors.push('Grade');
		if (!$('#regDob').val()) errors.push('Date of Birth');
		if (!$('#regGender').val()) errors.push('Gender');
		if (!$.trim($('#regMobile').val())) errors.push('Mobile Number');
		if (!$.trim($('#regStudentEmail').val())) errors.push('Email');
		var countryVal = $('#regCountry').val();
		if (!countryVal || countryVal == '0') errors.push('Country');
		var stateVal = $('#regState').val();
		if (!stateVal || stateVal == '0') errors.push('Province / State');
		if (!$.trim($('#regPincode').val())) errors.push('Zip Code');
		if (!$('#regIdType').val()) errors.push('ID Type');
		if (!$.trim($('#regIdNumber').val())) errors.push('ID Number');
		if (!$.trim($('#regAddress').val())) errors.push('Address');
		if (errors.length > 0) {
			$('#regErrorBanner').html('Please fill required fields: ' + errors.join(', ')).addClass('show');
			return false;
		}
	} else if (step === 2) {
		var parentStatus = $('#regParentStatus').val();
		if (parentStatus === 'both' || parentStatus === 'single-mother') {
			if (!$.trim($('#regMotherFirstName').val())) {
				$('#regErrorBanner').html("Please fill Mother's First Name").addClass('show');
				return false;
			}
		}
		if (parentStatus === 'both' || parentStatus === 'single-father') {
			if (!$.trim($('#regFatherFirstName').val())) {
				$('#regErrorBanner').html("Please fill Father's First Name").addClass('show');
				return false;
			}
		}
		if (parentStatus === 'guardian') {
			if (!$.trim($('#regMotherFirstName').val())) {
				$('#regErrorBanner').html("Please fill Guardian's Name").addClass('show');
				return false;
			}
		}
	} else if (step === 4) {
		if (!$('#regConsent').is(':checked')) {
			$('#regErrorBanner').html('Please accept the declaration').addClass('show');
			return false;
		}
	}
	return true;
}

// ---------- Progress Bar ----------
function regUpdateProgress() {
	var fields = ['#regFirstName', '#regLastName', '#regDob', '#regMobile',
		'#regStudentEmail', '#regPincode', '#regIdNumber', '#regAddress',
		'#regMotherFirstName', '#regFatherFirstName'];
	var selects = ['#regStandardId', '#regGender', '#regCountry', '#regState', '#regCity', '#regIdType'];
	var filled = 0;
	var total = fields.length + selects.length;

	fields.forEach(function (f) {
		if ($.trim($(f).val())) filled++;
	});
	selects.forEach(function (s) {
		var v = $(s).val();
		if (v && v !== '0' && v !== '') filled++;
	});
	if (regSelectedSubjects.length > 0) { filled++; }
	total++;
	if ($('#regConsent').is(':checked')) { filled++; }
	total++;

	var pct = total > 0 ? Math.round((filled / total) * 100) : 0;
	$('#regProgressFill').css('width', pct + '%');
	$('#regProgressText').text(pct + '% Complete');
}

// ---------- Parent Status & Choice Cards ----------
function regUpdateParentBlocks() {
	var status = $('#regParentStatus').val();
	$('#regMotherBlock').show();
	$('#regFatherBlock').show();
	$('#regParentChoice').show();
	$('#regParentChoiceLabel').show();

	$('#regMotherBlock .parent-block-title').html("Mother's Details <span class='marker required' data-marker>Mandatory</span>");
	$('#regMotherFirstLabel').text("Mother's First Name");
	$('#regMotherLastLabel').text("Mother's Last Name");

	if (status === 'single-mother') {
		$('#regFatherBlock').hide();
		$('#regParentChoice').hide();
		$('#regParentChoiceLabel').hide();
	} else if (status === 'single-father') {
		$('#regMotherBlock').hide();
		$('#regParentChoice').hide();
		$('#regParentChoiceLabel').hide();
	} else if (status === 'guardian') {
		$('#regFatherBlock').hide();
		$('#regParentChoice').hide();
		$('#regParentChoiceLabel').hide();
		$('#regMotherBlock .parent-block-title').html("Guardian's Details <span class='marker required' data-marker>Mandatory</span>");
		$('#regMotherFirstLabel').text("Guardian's First Name");
		$('#regMotherLastLabel').text("Guardian's Last Name");
	}
}

// ---------- Dynamic Dropdowns ----------
function regGetStateList() {
	var countryId = $('#regCountry').val();
	if (!countryId || countryId == '0') return;
	$('#regState').html('<option value="0">Loading...</option>');
	$('#regCity').html('<option value="0">Select City</option>');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster('registrationForm', 'STATES-LIST', countryId)),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function (data) {
			if (data['status'] == '1') {
				var html = '<option value="0" disabled>Select State</option>';
				var list = data['mastersData']['data'];
				if (list && list.length) {
					list.forEach(function (s) {
						html += '<option value="' + s.key + '">' + s.value + '</option>';
					});
				}
				$('#regState').html(html);
				regSyncFilledClass($('#regState')[0]);
				// Auto-load cities for the auto-selected state
				var autoState = $('#regState').val();
				if (autoState && autoState !== '0') regGetCityList();
			}
		}
	});
}

function regGetCityList() {
	var stateId = $('#regState').val();
	if (!stateId || stateId == '0') return;
	$('#regCity').html('<option value="0">Loading...</option>');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster('registrationForm', 'CITIES-LIST', stateId)),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function (data) {
			if (data['status'] == '1') {
				var html = '<option value="0" disabled>Select City</option>';
				var list = data['mastersData']['data'];
				if (list && list.length) {
					list.forEach(function (c) {
						html += '<option value="' + c.key + '">' + c.value + '</option>';
					});
				}
				$('#regCity').html(html);
				regSyncFilledClass($('#regCity')[0]);
			}
		}
	});
}

function regGetBatchList() {
	var sessionVal = $('#regSession option:selected').attr('sessionValue');
	if (!sessionVal) return;
	$.ajax({
		type: 'POST',
		url: getURLForHTML('dashboard', 'get-batches-by-session'),
		data: { sessionId: sessionVal },
		success: function (data) {
			var html = '<option value="0" disabled>Select Batch</option>';
			if (data && data.length) {
				data.forEach(function (b) {
					html += '<option value="' + b.key + '">' + b.value + '</option>';
				});
			}
			$('#regBatchId').html(html);
			regSyncFilledClass($('#regBatchId')[0]);
		}
	});
}

function regGetSubjectList() {
	var standardId = $('#regStandardId').val();
	if (!standardId || standardId == '0') return;
	var sessionStartDate = $('#regSessionStartDate').val();
	$.ajax({
		type: 'POST',
		url: getURLForHTML('dashboard', 'get-subjects-by-standard'),
		data: { standardId: standardId, sessionStartDate: sessionStartDate },
		dataType: 'json',
		success: function (data) {
			if (data) {
				regMandatorySubjects = data.mandatorySubjects || [];
				regOptionalSubjectsList = data.optionalSubjects || [];

				var mandHtml = '';
				regMandatorySubjects.forEach(function (s) {
					mandHtml += '<tr class="mandatory-row"><td>' + s.value + ' (Compulsory)</td><td>&#10003;</td></tr>';
				});
				$('#regMandatorySubjectsBody').html(mandHtml || '<tr><td colspan="2" style="color:var(--muted);">No mandatory subjects</td></tr>');

				var optHtml = '';
				regOptionalSubjectsList.forEach(function (s) {
					var sel = regSelectedSubjects.indexOf(String(s.key)) > -1;
					optHtml += '<tr data-subject-id="' + s.key + '" data-subject-name="' + s.value + '"' + (sel ? ' class="selected"' : '') + '>';
					optHtml += '<td>' + s.value + '</td>';
					optHtml += '<td class="status-cell' + (sel ? ' checked' : '') + '"></td></tr>';
				});
				$('#regOptionalSubjectsBody').html(optHtml || '<tr><td colspan="2" style="color:var(--muted);">No optional subjects</td></tr>');

				regBindOptionalSubjectClicks();
			}
		}
	});
}

function regBindOptionalSubjectClicks() {
	$('#regOptionalSubjectsBody tr[data-subject-id]').off('click').on('click', function () {
		var $row = $(this);
		var subjectId = String($row.data('subject-id'));
		var $cell = $row.find('.status-cell');

		if ($row.hasClass('selected')) {
			$row.removeClass('selected');
			$cell.removeClass('checked');
			regSelectedSubjects = regSelectedSubjects.filter(function (s) { return s !== subjectId; });
		} else {
			if (regSelectedSubjects.length >= 5) return;
			$row.addClass('selected');
			$cell.addClass('checked');
			regSelectedSubjects.push(subjectId);
		}
	});
}

// ---------- Subject Modal ----------
function regOpenSubjectModal() {
	var standardId = $('#regStandardId').val();
	if (!standardId || standardId == '0') {
		$('#regErrorBanner').html('Please select a Grade first').addClass('show');
		return;
	}
	regGetSubjectList();
	$('#regSubjectModal').removeAttr('hidden');
}

function regSaveSubjects() {
	var totalCount = regMandatorySubjects.length + regSelectedSubjects.length;
	if (totalCount < 5) {
		$('#regSubjectMinMsg').removeAttr('hidden');
		return;
	}
	$('#regSubjectMinMsg').attr('hidden', '');
	$('#regTotalSelected').text(totalCount);

	var listHtml = '<strong>Selected:</strong> ';
	regMandatorySubjects.forEach(function (s) {
		listHtml += '<span style="display:inline-block; background:#dff3df; color:#1f9d6e; padding:3px 10px; border-radius:6px; font-size:12px; font-weight:600; margin:2px;">' + s.value + '</span>';
	});
	$('#regOptionalSubjectsBody tr.selected').each(function () {
		listHtml += '<span style="display:inline-block; background:#e8ebf7; color:#15215c; padding:3px 10px; border-radius:6px; font-size:12px; font-weight:600; margin:2px;">' + $(this).data('subject-name') + '</span>';
	});
	$('#regSelectedSubjectsList').html(listHtml);

	$('#regSubjectModal').attr('hidden', '');
	regBuildQualMarksRows();
	regUpdateProgress();
}

// ---------- Qualification Modal ----------
function regOpenQualificationModal() {
	$('#regQualModal').removeAttr('hidden');
}

function regGradeFor(pct) {
	if (pct >= 90) return 'A1';
	if (pct >= 80) return 'A2';
	if (pct >= 70) return 'B1';
	if (pct >= 60) return 'B2';
	if (pct >= 50) return 'C1';
	if (pct >= 40) return 'C2';
	if (pct >= 33) return 'D';
	return 'F';
}

function regRecomputeQualRow(tr) {
	var $tr = $(tr);
	var max = parseFloat($tr.find('.q-max').val()) || 0;
	var practical = parseFloat($tr.find('.q-practical').val()) || 0;
	var theory = parseFloat($tr.find('.q-theory').val()) || 0;
	var count = practical + theory;
	var pct = max ? (count / max) * 100 : 0;
	$tr.find('.q-count').text(count);
	$tr.find('.q-grade').text(regGradeFor(pct));
	$tr.find('.q-result').text(pct >= 33 ? 'Pass' : 'Fail');
	regRecomputeQualTotals();
}

function regRecomputeQualTotals() {
	var totalMax = 0, totalMarks = 0, anyFail = false;
	$('#regQualMarksBody tr').each(function () {
		totalMax += parseFloat($(this).find('.q-max').val()) || 0;
		totalMarks += parseFloat($(this).find('.q-count').text()) || 0;
		if ($(this).find('.q-result').text() === 'Fail') anyFail = true;
	});
	var pct = totalMax ? (totalMarks / totalMax) * 100 : 0;
	$('#regQualTotalMax').text(totalMax);
	$('#regQualTotalMarks').text(totalMarks);
	$('#regQualTotalPercent').text(pct.toFixed(2));
	$('#regQualOverallResult').text(!anyFail ? 'Pass' : (pct >= 33 ? 'Compartment' : 'Fail'));
}

function regBuildQualMarksRows() {
	var subjectNames = ['ENGLISH'];
	$('#regOptionalSubjectsBody tr.selected').each(function () {
		subjectNames.push($(this).data('subject-name'));
	});
	var fixedCount = 6;
	while (subjectNames.length < fixedCount) subjectNames.push(null);

	var html = '';
	subjectNames.forEach(function (name, i) {
		var subjectCell = (i === 0) ? 'ENGLISH' : '<input type="text" class="q-subject" value="' + (name || '') + '" placeholder="Select Subject">';
		html += '<tr>' +
			'<td>' + (i + 1) + '</td>' +
			'<td>' + subjectCell + '</td>' +
			'<td><input type="number" class="q-max" value="100" min="0"></td>' +
			'<td><input type="number" class="q-practical" value="0" min="0"></td>' +
			'<td><input type="number" class="q-theory" value="0" min="0"></td>' +
			'<td class="q-count">0</td>' +
			'<td class="q-grade">F</td>' +
			'<td class="q-result">Fail</td></tr>';
	});
	$('#regQualMarksBody').html(html);

	$('#regQualMarksBody').find('.q-max, .q-practical, .q-theory').on('input', function () {
		regRecomputeQualRow($(this).closest('tr'));
	});
	regRecomputeQualTotals();
}

// ---------- Review ----------
function regBuildReview() {
	function rv(label, value) {
		var filled = value && String(value).trim();
		return '<div class="review-row"><p class="rv-label">' + label + '</p><p class="rv-value' + (filled ? '' : ' empty') + '">' + (filled ? value : 'Not provided') + '</p></div>';
	}

	var studentHtml = '';
	studentHtml += rv('Application Number', $('#regEnrollmentNo').val());
	studentHtml += rv('Session', $('#regSession option:selected').text());
	studentHtml += rv('Batch', $('#regBatchId option:selected').text());
	studentHtml += rv('Grade', $('#regStandardId option:selected').text());
	studentHtml += rv('First Name', $('#regFirstName').val());
	studentHtml += rv('Middle Name', $('#regMiddleName').val());
	studentHtml += rv('Last Name', $('#regLastName').val());
	studentHtml += rv('Date of Birth', $('#regDob').val());
	studentHtml += rv('Gender', $('#regGender option:selected').text());
	studentHtml += rv('Category', $('#regCategory option:selected').text());
	studentHtml += rv('Nationality', $('#regNationality option:selected').text());
	studentHtml += rv('Is NRI Student', $('#regIsNri option:selected').text());
	studentHtml += rv('Mobile Number', $('#regIsdCode').val() + ' ' + $('#regMobile').val());
	studentHtml += rv('Email', $('#regStudentEmail').val());
	studentHtml += rv('Country', $('#regCountry option:selected').text());
	studentHtml += rv('State', $('#regState option:selected').text());
	studentHtml += rv('City', $('#regCity option:selected').text());
	studentHtml += rv('Zip Code', $('#regPincode').val());
	studentHtml += rv('ID Type', $('#regIdType option:selected').text());
	studentHtml += rv('ID Number', $('#regIdNumber').val());
	studentHtml += rv('Address', $('#regAddress').val());
	$('#regReviewStudent').html(studentHtml);

	var parentStatus = $('#regParentStatus option:selected').text();
	var parentHtml = rv('Parent Status', parentStatus);
	if ($('#regMotherBlock').is(':visible')) {
		var mName = $.trim($('#regMotherFirstName').val() + ' ' + $('#regMotherMiddleName').val() + ' ' + $('#regMotherLastName').val()).replace(/\s+/g, ' ');
		parentHtml += rv("Mother's / Guardian's Name", mName);
		parentHtml += rv("Mother's / Guardian's Mobile", $('#regMotherMobile').val());
		parentHtml += rv("Mother's / Guardian's Email", $('#regMotherEmail').val());
		parentHtml += rv("Mother's / Guardian's ID Type", $('#regMotherIdType option:selected').text());
		parentHtml += rv("Mother's / Guardian's ID Number", $('#regMotherIdNumber').val());
	}
	if ($('#regFatherBlock').is(':visible')) {
		var fName = $.trim($('#regFatherFirstName').val() + ' ' + $('#regFatherMiddleName').val() + ' ' + $('#regFatherLastName').val()).replace(/\s+/g, ' ');
		parentHtml += rv("Father's Name", fName);
		parentHtml += rv("Father's Mobile", $('#regFatherMobile').val());
		parentHtml += rv("Father's Email", $('#regFatherEmail').val());
		parentHtml += rv("Father's ID Type", $('#regFatherIdType option:selected').text());
		parentHtml += rv("Father's ID Number", $('#regFatherIdNumber').val());
	}
	parentHtml += rv('Parent Income', $('#regParentIncome option:selected').text());
	$('#regReviewParent').html(parentHtml);

	var courseHtml = '';
	courseHtml += rv('Grade', $('#regStandardId option:selected').text());
	courseHtml += rv('Subjects Selected', $('#regTotalSelected').text());
	$('#regReviewCourse').html(courseHtml);
}

// ---------- Submit ----------
function regSubmitForm() {
	// The registration JSP owns the retry flow. Do not submit the student a
	// second time when the loaded record is a failed payment.
	if ($('#regSubmitBtn').data('retryPayment')) return;
	if (!regValidateStep(regCurrentStep)) return;
	$('#regErrorBanner').removeClass('show');

	var fullName = $.trim($('#regFirstName').val() + ' ' + $('#regMiddleName').val() + ' ' + $('#regLastName').val()).replace(/\s+/g, ' ');
	var motherFullName = $.trim($('#regMotherFirstName').val() + ' ' + $('#regMotherMiddleName').val() + ' ' + $('#regMotherLastName').val()).replace(/\s+/g, ' ');
	var fatherFullName = $.trim($('#regFatherFirstName').val() + ' ' + $('#regFatherMiddleName').val() + ' ' + $('#regFatherLastName').val()).replace(/\s+/g, ' ');

	var parentDetails = [];
	if ($('#regMotherBlock').is(':visible')) {
		parentDetails.push({
			parentType: 'mother',
			firstName: $('#regMotherFirstName').val(),
			middleName: $('#regMotherMiddleName').val(),
			lastName: $('#regMotherLastName').val(),
			mobile: $('#regMotherMobile').val(),
			email: $('#regMotherEmail').val(),
			idType: $('#regMotherIdType').val(),
			idNumber: $('#regMotherIdNumber').val(),
			address: $('#regMotherAddress').val(),
			isMandatory: 1
		});
	}
	if ($('#regFatherBlock').is(':visible')) {
		parentDetails.push({
			parentType: 'father',
			firstName: $('#regFatherFirstName').val(),
			middleName: $('#regFatherMiddleName').val(),
			lastName: $('#regFatherLastName').val(),
			mobile: $('#regFatherMobile').val(),
			email: $('#regFatherEmail').val(),
			idType: $('#regFatherIdType').val(),
			idNumber: $('#regFatherIdNumber').val(),
			address: $('#regFatherAddress').val(),
			isMandatory: 1
		});
	}

	var sessionId = parseInt($('#regSession').val()) || 0;
	var addStudentDTO = {
		actionType        : 'add',
		oldApplication    : false,
		studentId         : 0,
		studentPreId      : parseInt($('#regStudentPreId').val()) || 0,
		enrollmentNo      : $('#regEnrollmentNo').val(),
		studentName       : fullName,
		studentFirstName  : $('#regFirstName').val(),
		studentMiddleName : $('#regMiddleName').val(),
		studentLastName   : $('#regLastName').val(),
		gender            : {'M':'Male','F':'Female','T':'Transgender'}[$('#regGender').val()] || $('#regGender').val(),
		category          : $('#regCategory').val(),
		dob               : $('#regDob').val(),
		nationalityId     : parseInt($('#regNationality').val()) || 0,
		isNriApplicant    : parseInt($('#regIsNri').val()) || 0,
		isdCode           : $('#regIsdCode').val(),
		contactNumber     : $('#regMobile').val(),
		studentNumber     : $('#regMobile').val(),
		studentEmail      : $('#regStudentEmail').val(),
		countryId         : parseInt($('#regCountry').val()) || 0,
		stateId           : parseInt($('#regState').val()) || 0,
		cityId            : parseInt($('#regCity').val()) || 0,
		pincode           : $('#regPincode').val(),
		studentIdType     : $('#regIdType').val(),
		studentIdNumber   : $('#regIdNumber').val(),
		address           : $('#regAddress').val(),
		motherName        : motherFullName || 'N/A',
		fathername        : fatherFullName || 'N/A',
		parentEmail       : $('#regMotherEmail').val() || $('#regFatherEmail').val(),
		parentIncome      : $('#regParentIncome').val(),
		parentStatus      : $('#regParentStatus').val(),
		parentDetails     : parentDetails,
		sessionValue      : sessionId,
		sessionMonth      : parseInt($('#regSessionMonth').val()) || 0,
		sessionYear       : parseInt($('#regSessionYear').val()) || 0,
		batchId           : parseInt($('#regBatchId').val()) || 0,
		standardId        : parseInt($('#regStandardId').val()) || 0,
		subjectId         : regSelectedSubjects.join(','),
		school            : $('#regSchool').val() || '0',
		recommendedBy     : parseInt($('#regConsultant').val()) || 0,
		paymentMode       : $('#regPaymentMode').val() || 'DD',
		courseType        : 1,
		attendanceStatus  : 1,
		isFreeSubjectSelect: 0,
		prevQualificationData: JSON.stringify({ studentPrevGenerateMarksDTO: [] }),
		formStatus        : 'pending'
	};

	var requestBody = {
		authentication: { hash: 'SERI' },
		requestData: {
			addStudentDTO: addStudentDTO
		}
	};

	$('#regSubmitBtn').prop('disabled', true).text('Submitting...');

	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForHTML('dashboard', 'student-submit-content'),
		data: JSON.stringify(requestBody),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function (data) {
			if (data['status'] == '1') {
				$('#regErrorBanner').removeClass('show');
				var studentPreId = $('#regStudentPreId').val() || '0';
				var studentId    = (data.responseData && data.responseData.studentId) ? data.responseData.studentId : 0;
				var gradeId      = $('#regStandardId').val() || 0;
				$('#regSubmitBtn').prop('disabled', true).text('Initiating Payment...');
				// Create USER_PAYMENT_DETAILS record and get paymentRecordId
				$.ajax({
					type: 'POST',
					url: getURLForHTML('dashboard', 'initiate-student-payment'),
					data: { studentPreId: studentPreId, studentId: studentId, gradeId: gradeId, isNri: 0 },
					dataType: 'json',
					cache: false,
					timeout: 30000,
					success: function (payData) {
						if (payData['status'] == '1') {
							var paymentRecordId = payData['paymentRecordId'] || studentPreId;
							openRazorpayCheckout(paymentRecordId);
						} else {
							$('#regSubmitBtn').prop('disabled', false).text('Pay & Submit');
							$('#regErrorBanner').html(payData['message'] || 'Could not initiate payment. Please try again.').addClass('show');
						}
					},
					error: function () {
						$('#regSubmitBtn').prop('disabled', false).text('Pay & Submit');
						$('#regErrorBanner').html('Network error. Please try again.').addClass('show');
					}
				});
			} else {
				$('#regSubmitBtn').prop('disabled', false).text('Pay & Submit');
				$('#regErrorBanner').html(data['message'] || 'Something went wrong. Please try again.').addClass('show');
			}
		},
		error: function () {
			$('#regSubmitBtn').prop('disabled', false).text('Pay & Submit');
			$('#regErrorBanner').html('Network error. Please try again.').addClass('show');
		}
	});
}

// ---------- Floating label helper ----------
function regSyncFilledClass(el) {
	if (!el) return;
	if (el.tagName === 'SELECT') {
		$(el).toggleClass('filled', !!el.value && el.value !== '0');
	}
}

// ---------- ID Type label sync ----------
function regWireIdTypeLabel(selectId, uploadLabelId, numberLabelId) {
	$('#' + selectId).on('change', function () {
		var val = $(this).val() || 'ID Document';
		if (uploadLabelId) $('#' + uploadLabelId).text('Upload ' + val);
		if (numberLabelId) {
			var $lbl = $('#' + numberLabelId);
			var hasReq = $lbl.find('.req').length;
			$lbl.text(val + ' Number ');
			if (hasReq) $lbl.append('<span class="req">*</span>');
		}
	});
}

// ---------- File upload box interaction ----------
function regWireUploadBox(inputId) {
	$('#' + inputId).on('change', function () {
		var file = this.files && this.files[0];
		var $box = $('label[for="' + inputId + '"]');
		var $span = $box.find('span').first();
		if (file) {
			$span.text(file.name);
			$box.addClass('has-file');
		} else {
			$span.text('Click Here to upload your file');
			$box.removeClass('has-file');
		}
	});
}

// ---------- Init ----------
function regInitRegistrationForm() {
	// dashboardCommon calls this function after AJAX content is inserted.  The
	// current screen has its own isolated workflow, so never bind legacy events
	// to it (otherwise both workflows submit the same Next click).
	if ($('.sreg[data-registration-workflow="current"]').length) {
		return;
	}
	regUpdateProgress();
	regUpdateParentBlocks();
	regBuildQualMarksRows();

	// Floating label: sync "filled" class on all selects
	$('.sreg .field-fl select').each(function () {
		regSyncFilledClass(this);
	}).on('change', function () {
		regSyncFilledClass(this);
	});

	// Date field filled class
	$('.sreg .field-fl input[type="date"]').each(function () {
		if (this.value) $(this).addClass('filled');
	}).on('input change', function () {
		$(this).toggleClass('filled', !!this.value);
	});

	// Next/Prev buttons using data attributes
	$('.sreg [data-next]').on('click', function () {
		var nextStep = parseInt($(this).data('next'));
		if (!regValidateStep(regCurrentStep)) return;
		var $btn = $(this);
		$btn.prop('disabled', true).text('Saving...');
		regDraftSaveStep(regCurrentStep, function(saveOk) {
			$btn.prop('disabled', false).text($btn.data('label') || 'Next');
			if (saveOk) regShowStep(nextStep);
		});
	});
	$('.sreg [data-prev]').on('click', function () {
		regShowStep(parseInt($(this).data('prev')));
	});

	// Stepper click
	$('.sreg .step').on('click', function () {
		var target = parseInt($(this).data('step'));
		if (target <= regCurrentStep || $(this).hasClass('done')) regShowStep(target);
	});

	// Edit buttons on review
	$('.sreg [data-edit-step]').on('click', function () {
		regShowStep(parseInt($(this).data('edit-step')));
	});

	// Review toggle — simple open/close per card
	$('.sreg [data-toggle-review]').on('click', function () {
		var $card = $(this).closest('.review-card');
		var $btn = $(this);
		if ($card.hasClass('collapsed')) {
			$card.removeClass('collapsed');
			$btn.html('Collapse <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 15l-6-6-6 6"/></svg>');
		} else {
			$card.addClass('collapsed');
			$btn.html('Expand <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>');
		}
	});

	// Parent status change
	$('#regParentStatus').on('change', regUpdateParentBlocks);

	// Parent choice cards
	$('.sreg .parent-choice-card').on('click', function () {
		$('.sreg .parent-choice-card').removeClass('active');
		$(this).addClass('active');
		var which = $(this).data('parent');
		if (which === 'father') {
			$('#regParentBlocks').prepend($('#regFatherBlock'));
		} else {
			$('#regParentBlocks').prepend($('#regMotherBlock'));
		}
	});

	// Payment method cards
	$('.sreg .pay-method-card').on('click', function () {
		$('.sreg .pay-method-card').removeClass('active');
		$(this).addClass('active');
		$('#regPaymentMode').val($(this).data('method'));
	});

	// Dynamic dropdowns
	$('#regSession').on('change', regGetBatchList);
	$('#regCountry').on('change', regGetStateList);
	$('#regState').on('change', regGetCityList);
	$('#regStandardId').on('change', regGetSubjectList);

	// Subject modal
	$('#regBtnCurrentSubject').on('click', regOpenSubjectModal);
	$('#regSaveSubjects').on('click', regSaveSubjects);

	// Qualification modal
	$('#regBtnPrevQualification').on('click', regOpenQualificationModal);
	$('#regSaveQual').on('click', function () {
		$('#regQualModal').attr('hidden', '');
	});

	// Modal close buttons
	$('.sreg [data-close]').on('click', function () {
		$('#' + $(this).data('close')).attr('hidden', '');
	});
	$('.sreg .modal-overlay').on('click', function (e) {
		if (e.target === this) $(this).attr('hidden', '');
	});

	// Submit
	$('#regSubmitBtn').on('click', regSubmitForm);

	// ID type label sync
	regWireIdTypeLabel('regIdType', 'regIdUploadLabel', 'regIdNumberLabel');
	regWireIdTypeLabel('regMotherIdType', 'regMotherIdUploadLabel', 'regMotherIdNumberLabel');
	regWireIdTypeLabel('regFatherIdType', 'regFatherIdUploadLabel', 'regFatherIdNumberLabel');

	// File upload boxes
	regWireUploadBox('regIdUpload');
	regWireUploadBox('regMotherIdUpload');
	regWireUploadBox('regFatherIdUpload');
	regWireUploadBox('regMarksheet10Upload');
	regWireUploadBox('regMarksheet11Upload');
	regWireUploadBox('regDocG10Other');
	regWireUploadBox('regDocG11Other');

	// Auto-load states if country pre-selected
	var countryId = $('#regCountry').val();
	if (countryId && countryId != '0') {
		regGetStateList();
	}

	// Live progress update
	$('#registrationForm').on('input change', function () {
		regUpdateProgress();
	});

	regDraftRestore();
}

// ---------- Draft save per step (server + localStorage) ----------
function regDraftSaveStep(step, callback) {
	// Always save to localStorage first
	var draftData = {};
	$('#registrationForm').find('input, select, textarea').each(function () {
		if (!this.id || this.type === 'file' || this.type === 'hidden') return;
		draftData[this.id] = this.type === 'checkbox' ? this.checked : $(this).val();
	});
	draftData._currentStep = step;
	draftData._selectedSubjects = regSelectedSubjects;
	try { localStorage.setItem('sregDraft_v1', JSON.stringify(draftData)); } catch (e) { }

	var firstName  = $.trim($('#regFirstName').val());
	var lastName   = $.trim($('#regLastName').val());
	var middleName = $.trim($('#regMiddleName').val());
	var fullName   = [firstName, middleName, lastName].filter(Boolean).join(' ');

	var addStudentDTO = {
		studentPreId   : parseInt($('#regStudentPreId').val()) || 0,
		enrollmentNo   : $('#regEnrollmentNo').val(),
		studentFirstName  : firstName,
		studentMiddleName : middleName,
		studentLastName   : lastName,
		studentName    : fullName,
		gender         : $('#regGender').val(),
		category       : $('#regCategory').val(),
		dob            : $('#regDob').val(),
		nationalityId  : parseInt($('#regNationality').val()) || 0,
		isNriApplicant : parseInt($('#regIsNri').val()) || 0,
		isdCode        : $('#regIsdCode').val(),
		studentNumber  : $('#regMobile').val(),
		studentEmail   : $('#regStudentEmail').val(),
		countryId      : parseInt($('#regCountry').val()) || 0,
		stateId        : parseInt($('#regState').val()) || 0,
		cityId         : parseInt($('#regCity').val()) || 0,
		pincode        : $('#regPincode').val(),
		address        : $('#regAddress').val(),
		studentIdType  : $('#regIdType').val(),
		studentIdNumber: $('#regIdNumber').val(),
		motherName     : [$.trim($('#regMotherFirstName').val()), $.trim($('#regMotherLastName').val())].filter(Boolean).join(' '),
		fathername     : [$.trim($('#regFatherFirstName').val()), $.trim($('#regFatherLastName').val())].filter(Boolean).join(' '),
		parentStatus   : $('#regParentStatus').val(),
		parentEmail    : $('#regMotherEmail').val() || $('#regFatherEmail').val(),
		parentIncome   : $('#regParentIncome').val(),
		standardId     : parseInt($('#regStandardId').val()) || 0,
		batchId        : parseInt($('#regBatchId').val()) || 0,
		subjectId      : regSelectedSubjects.join(','),
		school         : $('#regSchool').val() || '0',
		recommendedBy  : parseInt($('#regConsultant').val()) || 0,
		sessionValue   : parseInt($('#regSession option:selected').attr('sessionValue')) || 0,
		draftStep      : step
	};

	$.ajax({
		type        : 'POST',
		contentType : 'application/json',
		url         : getURLForHTML('dashboard', 'student-draft-save'),
		data        : JSON.stringify({ authentication:{}, addStudentDTO: addStudentDTO }),
		dataType    : 'json',
		cache       : false,
		timeout     : 30000,
		success: function(data) {
			if (data && data['status'] === '1') {
				if (data['studentPreId']) $('#regStudentPreId').val(data['studentPreId']);
				$('#regErrorBanner').removeClass('show');
				if (typeof callback === 'function') callback(true);
			} else {
				var msg = data && data['message'] ? data['message'] : 'Please fill all required fields';
				$('#regErrorBanner').html(msg).addClass('show');
				if (typeof callback === 'function') callback(false);
			}
		},
		error: function() {
			// Network error — allow the user to proceed
			if (typeof callback === 'function') callback(true);
		}
	});
}

// ---------- Draft restore from localStorage ----------
function regDraftRestore() {
	try {
		var raw = localStorage.getItem('sregDraft_v1');
		if (!raw) return;
		var d = JSON.parse(raw);
		$('#registrationForm').find('input, select, textarea').each(function () {
			if (!this.id || this.type === 'file' || this.type === 'hidden') return;
			if (d.hasOwnProperty(this.id)) {
				if (this.type === 'checkbox') {
					this.checked = !!d[this.id];
				} else {
					$(this).val(d[this.id]);
				}
			}
		});
		if (d._selectedSubjects) regSelectedSubjects = d._selectedSubjects;
		$('.sreg .field-fl select').each(function(){ regSyncFilledClass(this); });
		$('.sreg .field-fl input[type="date"]').each(function(){
			$(this).toggleClass('filled', !!this.value);
		});
		$('.sreg .field-fl input:not([type="date"]):not([type="file"]):not([type="hidden"])').each(function(){
			$(this).toggleClass('filled', !!$.trim(this.value));
		});
		regUpdateParentBlocks();
		regUpdateProgress();
	} catch (e) { }
}

// Called from triggerDashboardModuleInit or document ready
$(document).ready(function () {
	// The current registration screen owns its workflow inline.  Do not attach
	// this legacy workflow as well: it keeps a separate subject array and can
	// submit an empty subjectId even when the current screen visibly has subjects.
	if ($('.sreg[data-registration-workflow="current"]').length) {
		return;
	}
	if ($('.sreg').length) {
		regInitRegistrationForm();
	}
});
