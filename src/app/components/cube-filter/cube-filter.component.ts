import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Cube} from '../../models/objects';


@Component({
	selector: 'cube-filter',
	template: require('./cube-filter.component.html')
})
export class CubeFilterComponent {
	@Input() cubes: Cube[];
	@Output() selected: EventEmitter<Cube> = new EventEmitter;

	// to send a cube at initialisation
	ngOnChanges() {
		// console.log('onChanges in CubeFilterComponent');
		this.cubes.length > 0 ? this.selected.emit(this.cubes[0]) : null;
	}

	onChange(cubeId: string){
		this.selected.emit(this.cubes.filter(cb => cb.id === Number(cubeId))[0]);
	}

}