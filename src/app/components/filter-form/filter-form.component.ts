// ///<reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
// import {List} from 'immutable';

import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Filter} from '../../models/objects';
import {HiddenPipe} from '../../pipes/hidden.pipe';
import {ZebulonService} from '../../services/zebulon.service';
import {StoreService} from '../../services/store.service';

import {FilterComponent} from './filter/filter.component';

@Component({
    selector: 'flts-comp',
    template: require('./filter-form.component.html'),
    pipes: [HiddenPipe],
    directives: [FilterComponent]
})
export class FilterFormComponent {
	@Input() filters: Filter[];
	constructor(
		private zebulonService: ZebulonService,
		private storeService: StoreService){}

	onToggleFilter(filter){
		this.storeService.toggleFilter(filter);
	}

	onTypeChange([filter, type]){
		this.storeService.changeFilterType(filter, type);
	}

	onOptionCheck([filter, option]){
		this.storeService.toggleFilterOption(filter, option);
	}

}