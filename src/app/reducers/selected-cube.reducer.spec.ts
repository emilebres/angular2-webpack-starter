import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';

import {selectedCube, emptyCube, SELECT_CUBE, TOGGLE_DIMENSION, TOGGLE_MEASURE, EXPAND_DIMENSION, ADD_PARAMETER_OPTIONS, CHANGE_PARAMETER_VALUE} from './selected-cube.reducer';

describe('Reducer: selectedCube', () => {

	const mockCubes = require('../models/cubes.mock.json');
	const state = mockCubes[0];

	it('returns initial state', () => {
		let actual = selectedCube(emptyCube, { type: 'MOCKED' })
		expect(actual).toEqual(emptyCube);
		expect(actual).not.toBe(state);
	});

	it('selects a cube', () => {
		let cube = mockCubes[1];
		let actual = selectedCube(state, { type: SELECT_CUBE, payload: cube })
		expect(actual).toEqual(cube);
		expect(actual).not.toBe(state);
	});

	it('toggles a dimension', () => {
		let dimension = mockCubes[0].dimensions[0];
		let actual = selectedCube(state, { type: TOGGLE_DIMENSION, payload: dimension });
		expect(actual.dimensions[0].selected).toEqual(!dimension.selected);
		expect(actual).not.toBe(state);
	});

	it('toggles a measure', () => {
		let measure = mockCubes[0].measures[0];
		let actual = selectedCube(state, { type: TOGGLE_MEASURE, payload: measure });
		expect(actual.measures[0].selected).toEqual(!measure.selected);
		expect(actual).not.toBe(state);
	});

	it('expands a dimension', () => {
		let dimension = mockCubes[0].dimensions[0];
		let actual = selectedCube(state, { type: EXPAND_DIMENSION, payload: dimension });
		expect(actual.dimensions[0].expanded).toEqual(!dimension.expanded);
		expect(actual).not.toBe(state);
	});

	it('add_parameter_options', () => {
		let parameter = mockCubes[0].parameters[0];
		parameter.options = [{ id: 1, cd: 'toto1' }, { id: 2, cd: 'toto2' }, { id: 3, cd: 'toto3' }];
		parameter.value = 1;
		let actual = selectedCube(state, { type: ADD_PARAMETER_OPTIONS, payload: parameter });
		expect(actual.parameters[0]).toEqual(parameter);
		expect(actual).not.toBe(state);
	});

	it('changes parameter value', () =>{
		let parameter = mockCubes[0].parameters[0];
		parameter.value = 1;
		let actual = selectedCube(state, { type: ADD_PARAMETER_OPTIONS, payload: parameter });
		expect(actual.parameters[0]).toEqual(parameter);
		expect(actual).not.toBe(state);
	})
})