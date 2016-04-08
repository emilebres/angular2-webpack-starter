import {provide} from 'angular2/core';
import {it, describe, expect, beforeEachProviders, inject} from 'angular2/testing';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import {CubesActions} from '../actions/cubes.actions';

import {ZebulonService} from '../services/zebulon.service';
import {mockZebulonService} from '../services/zebulon.service.mock';

import {ADD_CUBES} from '../reducers/cubes.reducer';

const input = [
	{
		id: 0, code: 'mock_cube0', name: 'Cube Mock 0',
		dimensions: [{ id: 0, code: 'dim_mock_0', name: 'Dim Mock 0' }, { id: 1, code: 'dim_mock_1', name: 'Dim Mock 1' }],
		parameters: [{ id: 0, tp: 'moc_type', name: 'Prm Mock 0' }, { id: 1, tp: 'moc_type', name: 'Prm Mock 1' }],
		measures: [{ id: 0, code: 'mea_mock_0', name: 'Mea Mock 0', operation: 'mock_ope' }, { id: 1, code: 'mea_mock_1', name: 'Mea Mock 1', operation: 'mock_ope' }],
	},
	{
		id: 1, code: 'mock_cube1', name: 'Cube Mock 1',
		dimensions: [{ id: 0, code: 'dim_mock_0', name: 'Dim Mock 0' }, { id: 1, code: 'dim_mock_1', name: 'Dim Mock 1' }],
		parameters: [{ id: 0, tp: 'moc_type', name: 'Prm Mock 0' }, { id: 1, tp: 'moc_type', name: 'Prm Mock 1' }],
		measures: [{ id: 0, code: 'mea_mock_0', name: 'Mea Mock 0', operation: 'mock_ope' }, { id: 1, code: 'mea_mock_1', name: 'Mea Mock 1', operation: 'mock_ope' }],
	}
];

const output = [
	{
		id: 0, code: 'mock_cube0', name: 'Cube Mock 0',
		dimensions: [{ id: 0, code: 'dim_mock_0', name: 'Dim Mock 0', selected: false, expanded: false }, { id: 1, code: 'dim_mock_1', name: 'Dim Mock 1', selected: false, expanded: false }],
		measures: [{ id: 0, code: 'mea_mock_0', name: 'Mea Mock 0', operation: 'mock_ope', selected: false }, { id: 1, code: 'mea_mock_1', name: 'Mea Mock 1', operation: 'mock_ope', selected: false }],
		parameters: [{ id: 0, tp: 'moc_type', name: 'Prm Mock 0' }, { id: 1, tp: 'moc_type', name: 'Prm Mock 1' }],
	},
	{
		id: 1, code: 'mock_cube1', name: 'Cube Mock 1',
		dimensions: [{ id: 0, code: 'dim_mock_0', name: 'Dim Mock 0', selected: false, expanded: false }, { id: 1, code: 'dim_mock_1', name: 'Dim Mock 1', selected: false, expanded: false }],
		measures: [{ id: 0, code: 'mea_mock_0', name: 'Mea Mock 0', operation: 'mock_ope', selected: false }, { id: 1, code: 'mea_mock_1', name: 'Mea Mock 1', operation: 'mock_ope', selected: false }],
		parameters: [{ id: 0, tp: 'moc_type', name: 'Prm Mock 0' }, { id: 1, tp: 'moc_type', name: 'Prm Mock 1' }],
	}
];


// class mockZebulonService extends ZebulonService {
// 	get cubes(){
// 		return Observable.from([input], i => i);
// 	};
// }

describe('Actions: Cubes', () => {

	beforeEachProviders(() => [
		CubesActions,
		provide(ZebulonService, { useClass: mockZebulonService })
		]
	);


	describe('addCubes', () => {

		it('returns cube payload', inject([CubesActions, ZebulonService], (actions: CubesActions, service: ZebulonService) => {

			let expected = {
				type: ADD_CUBES,
				payload: output
			};
			let actual = actions.addCubes(input);
			expect(actual).toEqual(expected);
		}));
	});

	describe('cubes', () => {
		it('returns cube action on observable input', inject([CubesActions], (actions: CubesActions) => {
			let expected = {
				type: ADD_CUBES,
				payload: output
			};
			actions.cubes.subscribe(action => {
				expect(action).toEqual(expected);
			} )
		}))
	})
});
