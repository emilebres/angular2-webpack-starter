import {Reducer} from '@ngrx/store';


export const ADD_DATA = 'ADD_DATA';

export const grid: Reducer<any> = (state: any = {}, {type, payload}) => {
	switch (type) {
		case ADD_DATA:
			return Object.assign({}, state, { data: payload });
		default:
			return state;
	}
}