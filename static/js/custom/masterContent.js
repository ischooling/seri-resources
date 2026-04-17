function getAllCountryList(formId, elementId, selectedValue, shouldDisable) {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster(formId, 'COUNTRIES-LIST', '1')),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				return;
			}

			var result = (((data || {})['mastersData'] || {})['data'] || []);
			var $dropdown = $('#' + formId + ' #' + elementId);
			$dropdown.html('<option value="">Select Country</option>');
			$.each(result, function(index, item) {
				$dropdown.append('<option value="' + escapeMasterOptionValue(item.key) + '">' + escapeMasterText(item.value) + '</option>');
			});

			if (selectedValue) {
				$dropdown.val(String(selectedValue));
			}
			if (shouldDisable === true) {
				$dropdown.prop('disabled', true);
			}
		}
	});
}

function getAllSchoolList(formId, elementId, selectedValue) {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster(formId, 'SCHOOLS-LIST', '1')),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				return;
			}

			var result = (((data || {})['mastersData'] || {})['data'] || []);
			var $dropdown = $('#' + formId + ' #' + elementId);
			$dropdown.html('<option value="">Select School</option>');
			$.each(result, function(index, item) {
				$dropdown.append('<option value="' + escapeMasterOptionValue(item.key) + '">' + escapeMasterText(item.value) + '</option>');
			});

			if (selectedValue) {
				$dropdown.val(String(selectedValue));
			}
		}
	});
}

function getFilteredSchoolList(formId, elementId, stateValue, cityValue, selectedValue) {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: getURLForCommon('masters'),
		data: JSON.stringify(getRequestForMaster(formId, 'FILTERED-SCHOOLS-LIST', stateValue || '0', cityValue || '0')),
		dataType: 'json',
		cache: false,
		timeout: 600000,
		success: function(data) {
			if (data['status'] == '0' || data['status'] == '2') {
				return;
			}

			var result = (((data || {})['mastersData'] || {})['data'] || []);
			var $dropdown = $('#' + formId + ' #' + elementId);
			$dropdown.html('<option value="">Select School</option>');
			$.each(result, function(index, item) {
				$dropdown.append('<option value="' + escapeMasterOptionValue(item.key) + '">' + escapeMasterText(item.value) + '</option>');
			});

			if (selectedValue) {
				$dropdown.val(String(selectedValue));
			}
		}
	});
}

function initializeCountryStateCity(formId, countryId, stateId, cityId, defaultCountryId, selectedStateId, selectedCityId, disableCountry) {
	countryId = countryId || 'countryId';
	stateId = stateId || 'stateId';
	cityId = cityId || 'cityId';

	var $form = $('#' + formId);
	var $country = $form.find('#' + countryId);
	var $state = $form.find('#' + stateId);
	var $city = $form.find('#' + cityId);

	getAllCountryList(formId, countryId, defaultCountryId, disableCountry === true);

	window.setTimeout(function() {
		if (defaultCountryId) {
			$country.val(String(defaultCountryId));
			callStates(formId, defaultCountryId, countryId);
			window.setTimeout(function() {
				if (selectedStateId) {
					$state.val(String(selectedStateId));
					callCities(formId, selectedStateId, stateId);
					window.setTimeout(function() {
						if (selectedCityId) {
							$city.val(String(selectedCityId));
						}
					}, 400);
				} else {
					resetDropdown($city, 'Select city');
				}
			}, 400);
		}
	}, 300);

	$(document).off('change', '#' + formId + ' #' + countryId).on('change', '#' + formId + ' #' + countryId, function() {
		var countryValue = $(this).val();
		if (countryValue) {
			callStates(formId, countryValue, countryId);
			return;
		}
		resetDropdown($state, 'Select state');
		resetDropdown($city, 'Select city');
	});

	$(document).off('change', '#' + formId + ' #' + stateId).on('change', '#' + formId + ' #' + stateId, function() {
		var stateValue = $(this).val();
		if (stateValue) {
			callCities(formId, stateValue, stateId);
			return;
		}
		resetDropdown($city, 'Select city');
	});
}

function escapeMasterText(value) {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function escapeMasterOptionValue(value) {
	if (value === null || value === undefined) {
		return '';
	}
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
