import {provide} from 'angular2/core';
import {it, describe, expect, beforeEachProviders, inject} from 'angular2/testing';

import {Observable} from 'rxjs';
// import {map} from 'rxjs/observable/from';

import {CubesActions} from '../actions/cubes.actions';

import {ZebulonService} from '../services/zebulon.service';
import {ADD_CUBES} from '../reducers/cubes.reducer';

class mockZebulonService extends ZebulonService {
	get cubes(){
		let response = require('../services/meta.zeb.mock.json');
		return Observable.from([response], i => i)
	}
}

describe('Actions: Cubes', () => {

	beforeEachProviders(() => [
		CubesActions,
		provide(ZebulonService, { useClass: mockZebulonService })
		]
	);

	let output = require('../models/cubes.mock.json');

	describe('addCubes', () => {

		it('returns cube payload', inject([CubesActions], (actions) => {
			let input = require('../services/meta.zeb.mock.json');

			let expected = {
				type: ADD_CUBES,
				payload: output
			};
			expect(actions.addCubes(input)).toEqual(expected);
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
