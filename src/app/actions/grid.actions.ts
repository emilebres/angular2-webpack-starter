import {Injectable} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Cube, Dimension, Measure, Parameter, Filter, Query, AppStore} from '../models/objects';
import {ADD_DATA} from '../reducers/grid.reducer';

import {ZebulonService} from '../services/zebulon.service';

@Injectable()
export class GridActions {

	constructor(
		private store: Store<AppStore>,
		private zebulonService: ZebulonService
	) { }

	addData(res) {
		console.log('in addData');
		return { type: ADD_DATA, payload: res[0] };
	}

	executeQuery([cube, filters]){
		const dims = cube.dimensions.filter(dim => dim.selected).map(dim => dim.code);
		const meas = cube.measures.filter(mea => mea.selected).map(mea => mea.code);
		const prms = cube.parameters.map(prm => ({ name: prm.name, value: prm.value, type: prm.tp }));
		const flts = filters.filter(flt => !flt.hidden).map(flt => ({ obj: flt.dimcode, filter: flt.type, b_not: false, filter_on: 'pk', val: flt.options.filter(opt => opt.checked).map(opt => opt.id) }))
		const query = {params: prms, cube:cube.code, dimensions: dims, measures:meas, filters:flts};
		console.log(query);
		return this.zebulonService.execQuery(query)
			.map(res => this.addData(res));
	}

}