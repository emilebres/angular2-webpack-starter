import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';

// import {FilterView, MyOption} from './filter-view';
import {Filter} from '../../../models/objects';
import {ZebulonService} from '../../../services/zebulon.service';


@Component({
    selector: 'flt-comp',
    template: require('./filter.component.html'),
})
export class FilterComponent{
	@Input() filter: Filter;
	@Output() toggle = new EventEmitter;
	@Output() typeChange: EventEmitter<any> = new EventEmitter;
	@Output() optionCheck: EventEmitter<any> = new EventEmitter;

	private types: any[] = [
	{cd:'equal', label: 'equals'},
	{cd:'in', label: 'in'},
	{cd:'between', label: 'between'},
	{ cd: 'superior', label: 'greater than' },
	{ cd: 'inferior', label: 'lesser than' },
	{ cd: 'null', label: 'null' },
	{ cd: 'like', label: 'like' },
	{ cd: 'match', label: 'match' },
	];

	toggleFilter(){
		this.toggle.emit(this.filter);
	}

	onTypeChange(tpcd){
		// console.log('onTypeChange');
		// console.log(tpcd);
		this.typeChange.emit([this.filter, tpcd ]);
	}

	onOptionChange(opt) {
		// console.log('onOptionChange');
		this.optionCheck.emit([ this.filter, opt]);
	}

	ngOnInit(){
		this.filter.type === null ? this.onTypeChange(this.types[0].cd) : null;
	}
}