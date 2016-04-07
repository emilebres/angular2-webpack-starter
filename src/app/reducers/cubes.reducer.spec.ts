import {it, describe, expect, beforeEachProviders, inject} from 'angular2/testing';

import {cubes, ADD_CUBES} from './cubes.reducer';

describe('Reducer: cubes', () => {
	it('returns initial state', () => {
		expect(cubes([], { type: 'MOCKED' })).toEqual([])
	});

	it('adds cubes', () => {
		let state = [];
		let mockCubes = require('../models/cubes.mock.json');
		let actual = cubes(state, { type: ADD_CUBES, payload: mockCubes });
		expect(actual).toEqual(mockCubes);
		expect(actual).not.toBe(state);
	});
})
