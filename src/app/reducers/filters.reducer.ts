import {Reducer} from '@ngrx/store';
import {Filter} from '../models/objects';

export const ADD_FILTERS = 'ADD_FILTERS';
export const ADD_FILTER_OPTIONS = 'ADD_FILTER_OPTIONS';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const TOGGLE_OPTION = 'TOGGLE_OPTION';
export const CHANGE_TYPE = 'CHANGE_TYPE';


export const filters: Reducer<Filter[]> = (state = [], {type, payload}) => {
	switch (type) {
		case ADD_FILTERS:
			// console.log('ADD_FILTERS');
			// console.log(payload);
			return payload;
		case ADD_FILTER_OPTIONS:
			// console.log('ADD_FILTER_OPTIONS');
			// console.log(payload);
			return state.map(flt =>
				flt.id === payload.id ? Object.assign({}, flt, { options: payload.options, initialized: true }) : flt);
		case TOGGLE_FILTER:
			// console.log('TOGGLE_FILTER');
			// console.log(payload);
			return state.map(flt =>
				flt.id === payload.id ? Object.assign({}, flt, { hidden: !payload.hidden }) : flt);
		case TOGGLE_OPTION:
			// console.log('TOGGLE_OPTION');
			let i = state.indexOf(payload.filter);
			return [...state.slice(0, i), Object.assign({}, payload.filter, {options: payload.options}), ...state.slice(i + 1)];
		case CHANGE_TYPE:
			let j = state.indexOf(payload.filter);
			return [...state.slice(0, j), Object.assign({}, payload.filter, { type: payload.type }), ...state.slice(j + 1)];
		default:
			// console.log('default');
			// console.log(type);
			// console.log(payload);
			return state;
	}
}