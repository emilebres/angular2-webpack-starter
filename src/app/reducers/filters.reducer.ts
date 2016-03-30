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
			return payload;
		case ADD_FILTER_OPTIONS:
			return state.map(flt =>
				flt.id === payload.id ? Object.assign({}, flt, { options: payload.options, initialized: true }) : flt);
		case TOGGLE_FILTER:
			return state.map(flt =>
				flt.id === payload.id ? Object.assign({}, flt, { hidden: !payload.hidden }) : flt);
		case TOGGLE_OPTION:
			return state.map(flt =>
				flt.id === payload.filter.id ? Object.assign({}, flt, {options: payload.options}) : flt)
				// flt.id === payload.filter.id ? {...flt, options: payload.options }) : flt)
		case CHANGE_TYPE:
			return state.map(flt =>
				flt.id === payload.filter.id ? Object.assign({}, flt, { type: payload.type }) : flt)
		default:
			return state;
	}
}