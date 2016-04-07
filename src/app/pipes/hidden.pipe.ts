import {Pipe} from 'angular2/core';

@Pipe({
	name: 'hidden'
})
export class HiddenPipe{

	transform(value){
		return value.filter(item => !item.hidden);
	}
}
