import {Injectable} from 'angular2/core';
import { Http, Response } from 'angular2/http';

//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import {$WebSocket} from './angular2-websocket';
import {ZebulonService} from './zebulon.service';

// import {serialize, deserialize} from './c';
import {Cube, Dimension, Measure, Parameter, Filter, Query} from '../models/objects';


@Injectable()
export class mockZebulonService extends ZebulonService{

	private mockCubes: Cube[] = [
		{
			id: 0, code: 'mock_cube0', name: 'Cube Mock 0',
			dimensions: [{ id: 0, code: 'dim_mock_0', name: 'Dim Mock 0' }, { id: 1, code: 'dim_mock_1', name: 'Dim Mock 1' }],
			parameters: [{ id: 0, tp: 'moc_type', name: 'Prm Mock 0' }, { id: 1, tp: 'moc_type', name: 'Prm Mock 1' }],
			measures: [{ id: 0, code: 'mea_mock_0', name: 'Mea Mock 0', operation: 'mock_ope' }, { id: 1, code: 'mea_mock_1', name: 'Mea Mock 1', operation: 'mock_ope' }],
		},
		{
			id: 1, code: 'mock_cube1', name: 'Cube Mock 1',
			dimensions: [{ id: 0, code: 'dim_mock_0', name: 'Dim Mock 0' }, { id: 1, code: 'dim_mock_1', name: 'Dim Mock 1' }],
			parameters: [{ id: 0, tp: 'moc_type', name: 'Prm Mock 0' }, { id: 1, tp: 'moc_type', name: 'Prm Mock 1' }],
			measures: [{ id: 0, code: 'mea_mock_0', name: 'Mea Mock 0', operation: 'mock_ope' }, { id: 1, code: 'mea_mock_1', name: 'Mea Mock 1', operation: 'mock_ope' }],
		}
	];

	private mockParamValues = [];

	private mockDimValues = [];

	private mockResults = [];

	get cubes() {
		console.log('getting cubes');
		return Observable.from([this.mockCubes], i => i)
			// .map(res => this.initCubes(res));
	}


	execQuery(mockQuery){
		return Observable.from([this.mockResults], i => i)
	}

	getParamValues(param: string){
		return Observable.from([this.mockParamValues], i => i)
	}


	getDimValues(dim: string) {
		return Observable.from([this.mockResults], i => i)
	}


}