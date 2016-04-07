import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';

import {filters, ADD_FILTERS, ADD_FILTER_OPTIONS, TOGGLE_FILTER, CHANGE_TYPE, TOGGLE_OPTION} from './filters.reducer';

describe('Reducer: filters', () => {

	let mockFilters = require('../models/filters.mock.json');
	let state = mockFilters;

	it('returns state when invalid action', () => {
		let actual = filters(state, { type: 'INVALID_ACTION' })
		expect(actual).toEqual(state);
	});

	it('adds filter options', () => {
		let filter = mockFilters.filter(flt => !flt.initialized)[0];
		let i = mockFilters.indexOf(filter)
		filter.options = [{id:0, cd:'toto0', checked: false},{id:1, cd:'toto1', checked: false},{id:2, cd:'toto2', checked: false}]
		filter.initialized = true;
		let actual = filters(state, { type: ADD_FILTER_OPTIONS, payload: filter })
		expect(actual[i]).toEqual(filter);
		expect(actual).not.toBe(state);
	});

})