import {Cube, Dimension} from '../models/objects';
import {Reducer} from '@ngrx/store';

export const ADD_CUBES = 'ADD_CUBES';

export const cubes: Reducer<Cube[]> = (state: Cube[] = [], {type, payload}) => {
	switch (type) {
		case ADD_CUBES:
			return payload;
		default:
			return state;
	}
}