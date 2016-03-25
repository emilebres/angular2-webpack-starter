import {Injectable} from 'angular2/core';
import {Store} from '@ngrx/store';
import {Cube, Dimension, Measure, Parameter, Filter, Query, AppStore} from '../models/objects';
import {SELECT_CUBE, TOGGLE_DIMENSION, EXPAND_DIMENSION, TOGGLE_MEASURE, ADD_PARAMETER_OPTIONS, CHANGE_PARAMETER_VALUE} from '../reducers/selected-cube.reducer';

import {ZebulonService} from '../services/zebulon.service';

@Injectable()
export class SelectedCubeActions {

	constructor(
		private store: Store<AppStore>,
		private zebulonService: ZebulonService
		) { }

	selectCube(cube: Cube) {
		return { type: SELECT_CUBE, payload: cube };
	}

	toggleDimension(dimension: Dimension) {
		return { type: TOGGLE_DIMENSION, payload: dimension };
	}

	expandDimension(dimension: Dimension){
		return { type: EXPAND_DIMENSION, payload: dimension };
	}

	toggleMeasure(measure: Measure) {
		return { type: TOGGLE_MEASURE, payload: measure };
	}

	getParameterOptions(parameter: Parameter){
		return this.zebulonService.getParamValues(parameter.name)
			.map(res => this.addParameterOptions(parameter, res));
	}

	addParameterOptions(parameter, res){
		var value = null;
		switch (parameter.tp) {
			case "date":
				value = new Date(Date.parse(parameter.default_value));
				// parameter.options = res.options ? res.options.map(v => new Date(Date.parse(v))) : [];
				break;
			case "number":
				value = parseFloat(parameter.default_value);
				// parameter.options = res.options ? res.options.map(v => parseFloat(v)) : [];
				break;
			case "boolean":
				value = parameter.default_value === '0h' ? false : true;
				break;
			default:
				value = parameter.default_value;
				// parameter.options = res.options ? res.options : [];
				break;
		}
		return {
			type: ADD_PARAMETER_OPTIONS,
			payload: Object.assign(
				{},
				parameter,
				{ options: res.map(opt => ({ id: opt.id, cd: opt.cd })), value }
			)
		};
	}

	changeParameterValue(parameter, value){
		return {
			type: CHANGE_PARAMETER_VALUE,
			payload: Object.assign(
				{},
				parameter,
				{ value }
			)
		};
	}

}