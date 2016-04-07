import {Pipe} from "angular2/core";

@Pipe({
	name: "dashdate"
})
export class DashDatePipe {
	transform(date: Date) {
		if (date !== null) {
			return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
		}
		else {
			return '';
		}
	}
}