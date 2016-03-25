export class MeasureView{
	checked : boolean = false;
	id: number;
	code: string;
	name: string;

	constructor(id: number, code: string, name: string) {
		this.id = id;
		this.code = code;
		this.name = name;
	}

	check(){this.checked = !this.checked}
}
