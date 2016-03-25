import {Cube, Dimension} from '../models/objects';
import {Reducer} from '@ngrx/store';

export const emptyCube: Cube = {id: -1, code:'', name:'', dimensions:[], measures:[], parameters:[]}

export const SELECT_CUBE = 'SELECT_CUBE';
export const TOGGLE_MEASURE = 'TOGGLE_MEASURE';
export const TOGGLE_DIMENSION = 'TOGGLE_DIMENSION';
export const EXPAND_DIMENSION = 'EXPAND_DIMENSION';
export const ADD_PARAMETER_OPTIONS = 'ADD_PARAMETER_OPTIONS';
export const CHANGE_PARAMETER_VALUE = 'CHANGE_PARAMETER_VALUE';

export const selectedCube: Reducer<Cube> = (state: Cube = emptyCube, {type, payload}) => {
	switch (type) {
		case SELECT_CUBE:
			return payload;
		case TOGGLE_MEASURE:
			return Object.assign({}, state, {
				measures: state.measures.map(mea =>
					mea.id === payload.id ? Object.assign({}, mea, { selected: !mea.selected }) : mea)
			});
		case TOGGLE_DIMENSION:
			return Object.assign({}, state, {
				dimensions: state.dimensions.map(dim =>
					dim.id === payload.id ? Object.assign({}, dim, {selected:!dim.selected}): dim)
			})
		case EXPAND_DIMENSION:
			return Object.assign({}, state, {
				dimensions: state.dimensions.map(dim =>
					dim.id === payload.id ? Object.assign({}, dim, { expanded: !dim.expanded }) : dim)
			})
		case ADD_PARAMETER_OPTIONS:
			return Object.assign({}, state, {
				parameters: state.parameters.map(prm =>
					prm.id === payload.id ? Object.assign({}, prm, {value: payload.value, options: payload.options}) : prm)
			});
		case CHANGE_PARAMETER_VALUE:
			return Object.assign({}, state, {
				parameters: state.parameters.map(prm =>
					prm.id === payload.id ? Object.assign({}, prm, { value: payload.value }) : prm)
			});
		default:
			return state;
	}
}