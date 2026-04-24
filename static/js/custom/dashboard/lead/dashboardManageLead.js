var currentLeadFilters = {
	name: '',
	email: '',
	contact: '',
	country: '',
	state: '',
	city: '',
	assignToSchool: '',
	leadStatus: '',
	appliedUserRole: '',
	grade: '',
	startDate: '',
	endDate: ''
};
var currentLeadRows = [];
var pendingDiscardLeadIndex = null;

var leadFollowUpStatuses = [
	'Unassigned',
	'Follow-up Pending',
	'Contacted',
	'Interested',
	'Not Interested',
	'Qualified',
	'Converted',
	'Duplicate lead',
	'Ringing'
];

function getLeadDefaultValue(id, fallbackValue) {
	var value = $.trim($('#' + id).val() || '');
	return value ? value : fallbackValue;
}

function isSchoolLeadUser() {
	return getLeadDefaultValue('isSchoolLeadUser', 'false') === 'true';
}

function isLeadAssignmentEnabled() {
	return getLeadDefaultValue('leadAssignmentEnabled', 'true') === 'true';
}

function initManageLeadModule() {
	var $table = $('#manageLeadTable');
	if ($table.length === 0) {
		return;
	}
	if ($table.data('leadInitDone') === 'Y') {
		return;
	}
	currentLeadFilters = {
		name: '',
		email: '',
		contact: '',
		country: (isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultCountry', '101'),
		state: (isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultState', ''),
		city: (isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultCity', ''),
		assignToSchool: isLeadAssignmentEnabled() ? getLeadDefaultValue('leadDefaultAssignToSchool', '') : '',
		leadStatus: '',
		appliedUserRole: '',
		grade: '',
		startDate: '',
		endDate: ''
	};
	currentLeadRows = [];
	$table.data('leadInitDone', 'Y');
	bindLeadFilterActions();
	bindLeadRowActions();
	bindLeadEditActions();
	bindLeadUploadActions();
	bindLeadFollowUpActions();
	initializeLeadFollowUpStatusOptions('leadFollowUpStatus');
	initializeLeadFilterForm();
	ensureFollowUpDetailsColumn();
	loadLeadList();
}

function ensureFollowUpDetailsColumn() {
	var $headerRow = $('#manageLeadTable thead tr');
	if ($headerRow.length === 0 || $headerRow.find('.follow-up-details-header').length > 0) {
		return;
	}
	var $leadDetailsHeader = $headerRow.find('th').eq(1);
	if ($leadDetailsHeader.length === 0) {
		return;
	}
	$('<th class="follow-up-details-header col-followup">FollowUp Details</th>').insertAfter($leadDetailsHeader);
}

function loadLeadList(filters) {
	if (filters) {
		currentLeadFilters = $.extend({}, currentLeadFilters, filters);
	}

	if ($.fn.DataTable && $.fn.DataTable.isDataTable('#manageLeadTable')) {
		var oldDataTable = $('#manageLeadTable').DataTable();
		oldDataTable.clear();
		oldDataTable.destroy();
	}

	var $tbody = $('#manageLeadTableBody');
	$tbody.html('<tr><td colspan="' + getLeadTableColumnCount() + '" style="text-align:center;">Loading...</td></tr>');
	var requestBody = buildLeadFilterRequest(currentLeadFilters);

	$.ajax({
		type: 'POST',
		url: '/v1/leads/lead/list',
		global: false,
		contentType: 'application/json',
		data: JSON.stringify(requestBody),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(response) {
			var list = (response && response.data) ? response.data : [];
			renderLeadRows(list);

			try {
				if ($.fn && $.fn.dataTable) {
					$('#manageLeadTable').dataTable({
						bDestroy: true,
						processing: false,
						serverSide: false,
						autoWidth: false,
						scrollY: '55vh',
						scrollCollapse: true,
						scrollX: true,
						pageLength: 10,
						language: {
							emptyTable: 'No leads found'
						}
					});

					var dtObj = $('#manageLeadTable').dataTable();
					if (dtObj && typeof dtObj.fnSetFilteringEnterPress === 'function') {
						dtObj.fnSetFilteringEnterPress();
					}
					if ($.fn && $.fn.DataTable && $.fn.DataTable.isDataTable('#manageLeadTable')) {
						var leadTableApi = $('#manageLeadTable').DataTable();
						leadTableApi.columns.adjust().draw(false);
						window.setTimeout(function() {
							leadTableApi.columns.adjust().draw(false);
						}, 120);
					}
					$(window).off('resize.manageLeadTableAlign').on('resize.manageLeadTableAlign', function() {
						if ($.fn && $.fn.DataTable && $.fn.DataTable.isDataTable('#manageLeadTable')) {
							$('#manageLeadTable').DataTable().columns.adjust().draw(false);
						}
					});
					$('#manageLeadTable_processing').hide();
				}
			} catch (e) {
				console.log('Lead table datatable init error', e);
			}

			bindLeadFilterButton();
			if (typeof customLoader === 'function') {
				customLoader(false);
			}
		},
		error: function() {
			$tbody.html('<tr><td colspan="' + getLeadTableColumnCount() + '" style="text-align:center;">Unable to load lead list</td></tr>');
			if (typeof customLoader === 'function') {
				customLoader(false);
			}
		},
		complete: function() {
			if (typeof customLoader === 'function') {
				customLoader(false);
			}
		}
	});
}

function renderLeadRows(list) {
	var $tbody = $('#manageLeadTableBody');
	var rows = [];
	currentLeadRows = list || [];

	if (!currentLeadRows || currentLeadRows.length === 0) {
		$tbody.html('');
		return;
	} else {
		for (var i = 0; i < currentLeadRows.length; i++) {
			var item = currentLeadRows[i] || {};
			var contact = ((item.isd || '') + (item.phone ? (' ' + item.phone) : '')).trim();
			var location = buildLeadLocation(item.stateName || item.stateId, item.cityName || item.cityId);
			var rowClass = item.isOldLead ? 'old-lead-row' : 'new-lead-row';
			rows.push('<tr class="' + rowClass + '">'
				+ '<td class="col-serial">' + (i + 1) + '</td>'
				+ '<td class="lead-details-cell col-lead-details">' + buildLeadDetailsHtml(item.status, item.fullName, item.email, contact, item.altEmail, item.altPhone, item.appliedUserRole, item.organisationName) + '</td>'
				+ '<td class="lead-details-cell followup-details-cell col-followup">' + buildFollowUpDetailsHtml(item.latestFollowUpRemark, item.latestFollowUpDate, item.latestFollowUpRemarkBy, item.createdDate) + '</td>'
				+ '<td class="location-cell col-location">' + safeLeadValue(location) + '</td>'
				+ '<td class="campaign-details-cell col-campaign">' + buildCampaignDetailsHtml(item.campaignName, item.type, item.grade) + '</td>'
				+ '<td class="applied-role-details-cell col-applied-role">' + buildAppliedRoleDetailsHtml(item.appliedUserRole) + '</td>'
				+ (shouldShowAssignedSchoolColumn() ? '<td class="school-cell col-school">' + buildAssignedSchoolDetailsHtml(item.assignToSchoolName) + '</td>' : '')
				+ (shouldShowLeadActionColumn() ? buildLeadActionCell(i, item).replace('lead-action-cell', 'lead-action-cell col-action') : '')
				+ '</tr>');
		}
	}

	$tbody.html(rows.join(''));
}

function getLeadTableColumnCount() {
	var columnCount = 8;
	if (shouldShowLeadActionColumn()) {
		columnCount++;
	}
	return columnCount;
}

function shouldShowLeadActionColumn() {
	return true;
}

function shouldShowAssignedSchoolColumn() {
	return !isSchoolLeadUser() && isLeadAssignmentEnabled();
}

function buildLeadFilterRequest(filters) {
	var data = {};
	if (filters && filters.name) {
		data.name = $.trim(filters.name);
	}
	if (filters && filters.email) {
		data.email = $.trim(filters.email);
	}
	if (filters && filters.contact) {
		data.contact = $.trim(filters.contact);
	}
	if (filters && filters.country) {
		data.country = parseLeadInteger(filters.country);
	}
	if (filters && filters.state) {
		data.state = parseLeadInteger(filters.state);
	}
	if (filters && filters.city) {
		data.city = parseLeadInteger(filters.city);
	}
	if (filters && filters.assignToSchool) {
		data.assignToSchool = parseLeadInteger(filters.assignToSchool);
	}
	if (filters && filters.leadStatus) {
		data.leadStatus = $.trim(filters.leadStatus);
	}
	if (filters && filters.appliedUserRole) {
		data.appliedUserRole = $.trim(filters.appliedUserRole);
	}
	if (filters && filters.grade) {
		data.grade = $.trim(filters.grade);
	}
	if (filters && filters.startDate) {
		data.startDate = $.trim(filters.startDate);
	}
	if (filters && filters.endDate) {
		data.endDate = $.trim(filters.endDate);
	}
	return data;
}

function bindLeadFilterButton() {
	$('#leadTableFallbackToolbar').remove();
	var $filterWrapper = $('#manageLeadTable_filter');
	if ($filterWrapper.length > 0) {
		if ($('#openLeadFilterBtn').length > 0) {
			return;
		}
		$filterWrapper.append(' <button type="button" id="openLeadFilterBtn" class="btn btn-sm btn-primary">Filter</button>');
		return;
	}
}

function bindLeadFilterActions() {
	$(document).off('click', '#openLeadFilterBtn').on('click', '#openLeadFilterBtn', function() {
		initializeLeadFollowUpStatusOptions('leadFollowUpStatusFilter');
		$('#leadFilterName').val(currentLeadFilters.name || '');
		$('#leadFilterEmail').val(currentLeadFilters.email || '');
		$('#leadFilterContact').val(currentLeadFilters.contact || '');
		$('#countryId').val((isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : (currentLeadFilters.country || getLeadDefaultValue('leadDefaultCountry', '101')));
		if (!isSchoolLeadUser() && typeof initializeCountryStateCity === 'function') {
			initializeCountryStateCity(
				'leadFilterForm',
				'countryId',
				'stateId',
				'cityId',
				currentLeadFilters.country || getLeadDefaultValue('leadDefaultCountry', '101'),
				currentLeadFilters.state,
				currentLeadFilters.city,
				true
			);
			if (isLeadAssignmentEnabled()) {
				bindBoardSchoolFilterEvents();
				window.setTimeout(function() {
					loadBoardSchoolDropdown(currentLeadFilters.assignToSchool || '');
				}, 450);
			}
		} else {
			$('#stateId').val(currentLeadFilters.state || getLeadDefaultValue('leadDefaultState', ''));
			$('#cityId').val(currentLeadFilters.city || getLeadDefaultValue('leadDefaultCity', ''));
		}
		$('#leadFilterAssignToSchool').val(isLeadAssignmentEnabled() ? (currentLeadFilters.assignToSchool || getLeadDefaultValue('leadDefaultAssignToSchool', '')) : '');
		$('#leadFollowUpStatusFilter').val(currentLeadFilters.leadStatus || '');
		$('#leadFilterAppliedUserRole').val(currentLeadFilters.appliedUserRole || '');
		$('#leadFilterGrade').val(currentLeadFilters.grade || '');
		$('#leadFilterStartDate').val(currentLeadFilters.startDate || '');
		$('#leadFilterEndDate').val(currentLeadFilters.endDate || '');
		$('#leadFilterModal').modal('show');
	});

	$(document).off('click', '#applyLeadFilterBtn').on('click', '#applyLeadFilterBtn', function() {
		var startDate = $.trim($('#leadFilterStartDate').val());
		var endDate = $.trim($('#leadFilterEndDate').val());
		if (startDate && endDate && startDate > endDate) {
			alert('Start date cannot be greater than end date.');
			return;
		}

		loadLeadList({
			name: $.trim($('#leadFilterName').val()),
			email: $.trim($('#leadFilterEmail').val()),
			contact: $.trim($('#leadFilterContact').val()),
			country: $('#countryId').val(),
			state: $('#stateId').val(),
			city: $('#cityId').val(),
			assignToSchool: $('#leadFilterAssignToSchool').val(),
			leadStatus: $.trim($('#leadFollowUpStatusFilter').val()),
			appliedUserRole: $.trim($('#leadFilterAppliedUserRole').val()),
			grade: $.trim($('#leadFilterGrade').val()),
			startDate: startDate,
			endDate: endDate
		});
		$('#leadFilterModal').modal('hide');
	});

	$(document).off('click', '#resetLeadFilterBtn').on('click', '#resetLeadFilterBtn', function() {
		$('#leadFilterName').val('');
		$('#leadFilterEmail').val('');
		$('#leadFilterContact').val('');
		$('#countryId').val((isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultCountry', '101'));
		if (!isSchoolLeadUser()) {
			resetDropdown($('#leadFilterForm #stateId'), 'Select state');
			resetDropdown($('#leadFilterForm #cityId'), 'Select city');
			if (isLeadAssignmentEnabled()) {
				resetDropdown($('#leadFilterForm #leadFilterAssignToSchool'), 'Select School');
			}
			if (typeof initializeCountryStateCity === 'function') {
				initializeCountryStateCity(
					'leadFilterForm',
					'countryId',
					'stateId',
					'cityId',
					getLeadDefaultValue('leadDefaultCountry', '101'),
					'',
					'',
					true
				);
				if (isLeadAssignmentEnabled()) {
					bindBoardSchoolFilterEvents();
					window.setTimeout(function() {
						loadBoardSchoolDropdown('');
					}, 450);
				}
			}
		} else {
			$('#stateId').val(getLeadDefaultValue('leadDefaultState', ''));
			$('#cityId').val(getLeadDefaultValue('leadDefaultCity', ''));
		}
		$('#leadFilterAssignToSchool').val(isLeadAssignmentEnabled() ? getLeadDefaultValue('leadDefaultAssignToSchool', '') : '');
		$('#leadFollowUpStatusFilter').val('');
		$('#leadFilterAppliedUserRole').val('');
		$('#leadFilterGrade').val('');
		$('#leadFilterStartDate').val('');
		$('#leadFilterEndDate').val('');

		currentLeadFilters = {
			name: '',
			email: '',
			contact: '',
			country: (isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultCountry', '101'),
			state: (isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultState', ''),
			city: (isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultCity', ''),
			assignToSchool: isLeadAssignmentEnabled() ? getLeadDefaultValue('leadDefaultAssignToSchool', '') : '',
			leadStatus: '',
			appliedUserRole: '',
			grade: '',
			startDate: '',
			endDate: ''
		};
	});

}

function bindLeadRowActions() {
	$(document).off('click', '.openLeadEditAction').on('click', '.openLeadEditAction', function(e) {
		e.preventDefault();
		openLeadEditModal($(this).data('lead-index'));
	});

	$(document).off('click', '.openLeadAssignAction').on('click', '.openLeadAssignAction', function(e) {
		e.preventDefault();
		openLeadAssignmentModal($(this).data('lead-index'), 'assign');
	});

	$(document).off('click', '.openLeadMoveAction').on('click', '.openLeadMoveAction', function(e) {
		e.preventDefault();
		openLeadAssignmentModal($(this).data('lead-index'), 'move');
	});

	$(document).off('click', '.discardLeadAction').on('click', '.discardLeadAction', function(e) {
		e.preventDefault();
		pendingDiscardLeadIndex = $(this).data('lead-index');
		$('#leadDiscardWarningModal').modal('show');
	});

	$(document).off('click', '#confirmDiscardLeadBtn').on('click', '#confirmDiscardLeadBtn', function() {
		var leadIndex = pendingDiscardLeadIndex;
		if (leadIndex === null || leadIndex === undefined) {
			$('#leadDiscardWarningModal').modal('hide');
			return;
		}
		submitLeadAction({
			leadId: currentLeadRows[leadIndex] ? currentLeadRows[leadIndex].id : null,
			controlType: 'discard'
		});
		$('#leadDiscardWarningModal').modal('hide');
	});

	$(document).off('hidden.bs.modal', '#leadDiscardWarningModal').on('hidden.bs.modal', '#leadDiscardWarningModal', function() {
		pendingDiscardLeadIndex = null;
	});

	$(document).off('click', '#submitLeadActionBtn').on('click', '#submitLeadActionBtn', function() {
		submitLeadAction({
			leadId: $('#leadActionLeadId').val(),
			controlType: $('#leadActionType').val(),
			assignToSchool: $('#leadActionSchoolId').val()
		});
	});
}

function bindLeadEditActions() {
	$(document).off('click', '#submitLeadEditBtn').on('click', '#submitLeadEditBtn', function() {
		submitLeadEdit();
	});

	$(document).off('change.leadEditSchool', '#leadEditForm #leadEditStateId').on('change.leadEditSchool', '#leadEditForm #leadEditStateId', function() {
		loadLeadEditCityDropdown($(this).val(), '');
		window.setTimeout(function() {
			loadLeadEditSchoolDropdown('');
		}, 500);
	});

	$(document).off('change.leadEditSchool', '#leadEditForm #leadEditCityId').on('change.leadEditSchool', '#leadEditForm #leadEditCityId', function() {
		loadLeadEditSchoolDropdown('');
	});

	$(document).off('hidden.bs.modal', '#leadEditModal').on('hidden.bs.modal', '#leadEditModal', function() {
		resetLeadEditModal();
	});
}

function bindLeadUploadActions() {
	$(document).off('click', '#openLeadUploadModalBtn').on('click', '#openLeadUploadModalBtn', function() {
		resetLeadUploadState();
		$("#leadUploadModal #submitLeadUploadBtn").show();
		$('#leadUploadModal').modal('show');
	});

	

	$(document).off('hidden.bs.modal', '#leadUploadModal').on('hidden.bs.modal', '#leadUploadModal', function() {
		resetLeadUploadState();
	});
}

var debouncing = function (mainFun, delay) {
  var timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFun(...args);
    }, delay);
  };
};

var submitLeadUpload = debouncing(submitLeadUploadFun, 300);

function submitLeadUploadFun(){
	var fileInput = $('#leadCsvFile')[0];
	if (!fileInput || !fileInput.files || !fileInput.files.length) {
		showLeadUploadResult('Please select a CSV file.', false);
		return;
	}

	var formData = new FormData();
	formData.append('file', fileInput.files[0]);

	$('#submitLeadUploadBtn').prop('disabled', true).text('Uploading...');
	showLeadUploadResult('', true);

	$.ajax({
		type: 'POST',
		url: '/v1/leads/lead/upload-leads-data',
		data: formData,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function(response) {
			response = JSON.parse(response);
			var isSuccess = response && response.status === 'success';
			var message = response && response.message ? response.message : 'Upload completed.';
			if (response && response.errors && response.errors.length) {
				message += '<br><small>' + buildLeadUploadErrorText(response.errors) + '</small>';
			}
			showLeadUploadResult(message, true);
			$("#leadUploadModal #submitLeadUploadBtn").hide();
			if (isSuccess) {
				loadLeadList();
				$('#leadCsvFile').val('');
				$('#leadUploadModal').modal('hide');
			}
		},
		error: function() {
			showLeadUploadResult('Lead CSV upload failed. Please try again.', false);
		},
		complete: function() {
			$('#submitLeadUploadBtn').prop('disabled', false).text('Upload');
		}
	});
}

function bindLeadFollowUpActions() {
	$(document).off('click', '.openLeadFollowUpAction').on('click', '.openLeadFollowUpAction', function(e) {
		e.preventDefault();
		var leadId = parseLeadInteger($(this).attr('data-lead-id'));
		var leadName = $(this).attr('data-lead-name') || 'Lead';
		if (!leadId) {
			showMessage(true, 'Lead id is missing');
			return;
		}
		resetLeadFollowUpModal();
		$('#selectedLeadId').val(leadId);
		$('#leadFollowUpModalLabel').text('Lead Follow-up - ' + leadName);
		$('#leadFollowUpModal').modal('show');
		loadLeadFollowUpHistory(leadId);
	});

	$(document).off('click', '#submitLeadFollowUpBtn').on('click', '#submitLeadFollowUpBtn', function() {
		submitLeadFollowUp();
	});

	$(document).off('hidden.bs.modal', '#leadFollowUpModal').on('hidden.bs.modal', '#leadFollowUpModal', function() {
		resetLeadFollowUpModal();
	});
}

function initializeLeadFollowUpStatusOptions(elementId) {
	var $status = $('#'+elementId);
	if ($status.length === 0) {
		return;
	}
	// $status.data('statusInitDone', 'Y');
	$status.html('<option value="">Select Lead Status</option>');
	for (var i = 0; i < leadFollowUpStatuses.length; i++) {
		$status.append('<option value="' + safeLeadAttribute(leadFollowUpStatuses[i]) + '">'
			+ safeLeadValue(leadFollowUpStatuses[i]) + '</option>');
	}
}

function resetLeadFollowUpModal() {
	$('#selectedLeadId').val('');
	$('#leadFollowUpStatus').val('');
	$('#leadFollowUpRemark').val('');
	$('#leadCurrentStatus').text('-');
	$('#leadFollowUpHistoryBody').html('<tr><td colspan="3" style="text-align:center;">No history available</td></tr>');
	$('#submitLeadFollowUpBtn').prop('disabled', false).text('Submit');
}

function loadLeadFollowUpHistory(leadId) {
	$('#leadFollowUpHistoryBody').html('<tr><td colspan="3" style="text-align:center;">Loading...</td></tr>');
	$.ajax({
		type: 'GET',
		url: '/v1/leads/follow-up/' + leadId,
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(response) {
			if (!response || response.status !== 'SUCCESS') {
				$('#leadFollowUpHistoryBody').html('<tr><td colspan="3" style="text-align:center;">Unable to load history</td></tr>');
				if (response && response.message) {
					showMessage(true, response.message);
				}
				return;
			}
			$('#leadCurrentStatus').text(response.currentLeadStatus || '-');
			if (response.currentLeadStatus) {
				$('#leadFollowUpStatus').val(response.currentLeadStatus);
			}
			renderLeadFollowUpHistory(response.history || []);
		},
		error: function() {
			$('#leadFollowUpHistoryBody').html('<tr><td colspan="3" style="text-align:center;">Unable to load history</td></tr>');
			showMessage(true, 'Unable to load lead follow-up history');
		}
	});
}

function renderLeadFollowUpHistory(history) {
	var $tbody = $('#leadFollowUpHistoryBody');
	var rows = [];
	if (!history || history.length === 0) {
		$tbody.html('<tr><td colspan="3" style="text-align:center;">No history available</td></tr>');
		return;
	}
	for (var i = 0; i < history.length; i++) {
		var item = history[i] || {};
		rows.push('<tr>'
			+ '<td>' + safeLeadValue((item.createdAt)) + '</td>'
			+ '<td>' + safeLeadValue(item.leadStatus) + '</td>'
			+ '<td>' + safeLeadValue(item.remark) + '</td>'
			+ '<td>' + safeLeadValue(item.remarkBy) + '</td>'
			+ '</tr>');
	}
	$tbody.html(rows.join(''));
}

function submitLeadFollowUp() {
	var leadId = parseLeadInteger($('#selectedLeadId').val());
	var leadStatus = $.trim($('#leadFollowUpStatus').val());
	var remark = $.trim($('#leadFollowUpRemark').val());

	if (!leadId) {
		showMessage(true, 'Lead id is missing');
		return;
	}
	if (!leadStatus) {
		showMessage(true, 'Please select lead status');
		return;
	}
	if (!remark) {
		showMessage(true, 'Please enter remark');
		return;
	}

	$('#submitLeadFollowUpBtn').prop('disabled', true).text('Submitting...');
	$.ajax({
		type: 'POST',
		url: '/v1/leads/follow-up',
		contentType: 'application/json',
		data: JSON.stringify({
			leadId: leadId,
			leadStatus: leadStatus,
			remark: remark
		}),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(response) {
			if (!response || response.status !== 'SUCCESS') {
				showMessage(true, (response && response.message) ? response.message : 'Unable to save lead follow-up');
				return;
			}
			$('#leadCurrentStatus').text(response.currentLeadStatus || leadStatus);
			$('#leadFollowUpRemark').val('');
			renderLeadFollowUpHistory(response.history || []);
			showMessage(false, response.message || 'Lead follow-up saved successfully');
			loadLeadList();
			$('#leadFollowUpModal').modal('hide');
		},
		error: function() {
			showMessage(true, 'Unable to save lead follow-up');
		},
		complete: function() {
			$('#submitLeadFollowUpBtn').prop('disabled', false).text('Submit');
		}
	});
}

function resetLeadUploadState() {
	$('#leadCsvFile').val('');
	showLeadUploadResult('', true);
	$('#leadUploadResult').hide();
}

function showLeadUploadResult(message, isSuccess) {
	var $result = $('#leadUploadResult');
	if (!message) {
		$result.removeClass('alert-success alert-danger').html('').hide();
		return;
	}
	$result.removeClass('alert-success alert-danger')
		.addClass(isSuccess ? 'alert-success' : 'alert-danger')
		.html(message)
		.show();
}

function buildLeadUploadErrorText(errors) {
	var messages = [];
	for (var i = 0; i < errors.length; i++) {
		var item = errors[i] || {};
		if (item.rowNumber && item.message) {
			messages.push('Row ' + item.rowNumber + ': ' + safeLeadValue(item.message));
		}
	}
	return messages.join('<br>');
}

function initializeLeadFilterForm() {
	$('#countryId').val((isSchoolLeadUser() && isLeadAssignmentEnabled()) ? '' : getLeadDefaultValue('leadDefaultCountry', '101'));
	$('#leadFilterAssignToSchool').val(isLeadAssignmentEnabled() ? getLeadDefaultValue('leadDefaultAssignToSchool', '') : '');
	$('#leadFilterAppliedUserRole').val('');
	$('#leadFilterGrade').val('');
	if (!isSchoolLeadUser() && typeof initializeCountryStateCity === 'function') {
		initializeCountryStateCity(
			'leadFilterForm',
			'countryId',
			'stateId',
			'cityId',
			getLeadDefaultValue('leadDefaultCountry', '101'),
			getLeadDefaultValue('leadDefaultState', ''),
			getLeadDefaultValue('leadDefaultCity', ''),
			true
		);
		if (isLeadAssignmentEnabled()) {
			bindBoardSchoolFilterEvents();
			window.setTimeout(function() {
				loadBoardSchoolDropdown('');
			}, 450);
		}
		return;
	}
	$('#stateId').val(getLeadDefaultValue('leadDefaultState', ''));
	$('#cityId').val(getLeadDefaultValue('leadDefaultCity', ''));
}

function bindBoardSchoolFilterEvents() {
	if (isSchoolLeadUser() || !isLeadAssignmentEnabled()) {
		return;
	}

	$('#leadFilterForm #stateId').off('change.leadSchoolFilter').on('change.leadSchoolFilter', function() {
		window.setTimeout(function() {
			loadBoardSchoolDropdown('');
		}, 200);
	});

	$('#leadFilterForm #cityId').off('change.leadSchoolFilter').on('change.leadSchoolFilter', function() {
		loadBoardSchoolDropdown('');
	});
}

function loadBoardSchoolDropdown(selectedSchoolId) {
	if (isSchoolLeadUser() || !isLeadAssignmentEnabled() || typeof getFilteredSchoolList !== 'function') {
		return;
	}

	getFilteredSchoolList(
		'leadFilterForm',
		'leadFilterAssignToSchool',
		$('#stateId').val(),
		$('#cityId').val(),
		selectedSchoolId
	);
}

function openLeadAssignmentModal(leadIndex, controlType) {
	var lead = currentLeadRows[leadIndex] || {};
	$('#leadActionLeadId').val(lead.id || '');
	$('#leadActionType').val(controlType || 'assign');
	$('#leadAssignmentModalLabel').text(controlType === 'move' ? 'Move Lead' : 'Assign Lead');
	$('#submitLeadActionBtn').text(controlType === 'move' ? 'Move Lead' : 'Assign Lead');
	resetDropdown($('#leadActionSchoolId'), 'Select School');

	if (typeof getFilteredSchoolList === 'function') {
		getFilteredSchoolList(
			'leadAssignmentModal',
			'leadActionSchoolId',
			lead.stateId,
			lead.cityId,
			lead.assignToSchool || ''
		);
	}

	$('#leadAssignmentModal').modal('show');
}

function openLeadEditModal(leadIndex) {
	var lead = currentLeadRows[leadIndex] || {};
	if (!lead.id) {
		showLeadActionMessage(true, 'Lead id is missing.');
		return;
	}

	resetLeadEditModal();
	$('#leadEditLeadId').val(lead.id || '');
	$('#leadEditName').val(lead.fullName || '');
	$('#leadEditEmail').val(lead.email || '');
	$('#leadEditContact').val(buildLeadEditContact(lead));
	$('#leadEditAltEmail').val(lead.altEmail || '');
	$('#leadEditAltPhone').val(lead.altPhone || '');
	$('#leadEditOrganisationName').val(lead.organisationName || '');
	$('#leadEditGrade').val(lead.grade || '');
	$('#leadEditAppliedUserRole').val(lead.appliedUserRole || '');
	$('#leadEditAssignToSchool').val(lead.assignToSchool || '');

	loadLeadEditStateDropdown(getLeadDefaultValue('leadDefaultCountry', '101'), lead.stateId || '', lead.cityId || '', lead.assignToSchool || '');
	loadLeadEditSchoolDropdown(lead.assignToSchool || '');

	$('#leadEditModalLabel').text('Edit Lead - ' + (lead.fullName || 'Lead'));
	$('#leadEditModal').modal('show');
}

function submitLeadEdit() {
	var leadId = parseLeadInteger($('#leadEditLeadId').val());
	if (!leadId) {
		showLeadEditResult('Lead id is missing.', false);
		return;
	}

	$('#submitLeadEditBtn').prop('disabled', true).text('Saving...');
	showLeadEditResult('', true);

	$.ajax({
		type: 'POST',
		url: '/v1/leads/edit',
		global: false,
		contentType: 'application/json',
		data: JSON.stringify({
			leadId: leadId,
			fullName: $.trim($('#leadEditName').val()),
			email: $.trim($('#leadEditEmail').val()),
			contact: $.trim($('#leadEditContact').val()),
			altEmail: $.trim($('#leadEditAltEmail').val()),
			altPhone: $.trim($('#leadEditAltPhone').val()),
			organisationName: $.trim($('#leadEditOrganisationName').val()),
			state: parseLeadInteger($('#leadEditStateId').val()),
			city: parseLeadInteger($('#leadEditCityId').val()),
			grade: $.trim($('#leadEditGrade').val()),
			appliedUserRole: $.trim($('#leadEditAppliedUserRole').val()),
			assignToSchool: parseLeadInteger($('#leadEditAssignToSchool').val())
		}),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(response) {
			if (response && String(response.status).toLowerCase() === 'success') {
				$('#leadEditModal').modal('hide');
				loadLeadList();
				showLeadActionMessage(false, response.message || 'Lead updated successfully.');
				return;
			}
			showLeadEditResult((response && response.message) ? response.message : 'Unable to update lead.', false);
		},
		error: function() {
			showLeadEditResult('Unable to update lead.', false);
		},
		complete: function() {
			$('#submitLeadEditBtn').prop('disabled', false).text('Save');
		}
	});
}

function resetLeadEditModal() {
	$('#leadEditLeadId').val('');
	$('#leadEditName').val('');
	$('#leadEditEmail').val('');
	$('#leadEditContact').val('');
	$('#leadEditAltEmail').val('');
	$('#leadEditAltPhone').val('');
	$('#leadEditOrganisationName').val('');
	$('#leadEditStateId').html('<option value="">Select state</option>');
	$('#leadEditCityId').html('<option value="">Select city</option>');
	$('#leadEditGrade').val('');
	$('#leadEditAppliedUserRole').val('');
	$('#leadEditAssignToSchool').val('');
	showLeadEditResult('', true);
	$('#leadEditResult').hide();
	$('#submitLeadEditBtn').prop('disabled', false).text('Save');
}

function loadLeadEditSchoolDropdown(selectedSchoolId) {
	if (!isLeadAssignmentEnabled() || isSchoolLeadUser() || typeof getFilteredSchoolList !== 'function') {
		return;
	}

	getFilteredSchoolList(
		'leadEditForm',
		'leadEditAssignToSchool',
		$('#leadEditStateId').val(),
		$('#leadEditCityId').val(),
		selectedSchoolId || ''
	);
}

function loadLeadEditStateDropdown(countryId, selectedStateId, selectedCityId, selectedSchoolId) {
	resetDropdown($('#leadEditStateId'), 'Select state');
	resetDropdown($('#leadEditCityId'), 'Select city');
	if (!countryId || typeof getURLForCommon !== 'function' || typeof getRequestForMaster !== 'function') {
		return;
	}

	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster('leadEditForm', 'STATES-LIST', countryId)),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(data) {
			if (data && data.status !== '0' && data.status !== '2') {
				buildDropdown((((data || {}).mastersData || {}).data || []), $('#leadEditStateId'), 'Select state');
				if (selectedStateId) {
					$('#leadEditStateId').val(String(selectedStateId));
					loadLeadEditCityDropdown(selectedStateId, selectedCityId, selectedSchoolId);
				}
			}
		}
	});
}

function loadLeadEditCityDropdown(stateId, selectedCityId, selectedSchoolId) {
	resetDropdown($('#leadEditCityId'), 'Select city');
	if (!stateId || typeof getURLForCommon !== 'function' || typeof getRequestForMaster !== 'function') {
		return;
	}

	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster('leadEditForm', 'CITIES-LIST', stateId)),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(data) {
			if (data && data.status !== '0' && data.status !== '2') {
				buildDropdown((((data || {}).mastersData || {}).data || []), $('#leadEditCityId'), 'Select city');
				if (selectedCityId) {
					$('#leadEditCityId').val(String(selectedCityId));
				}
				loadLeadEditSchoolDropdown(selectedSchoolId || '');
			}
		}
	});
}

function showLeadEditResult(message, isSuccess) {
	var $result = $('#leadEditResult');
	if (!message) {
		$result.removeClass('alert-success alert-danger').html('').hide();
		return;
	}
	$result.removeClass('alert-success alert-danger')
		.addClass(isSuccess ? 'alert-success' : 'alert-danger')
		.html(message)
		.show();
}

function buildLeadEditContact(lead) {
	var phone = lead && lead.phone ? String(lead.phone) : '';
	var isd = lead && lead.isd ? String(lead.isd) : '';
	if (!phone) {
		return '';
	}
	if (isd && phone.indexOf(isd.replace(/[^0-9]/g, '')) !== 0) {
		return isd + ' ' + phone;
	}
	return phone;
}

function submitLeadAction(payload) {
	if (!payload || !payload.leadId || !payload.controlType) {
		showLeadActionMessage(true, 'Invalid lead action.');
		return;
	}

	if ((payload.controlType === 'assign' || payload.controlType === 'move') && !parseLeadInteger(payload.assignToSchool)) {
		showLeadActionMessage(true, 'Please select school.');
		return;
	}

	showLeadActionMessage(false, '');

	$.ajax({
		type: 'POST',
		url: '/v1/leads/action',
		global: false,
		contentType: 'application/json',
		data: JSON.stringify({
			leadId: parseLeadInteger(payload.leadId),
			controlType: payload.controlType,
			assignToSchool: parseLeadInteger(payload.assignToSchool)
		}),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(response) {
			if (response && String(response.status).toLowerCase() === 'success') {
				$('#leadAssignmentModal').modal('hide');
				loadLeadList();
				showLeadActionMessage(false, response.message || 'Lead updated successfully.');
				return;
			}
			showLeadActionMessage(true, (response && response.message) ? response.message : 'Unable to update lead.');
		},
		error: function() {
			showLeadActionMessage(true, 'Unable to update lead.');
		}
	});
}

function parseLeadInteger(value) {
	var parsedValue = parseInt(value, 10);
	return isNaN(parsedValue) || parsedValue <= 0 ? null : parsedValue;
}

function buildLeadLocation(state, city) {
	var stateValue = state && state !== '-' ? $.trim(String(state)) : '';
	var cityValue = city && city !== '-' ? $.trim(String(city)) : '';
	if (stateValue && cityValue) {
		return stateValue + ' | ' + cityValue;
	}
	if (stateValue) {
		return stateValue;
	}
	if (cityValue) {
		return cityValue;
	}
	return '-';
}

function buildLeadDetailsHtml(status, name, email, contact, altEmail, altPhone, appliedUserRole, organisationName) {
	var organisationHtml = '';
	if (organisationName) {
		organisationHtml = '<div><span class="lead-details-label">Institute Name:</span>' + safeLeadValue(organisationName) + '</div>';
	}
	var statusValue = (status === null || status === undefined || String(status).trim() === '') ? 'N/A' : status;
	return '<div><span class="lead-details-label">Status:</span>' + safeLeadValue(statusValue) + '</div>'
		+ '<div><span class="lead-details-label">Name:</span>' + safeLeadValue(name) + '</div>'
		+ '<div><span class="lead-details-label">Email:</span>' + safeLeadValue(email) + '</div>'
		+ '<div><span class="lead-details-label">Contact:</span>' + safeLeadValue(contact) + '</div>'
		// + '<div><span class="lead-details-label">Alternate Email:</span>' + safeLeadValue(altEmail || 'N/A') + '</div>'
		// + '<div><span class="lead-details-label">Alternate Phone:</span>' + safeLeadValue(altPhone || 'N/A') + '</div>'
		+ organisationHtml;
}

function buildFollowUpDetailsHtml(latestFollowUpRemark, latestFollowUpDate, latestFollowUpRemarkBy, createdDate) {
	var followUpDetailsHtml = '<div><span class="lead-details-label">Remark:</span>'
		+ safeLeadValue(latestFollowUpRemark || 'N/A') + '</div>'
		+ '<div><span class="lead-details-label">Follow-up Date:</span>'
		+ safeLeadValue(formatLeadDate(latestFollowUpDate)) + '</div>'
		+ '<div><span class="lead-details-label">Remark By:</span>'
		+ safeLeadValue(latestFollowUpRemarkBy || 'N/A') + '</div>'
	return followUpDetailsHtml;
}

function buildCampaignDetailsHtml(campaignName, type, grade) {
	return '<div><span class="lead-details-label">Campaign:</span>' + safeLeadValue(campaignName) + '</div>'
		+ '<div><span class="lead-details-label">Type:</span>' + safeLeadValue(type) + '</div>'
		+ '<div><span class="lead-details-label">Grade:</span>' + safeLeadValue(grade) + '</div>';
}

function buildAppliedRoleDetailsHtml(appliedUserRole) {
	return '<div>' + safeLeadValue(appliedUserRole) + '</div>';
}

function buildAssignedSchoolDetailsHtml(assignToSchoolName) {
	return '<div>' + safeLeadValue(assignToSchoolName) + '</div>';
}

function buildLeadActionCell(index, item) {
	var hasAssignedSchool = parseLeadInteger(item.assignToSchool);
	var assignActionClass = hasAssignedSchool ? 'openLeadMoveAction' : 'openLeadAssignAction';
	var assignActionIcon = hasAssignedSchool ? 'fa-random' : 'fa-edit';
	var assignActionLabel = hasAssignedSchool ? 'Move Lead' : 'Assign Lead';
	var actionItems = '';

	actionItems += '<li><a href="javascript:void(0);" class="openLeadEditAction" data-lead-index="' + index + '">'
		+ '<i class="fa fa-pencil"></i> Edit</a></li>';

	actionItems += '<li><a href="javascript:void(0);" class="openLeadFollowUpAction"'
		+ ' data-lead-id="' + safeLeadAttribute(item.id) + '"'
		+ ' data-lead-name="' + safeLeadAttribute(item.fullName) + '">'
		+ '<i class="fa fa-history"></i> Add follow-up</a></li>';

	if (!isSchoolLeadUser() && isLeadAssignmentEnabled()) {
		actionItems += '<li><a href="javascript:void(0);" class="' + assignActionClass + '" data-lead-index="' + index + '">'
			+ '<i class="fa ' + assignActionIcon + '"></i> ' + assignActionLabel + '</a></li>'
			+ '<li><a href="javascript:void(0);" class="discardLeadAction" data-lead-index="' + index + '">'
			+ '<i class="fa fa-trash"></i> Discard</a></li>';
	}

	return '<td class="lead-action-cell">'
		+ '<div class="dropdown lead-action-dropdown">'
		+ '<button class="btn btn-primary dropdown-toggle lead-action-btn" type="button" data-toggle="dropdown"'
		+ ' data-lead-id="' + safeLeadAttribute(item.id) + '"'
		+ ' data-lead-name="' + safeLeadAttribute(item.fullName) + '">'
		+ '<span class="caret"></span></button>'
		+ '<ul class="dropdown-menu">'
		+ actionItems
		+ '</ul></div>'
		+ '</td>';
}

function showLeadActionMessage(isWarning, message) {
	if (typeof hideMessage === 'function' && !message) {
		hideMessage('');
		return;
	}
	if (typeof showMessage === 'function') {
		showMessage(isWarning, message || '');
		return;
	}
	if (message) {
		alert(message);
	}
}

function formatLeadDate(epochMillis) {
	if (!epochMillis) {
		return '-';
	}
	var dateValue = epochMillis;
	if (typeof dateValue === 'string' && /^\d+$/.test(dateValue)) {
		dateValue = parseInt(dateValue, 10);
	}
	var date = new Date(dateValue);
	if (isNaN(date.getTime())) {
		return '-';
	}
	var day = String(date.getDate()).padStart(2, '0');
	var month = String(date.getMonth() + 1).padStart(2, '0');
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = String(date.getMinutes()).padStart(2, '0');
	var seconds = String(date.getSeconds()).padStart(2, '0');
	var amPm = hours >= 12 ? 'PM' : 'AM';
	var hours12 = hours % 12;
	if (hours12 === 0) {
		hours12 = 12;
	}
	var formattedHours = String(hours12).padStart(2, '0');

	return day + '-' + month + '-' + year + ' ' + formattedHours + ':' + minutes + ':' + seconds + ' ' + amPm;
}

function safeLeadValue(value) {
	if (value === null || value === undefined || value === '') {
		return '-';
	}
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function safeLeadAttribute(value) {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#39;');
}
