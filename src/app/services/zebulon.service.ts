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

// import {serialize, deserialize} from './c';
import {Cube, Dimension, Measure, Parameter, Filter, Query} from '../models/objects';


@Injectable()
export class ZebulonService {

	 private _ws: $WebSocket;
	 private _stream: Observable<any>;
	 private requestId: number = 0;

	 constructor() {
		 this._ws = new $WebSocket("ws://localhost:53401");
		 this._stream = this._ws.getDataStream()
			 .map(res => JSON.parse(res.data));
	 }

	get nextId(){
		const id = this.requestId + 1;
		this.requestId++;
		return String(id);
	}

	get cubes() {
		console.log('getting cubes');
		const id = this.nextId;
		this._ws.send(id + '###' + '(`.z_gw.f.meta;`;`;`)');
		return this._stream
			.filter(res => res.id === id)
			.map(res => res.data)
			.map(res => this.initCubes(res));
	}

	initCubes(res){
		const cubes = res[0];
		const dimsArray = res[1];
		const measArray = res[2];
		const paramsArray = res[3];
		for (var i = 0; i < cubes.length; i++) {
			const cube = cubes[i];
			const dims = dimsArray[i].map(dim => ({id: dim.id, code: dim.code, name: dim.name, id_fth:dim.id_fth}));
			const meas = measArray[i].map(mea => ({ id: mea.id, code: mea.code, name: mea.name, operation: mea.operation }));
			const params = paramsArray[i]
				.map(prm => Object.assign({}, prm, {value: this.convertParamDefaultValue(prm.tp, prm.default_value) }))
				.map(prm => ({ id: prm.id, name: prm.name, tp: prm.tp, options: [], value: prm.value }));
			cube.dimensions = dims;
			cube.measures = meas;
			cube.parameters = params;
		}
		return cubes;
	}

	convertParamDefaultValue(type, defValue) {
		var value;
		switch (type) {
			case "date":
				value = new Date(defValue);
				break;
			case "number":
				value = parseFloat(defValue);
				break;
			case "boolean":
				value = defValue === '0h' ? false : true;
				break;
			default:
				value = defValue;
				break;
		};
		return value;
	}

	execQuery(query?){
		// console.log('executing query');
		// console.log(query);
		const bq = this.buildQuery(query);
		console.log(bq);
		const id = this.nextId;
		this._ws.send(id+'###(`.z_gw.f.query;'+bq+')');
		return this._stream
			.filter(res => res.id === id)
			.do(res => {
				console.log('query return '+ id);
				console.log(res);
			})
			.map(res => res.data);
	}

	buildQuery(q:Query){
		var jsquery = { };
		jsquery['prm'] = q.params.reduce((out, param) => {
			switch (param.type) {
				case "number":
					out['`'+param.name] = String(param.value)+'h';
					break;
				case "boolean":
					out['`' + param.name] = param.value ? '1b' : '0b';
					break;
				default:
					// code...
					break;
			}
			return out;
		}
			, {});
		jsquery['cub'] = '`'+q.cube;
		jsquery['mea'] = q.measures.map((cd: string) => '`'+cd);
		jsquery['dim'] = q.dimensions.map((cd : string) => '`'+cd);
		jsquery['filter'] = q.filters.map(flt => ({obj: '`'+flt.obj, filter: '`'+flt.filter, b_not:(flt.b_not?'1b':'0b'), filter_on: '`'+flt.filter_on, val:flt.val.join(' ')+'h'}));
		return this.queryToQString(jsquery);
	}

	queryToQString(jsquery){
		var qstring = '(`prm`cub`mea`dim`filter`b_cache!(';
		var mea = (jsquery['mea'].length === 1) ? 'enlist[' + jsquery['mea'][0] + ']' : '(' + jsquery['mea'].join(';') + ')';
		var dim = '([] dim:'+((jsquery['dim'].length === 1) ? 'enlist[' + jsquery['dim'][0] + ']' : '(' + jsquery['dim'].join(';') + ')') // we put dim in a table even though it is useless to avoid breaking q code
			+ ';' + 'col_row:' + '`row'.repeat(jsquery['dim'].length)	// useless column inserted for legacy reasons. to delete when server is updated
			+ ';' + 'subdim:' + '0'.repeat(jsquery['dim'].length) + 'b'	// useless column inserted for legacy reasons. to delete when server is updated
			+')';
		var prm = '(`;' + Object.keys(jsquery['prm']).join(';') + ')!(();' + Object.keys(jsquery['prm']).map(k => jsquery['prm'][k]).join(';') + ')';
		const b1filter = jsquery['filter'].length === 1;
		const filter = '([] obj:'+(b1filter ?('enlist['+jsquery['filter'][0].obj+']') : ('('+ jsquery['filter'].map(flt=>flt.obj).join(';') + ')'))
			+ ';' + 'filter:' + (b1filter ?('enlist['+jsquery['filter'][0].filter + ']') : ('(' + jsquery['filter'].map(flt => flt.filter).join(';') + ')'))
			+ ';' + ' b_not:' + (b1filter ?('enlist['+jsquery['filter'][0].b_not + ']') : ('(' + jsquery['filter'].map(flt => flt.b_not).join(';') + ')'))
			+ ';' + ' filter_on:' + (b1filter ?('enlist['+jsquery['filter'][0].filter_on + ']') : ('(' + jsquery['filter'].map(flt => flt.filter_on).join(';') + ')'))
			+ ';' + ' val:' + (b1filter ?('enlist['+jsquery['filter'][0].val + ']') : ('(' + jsquery['filter'].map(flt => flt.val).join(';') + ')'))
			+')';
		console.log(jsquery['filter']);
		console.log(filter);
		qstring += [prm, jsquery['cub'], mea, dim, filter].join(';')+';0b))';
		// console.log(qstring);
		return qstring;
	}

	getParamValues(param: string){
		console.log(`getting param values for ${param}`);
		const id = this.nextId;
		this._ws.send(id + '###' + '(`.z_gw.f.value;`prm;`' + param + ';()!();0Np)');
		return this._stream
			.filter(res => res.id === id)
			.map(res => res.data);
	}


	getDimValues(dim: string) {
		console.log('getting options for '+ dim);
		const id = this.nextId;
		this._ws.send(id + '###' + '(`.z_gw.f.value;`dim;`' + dim + ';()!();0Np)');
		return this._stream
			.filter(res => res.id === id)
			.map(res => res.data);
	}


	handleError(error: any) {
	        console.error('avant error');
	        console.error(error);
	        console.error('apres error');
	        return Observable.throw(error.json().error || 'Server error');
	 }
}