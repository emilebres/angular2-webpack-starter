import { Component, Input} from 'angular2/core';

import { Cube, Filter } from '../../models/objects'
import { StoreService }     from '../../services/store.service';

import { DimensionFormComponent } from '../dimensions/dimensions.component';
import { MeasureFormComponent } from '../measures/measures.component';
import { ParameterFormComponent} from '../parameters/parameters.component';
import { FilterFormComponent} from '../filter-form/filter-form.component';

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

	constructor(private storeService: StoreService) {}

	get cubeDiagnostic() { return 'CUBE: '+JSON.stringify(this.cube)}

	get filterDiagnostic() { return 'FILTERS: ' + JSON.stringify(this.filters) }

	onFormSubmit() {
		this.storeService.executeQuery([this.cube, this.filters]);
	}

	onDimMonitor(dimId, tp){
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

}