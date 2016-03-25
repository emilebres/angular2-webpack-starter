import {Injectable} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Cube, Dimension, Measure, Parameter, Filter, Query, AppStore} from '../models/objects';
import {ADD_CUBES} from '../reducers/cubes.reducer';
import {ZebulonService} from '../services/zebulon.service';

@Injectable()
export class CubesActions {

	constructor(private store: Store<AppStore>,
		private zebulonService: ZebulonService) { }

	get cubes(){
		return this.zebulonService.cubes.map(res =>
			this.addCubes(res));
	}

	addCubes(res) {
		const cubes = res[0];
		const dimsArray = res[1];
		const measArray = res[2];
		const paramsArray = res[3];
		for (var i = 0; i < cubes.length; i++) {
			const cube = cubes[i];
			const dims = dimsArray[i].map(dim => Object.assign({}, dim, { selected: false, expanded: false }));
			const meas = measArray[i].map(mea => Object.assign({}, mea, { selected: false }));
			const params = paramsArray[i].map(prm => Object.assign({}, prm, { options:[], value: null}));
			cube.dimensions = dims;
			cube.measures = meas;
			cube.parameters = params;
		}
		return { type: ADD_CUBES, payload: cubes };

		// try of normalizing state
		// the porblem is it is going to be complicated to pass data to components
		// var normalized = { result: cubes.map(cube => cube.id), entities:{ cubes:{}, dimensions:{}, measures:{}, parameters:{}} };
		// for (var i = 0; i < cubes.length; i++) {
		// 	const cube = cubes[i];
		// 	const dims = dimsArray[i].map(dim => Object.assign({}, dim, { selected: false }));
		// 	const meas = measArray[i].map(mea => Object.assign({}, mea, { selected: false }));
		// 	const params = paramsArray[i];

		// 	normalized.entities.cubes[cube.id] = Object.assign(
		// 		{},
		// 		cube,
		// 		{
		// 			dimensions: dims.map(dim => dim.id),
		// 			measures: meas.map(mea => mea.id),
		// 			parameters: params.map(prm => prm.id)
		// 		});
		// 	dims.forEach(dim =>
		// 		normalized.entities.dimensions[dim.id] = Object.assign(
		// 			{},
		// 			dim,
		// 			{ selected: false }
		// 		));
		// 	meas.forEach(mea =>
		// 		normalized.entities.measures[mea.id] = Object.assign(
		// 			{},
		// 			mea,
		// 			{ selected: false }
		// 		));
		// 	params.forEach(prm =>
		// 		normalized.entities.parameters[prm.id] = Object.assign(
		// 			{},
		// 			prm
		// 		));
		// }
		// console.log(normalized);
	}

}