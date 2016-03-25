// ///<reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
// import {List} from 'immutable';

import {cubes} from './cubes.reducer';
import {selectedCube} from './selected-cube.reducer';
import {filters} from './filters.reducer';
import {grid} from './grid.reducer';
import {UI} from './UI.reducer';

export const APP_REDUCERS = {
	cubes,
	selectedCube,
	filters,
	grid,
	UI
}
