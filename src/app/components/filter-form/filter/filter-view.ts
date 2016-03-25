export class FilterView{
	id: number;
	dimcode: string;
	dimension: string;
	type: string;
	value: any;
	options: MyOption[];

	constructor(id: number, dimcode: string, dimension: string) {
		this.id = id;
		this.dimcode = dimcode;
		this.dimension = dimension;
	}

	get checked(){
		return this.options.filter(opt => opt.checked).map(opt => opt.id);
	}

}

export class MyOption{
	id: number;
	code: string;
	checked: boolean = false;

	check(){
		this.checked = !this.checked;
	}

	constructor(id: number, code: string) {
		this.id = id;
		this.code = code;
	}
}