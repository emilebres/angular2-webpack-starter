import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {MeasureView} from './measure-view';

import {Cube, Measure} from '../../models/objects';


@Component({
	selector: 'mea-comp',
	template: require('./measures.component.html'),
})
export class MeasureFormComponent {
	@Input() measures: Measure[];
	@Output() select= new EventEmitter<Measure>();

	selected(mea: Measure){
		this.select.emit(mea);
	}
}


// @Input('measures') set measures(value: Measure[]){
// 	this.measureViews =value.map((mea: Measure): MeasureView => new MeasureView((mea.id || -1), mea.code, mea.name));
// };
// measureViews: MeasureView[];
// get diagnostic(){return JSON.stringify(this.measureViews)}