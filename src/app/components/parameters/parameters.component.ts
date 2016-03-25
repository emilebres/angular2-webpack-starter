import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {ParameterView} from './parameter-view';

import {ZebulonService} from '../../services/zebulon.service';
import {Cube, Parameter} from '../../models/objects';
import {DashDate} from '../../pipes/custom-date.pipe';

@Component({
    selector: 'prm-comp',
    template: require('./parameters.component.html'),
    directives: [NgSwitch, NgSwitchWhen, NgSwitchDefault],
    pipes:[DashDate]
})
export class ParameterFormComponent {
    	@Input() parameters: Parameter[];
	@Output() parameterChange: EventEmitter<any> = new EventEmitter;

	onChange(prmId, optId){
		this.parameterChange.emit({ prm: Number(prmId), opt: Number(optId) });
	}
}