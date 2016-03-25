import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import { Cube, Dimension, Parameter, Measure, Query, Filter } from '../../models/objects'
import { ZebulonService }     from '../../services/zebulon.service';
import {StoreService} from '../../services/store.service';

// import { resultCube, dummyCube } from '../../services/ref.data';

import {CubeFilterComponent} from '../cube-filter/cube-filter.component';
import {QueryFormComponent} from '../query-form/query-form.component';

@Component({
	selector: 'query-config',
	template: require('./query-configuration.component.html'),
	directives: [CubeFilterComponent, QueryFormComponent]
})
export class QueryConfigurationComponent {
	cubes: Observable<Cube[]>;
	cube: Observable<Cube>;
	filters: Observable<Filter>
	@Output() confSubmit: EventEmitter<any> = new EventEmitter();

	constructor(private zebulonService: ZebulonService,
		private storeService: StoreService
		) {
		this.cubes = storeService.cubes;
		this.cube = storeService.selectedCube;
		this.filters = storeService.filters
	}

	ngOnInit(){
		this.storeService.loadCubes();
	}

	onConfSubmit(query : Query) {
		this.confSubmit.emit(query);
	}

	onCubeSelection(cube){
		this.storeService.selectCube(cube);
		cube.parameters.forEach(prm => this.storeService.loadParameterOptions(prm));
	}
}