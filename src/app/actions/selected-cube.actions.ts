import {Injectable} from 'angular2/core';
import {Cube, Dimension, Measure, Parameter, Filter, Query, AppStore} from '../models/objects';
import {SELECT_CUBE, TOGGLE_DIMENSION, EXPAND_DIMENSION, TOGGLE_MEASURE, ADD_PARAMETER_OPTIONS, CHANGE_PARAMETER_VALUE} from '../reducers/selected-cube.reducer';

import {ZebulonService} from '../services/zebulon.service';

@Injectable()
export class SelectedCubeActions {

	constructor(private zebulonService: ZebulonService ) { }

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
 		parameter.options = res.map(opt => ({ id: opt.id, cd: opt.cd }));
		return {
			type: ADD_PARAMETER_OPTIONS,
			payload: parameter
		};
	}

	changeParameterValue(parameter, value){
		parameter.value = value;
		return {
			type: CHANGE_PARAMETER_VALUE,
			payload: parameter
		};
	}

}