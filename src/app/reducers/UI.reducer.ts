import {Reducer} from '@ngrx/store';

export const EXPAND_DIMENSION = 'EXPAND_DIMENSION';

export const initialUIState = { dimensionQueryForm: {} };

export const UI: Reducer<any> = (state: any = initialUIState, {type, payload}) =>{
	switch (type) {
		case EXPAND_DIMENSION:
			// code...
			break;

		default:
			// code...
			return state;
	}
}
