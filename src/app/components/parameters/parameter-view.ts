export class ParameterView{
	id: number;
	// code: string;
	name: string;
	type: string;
	value: any;
	// defaultvalue: any;
	options: any;

	constructor(id: number, name: string, type: string, defaultvalue?: any, options?:any[]) {
		this.id = id;
		// this.code = code;
		this.name = name;
		this.type = type;
		// const v = defaultvalue || ((defaultvalue === 0) ? 0 : null);
		switch (type) {
			case "date":
				this.value = new Date(Date.parse(defaultvalue));
				this.options = options ? options.map(v => new Date(Date.parse(v))) : [];
				break;
			case "number":
				this.value = parseFloat(defaultvalue);
				this.options = options ? options.map(v => parseFloat(v)): [];
				break;
			case "boolean":
				this.value = defaultvalue === '0h' ? false : true;
				break;
			default:
				this.value = defaultvalue;
				this.options = options ? options : [];
				break;
		}
	}

}
