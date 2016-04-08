import {it, describe, expect, beforeEachProviders, inject} from 'angular2/testing';
import {provide} from 'angular2/core';

import {Observable} from 'rxjs';

import {Cube, Parameter} from '../models/objects';
import {SelectedCubeActions} from '../actions/selected-cube.actions';
import {ZebulonService} from '../services/zebulon.service';
import {SELECT_CUBE, TOGGLE_DIMENSION, EXPAND_DIMENSION, TOGGLE_MEASURE, ADD_PARAMETER_OPTIONS, CHANGE_PARAMETER_VALUE} from '../reducers/selected-cube.reducer';

// class mockZebulonService extends ZebulonService {
// }

describe('Actions: SelectedCube', () => {

	beforeEachProviders(() => [
		SelectedCubeActions,
		ZebulonService
		// provide(ZebulonService, { useClass: mockZebulonService })
		]
	);

	let selectedCube : Cube = require('../models/selected-cube.mock.json');


	 describe('addParameterOptions', () => {

		it('add options to the parameter', inject([SelectedCubeActions], (actions: SelectedCubeActions) => {
			let mockOptions = [{ id: 0, cd: "mkt0" }, { id: 1, cd: "mkt1" }, { id: 2, cd: "mkt2" }, { id: 3, cd: "mkt3" }, { id: 4, cd: "mkt4" }, { id: 5, cd: "mkt5" }, { id: 6, cd: "mkt6" }, { id: 7, cd: "mkt7" }, { id: 8, cd: "mkt8" }, { id: 9, cd: "mkt9" }, { id: 10, cd: "mkt10" }, { id: 11, cd: "mkt11" }, { id: 12, cd: "mkt12" }, { id: 13, cd: "mkt13" }, { id: 14, cd: "mkt14" }, { id: 15, cd: "mkt15" }, { id: 16, cd: "mkt16" }, { id: 17, cd: "mkt17" }, { id: 18, cd: "mkt18" }, { id: 19, cd: "mkt19" }];
			let mockParameter: Parameter = { id: 0, name: "Toto", tp: "number", options: [], value: 13 };
			let expected = {
				type: ADD_PARAMETER_OPTIONS,
				payload: Object.assign({}, mockParameter, {options: mockOptions})
			};
			let actual = actions.addParameterOptions(mockParameter, mockOptions);
			expect(actual).not.toBe(expected);
			expect(actual).toEqual(expected);
		}));

	});

	// describe('getParameterOptions', () => {
	// 	// it('returns cube action on observable input', inject([SelectedCubeActions], (actions: SelectedCubeActions) => {
	// 	// 	let expected = {
	// 	// 		type: ADD_CUBES,
	// 	// 		payload: output
	// 	// 	};
	// 	// 	actions.cubes.subscribe(action => {
	// 	// 		expect(action).toEqual(expected);
	// 	// 	})
	// 	// }))
	// });

	describe('changeParameterValue', () => {

		it('returns correct action with new instance of parameter', inject([SelectedCubeActions], (actions: SelectedCubeActions) => {
			let parameter = selectedCube.parameters[0];
			let value = 'toto';
			let actual = actions.changeParameterValue(parameter, value);
			parameter.value = value;
			let expected = {
				type: CHANGE_PARAMETER_VALUE,
				payload: parameter
			};
			expect(actual).not.toBe(expected);
			expect(actual).toEqual(expected);
		}))

		it('works with type number', inject([SelectedCubeActions], (actions: SelectedCubeActions) => {
			let mockOptions = [{ id: 0, cd: "mkt0" }, { id: 1, cd: "mkt1" }, { id: 2, cd: "mkt2" }, { id: 3, cd: "mkt3" }, { id: 4, cd: "mkt4" }, { id: 5, cd: "mkt5" }, { id: 6, cd: "mkt6" }, { id: 7, cd: "mkt7" }, { id: 8, cd: "mkt8" }, { id: 9, cd: "mkt9" }, { id: 10, cd: "mkt10" }, { id: 11, cd: "mkt11" }, { id: 12, cd: "mkt12" }, { id: 13, cd: "mkt13" }, { id: 14, cd: "mkt14" }, { id: 15, cd: "mkt15" }, { id: 16, cd: "mkt16" }, { id: 17, cd: "mkt17" }, { id: 18, cd: "mkt18" }, { id: 19, cd: "mkt19" }];
			let mockParameter: Parameter = { id: 0, name: "Toto", tp:"number", options: mockOptions, value: 13 };
			let expected = {
				type: CHANGE_PARAMETER_VALUE,
				payload: Object.assign({}, mockParameter, { options: mockOptions, value: 12 })
			};
			let actual = actions.changeParameterValue(mockParameter, 12);
			expect(actual).not.toBe(expected);
			expect(actual).toEqual(expected);
		}));

		it('works with type date', inject([SelectedCubeActions], (actions: SelectedCubeActions) => {
			let mockParameter: Parameter = { id: 0, name: "Toto", tp: "date", options: [], value: new Date('2016/01/23') };
			let expected = {
				type: CHANGE_PARAMETER_VALUE,
				payload: Object.assign({}, mockParameter, { options: [], value: new Date('2016/04/16') })
			};
			let actual = actions.changeParameterValue(mockParameter, new Date('2016/04/16'));
			expect(actual).not.toBe(expected);
			expect(actual).toEqual(expected);
		}));

		it('works with type boolean', inject([SelectedCubeActions], (actions: SelectedCubeActions) => {
			let mockParameter: Parameter = { id: 0, name: "Toto", tp:"boolean", options: [], value: true };
			let expected = {
				type: CHANGE_PARAMETER_VALUE,
				payload: Object.assign({}, mockParameter, { options: [], value: false })
			};
			let actual = actions.changeParameterValue(mockParameter, false);
			expect(actual).not.toBe(expected);
			expect(actual).toEqual(expected);
		}));

	})
});
