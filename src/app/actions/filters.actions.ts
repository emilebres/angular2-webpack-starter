import {Injectable} from 'angular2/core';
import {Cube, Dimension, Measure, Parameter, Filter, Query, AppStore} from '../models/objects';
import {ADD_FILTERS, ADD_FILTER_OPTIONS, TOGGLE_FILTER, TOGGLE_OPTION, CHANGE_TYPE} from '../reducers/filters.reducer';
import {ZebulonService} from '../services/zebulon.service';

@Injectable()
export class FiltersActions {

	constructor(private zebulonService: ZebulonService) { }

	toogleFilter(filter: Filter){
		console.log(`toggling filter for ${filter.dimcode}`);
		// const filter = {id: dim.id, dimcode: dim.code, dimname: dim.name, type: null, options:[], value: null}
		return { type: TOGGLE_FILTER, payload: filter};
	}

	addFilters(cube: Cube){
		return {
			type: ADD_FILTERS, payload: cube.dimensions.map((dim: Dimension): Filter => ({
				id: dim.id,
				dimcode: dim.code,
				dimname: dim.name,
				type: null,
				options: null,
				hidden: true,
				initialized: false
			})
			)
		};
	}

	getFilterOptions(filter: Filter){
		return this.zebulonService.getDimValues(filter.dimcode)
			.map(options => this.addFilterOptions(filter, options));
	}

	addFilterOptions(filter, options){
		console.log(`in addFilterOptions for ${filter.dimcode}`);
		const filterOptions = options.map(opt => ({ cd: opt.cd, id: opt.id, checked: false }));
		console.log(filterOptions);
		return {type: ADD_FILTER_OPTIONS,
			payload: Object.assign({},
				filter,
				{options: filterOptions}
			)}
	}

	changeType(filter, type){
		return {
			type: CHANGE_TYPE,
			payload:  {filter, type}
		}
	}

	toggleOption(filter, option){
		const i = filter.options.indexOf(option);
		const options = [...filter.options.slice(0, i), Object.assign({}, option, { checked: !option.checked }), ...filter.options.slice(i+1)];
		return {type: TOGGLE_OPTION,
			payload: {filter, options}};
	}
}