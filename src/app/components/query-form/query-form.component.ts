// ///<reference path='../../../../node_modules/immutable/dist/immutable.d.ts'/>
// import {List} from 'immutable';

import { Component, Input, Output, EventEmitter, OnChanges, ViewChild} from 'angular2/core';

import { Cube, Dimension, Parameter, Measure, Query, Filter } from '../../models/objects'
import { StoreService }     from '../../services/store.service';
// import { resultCube, dummyCube } from '../../services/ref.data';

import {CubeFilterComponent} from '../cube-filter/cube-filter.component';

import { DimensionFormComponent } from '../dimensions/dimensions.component';
import { MeasureFormComponent } from '../measures/measures.component';
// import { MeasureView } from '../measures/measure-view';
import { ParameterFormComponent} from '../parameters/parameters.component';
// import { ParameterView } from '../parameters/parameter-view';
import { FilterFormComponent} from '../filter-form/filter-form.component';
// import { FilterView, MyOption} from '../filters/filter/filter-view';


@Component({
	selector: 'query-form',
	template: require('./query-form.component.html'),
	directives: [
	DimensionFormComponent,
	MeasureFormComponent,
	ParameterFormComponent,
	 FilterFormComponent
	]
})
export class QueryFormComponent{

	@Input() cube : Cube;
	@Input() filters: Filter[];
	// @Output() formSubmit: EventEmitter<any> = new EventEmitter;

	// private selectedDims: Dimension[] = [];
	// private meaviews: MeasureView[];
	// private prmviews: ParameterView[];
	// private fltviews: FilterView[];

	constructor(private storeService: StoreService) {}

	// buildMeaViews(cube: Cube) {
	// 	return cube.measures.map(
	// 		(mea: Measure): MeasureView => new MeasureView((mea.id || -1), mea.code, mea.name))
	// }


	// buildPrmViews(cube: Cube) {
	// 	return cube.parameters.map((prm: Parameter) => new ParameterView(prm.id, prm.name, prm.tp, prm.default_value));
	// }


	get cubeDiagnostic() { return 'CUBE: '+JSON.stringify(this.cube)}

	get filterDiagnostic() { return 'FILTERS: ' + JSON.stringify(this.filters) }


	onFormSubmit() {
		console.log('onFormSubmit');
		this.storeService.executeQuery([this.cube, this.filters]);
	}

	onDimMonitor(dimId, tp){
		// console.log(`onDimClickMonitor ${dimId}, ${tp}`);
		if (tp === 'click') {
			this.storeService.toggleDimension(this.cube.dimensions.filter(dim => dim.id === dimId)[0]);
		}
		else {
			this.storeService.expandDimension(this.cube.dimensions.filter(dim => dim.id === dimId)[0]);
		}
	}

	onMeasureSelection(measure) {
		this.storeService.toggleMeasure(measure);
	}

	onParameterChange(res){
		this.storeService.changeParameterValue(this.cube.parameters.filter(prm => prm.id === res.prm)[0], res.value);
	}

	// onToggleFilter(event){
	// 	this.storeService.toggleFilter(this.filters.filter(flt => flt.id === dimId)[0]);
	// }

	onFilterTypeChange(event){
		console.log('onFilterChange');
		console.log(event);
		this.storeService.changeFilterType(event.filter, event.type);
	}

	onFilterOptionCheck(event){
		this.storeService.toggleFilterOption(event.filter, event.option);
	}
}