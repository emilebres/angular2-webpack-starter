import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {ParameterView} from './parameter-view';

import {ZebulonService} from '../../services/zebulon.service';
import {Cube, Parameter} from '../../models/objects';
import {DashDatePipe} from '../../pipes/dash-date.pipe';

@Component({
    selector: 'prm-comp',
    template: require('./parameters.component.html'),
    directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault],
    pipes:[DashDatePipe]
})
export class ParameterFormComponent {
    	@Input() parameters: Parameter[];
	@Output() parameterChange: EventEmitter<any> = new EventEmitter;

	onNumberChange(prmId, optId){
		this.parameterChange.emit({ prm: Number(prmId), value: Number(optId) });
	}

	onDateChange(prmId, dateValue){
		this.parameterChange.emit({ prm: Number(prmId), value: new Date(dateValue) });
	}

	onBooleanChange(prmId, bool){
		this.parameterChange.emit({ prm: Number(prmId), value: bool });
	}
}