import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Cube} from '../../models/objects';


@Component({
	selector: 'cube-filter',
	template: require('./cube-filter.component.html')
})
export class CubeFilterComponent {
	@Input() cubes: Cube[];
	@Output() selected = new EventEmitter<Cube>();

	// to send a cube at initialisation
	ngOnChanges() {
		this.cubes.length > 0 ? this.selected.emit(this.cubes[0]) : null;
	}

	onChange(cubeId: string){
		this.selected.emit(this.cubes.filter(cb => cb.id === Number(cubeId))[0]);
	}

}