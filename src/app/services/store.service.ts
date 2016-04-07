import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {CubesActions} from '../actions/cubes.actions';
import {SelectedCubeActions} from '../actions/selected-cube.actions';
import {FiltersActions} from '../actions/filters.actions';
import {GridActions} from '../actions/grid.actions';


import {Cube, Dimension, Measure, Parameter, Filter, Query, AppStore} from '../models/objects';



@Injectable()
export class StoreService {

	cubes: Observable<Cube[]>;
	selectedCube: Observable<Cube>;
	filters: Observable<Filter>;
	grid: Observable<any>;

	constructor(
		private store: Store<AppStore>,
		private cubesActions: CubesActions,
		private selectedCubeActions: SelectedCubeActions,
		private filtersActions: FiltersActions,
		private gridActions: GridActions
	) {
		this.cubes = store.select('cubes');
		this.selectedCube = store.select('selectedCube');
		this.filters = store.select('filters');
		this.grid = store.select('grid');
	}

	selectCube(cube: Cube){
		// console.log(`in selectCube for cube ${cube.code}`);
		this.store.dispatch(this.selectedCubeActions.selectCube(cube));
		this.store.dispatch(this.filtersActions.addFilters(cube));
	}

	loadCubes(){
		this.cubesActions.cubes.subscribe(action => this.store.dispatch(action));
	}

	initParameter(parameter){
		if (parameter.tp === 'number'){
			this.selectedCubeActions.getParameterOptions(parameter).subscribe(action =>{
				this.store.dispatch(action);
				// this.initParameterValue(parameter);
			})
		}
		else {
			// this.initParameterValue(parameter);
		}
	}

	toggleDimension(dim){
		this.store.dispatch(this.selectedCubeActions.toggleDimension(dim));
	}

	toggleFilter(filter: Filter){
		if (!filter.initialized && filter.hidden) {
			this.filtersActions.getFilterOptions(filter).subscribe(action =>
				this.store.dispatch(action))
		}
		this.store.dispatch(this.filtersActions.toogleFilter(filter));
	}

	changeFilterType(filter, type){
		this.store.dispatch(this.filtersActions.changeType(filter, type));
	}

	toggleFilterOption(filter, option){
		this.store.dispatch(this.filtersActions.toggleOption(filter, option))
	}

	expandDimension(dim) {
		this.store.dispatch(this.selectedCubeActions.expandDimension(dim));
	}

	toggleMeasure(mea) {
		this.store.dispatch(this.selectedCubeActions.toggleMeasure(mea));
	}

	changeParameterValue(prm, value) {
		this.store.dispatch(this.selectedCubeActions.changeParameterValue(prm, value));
	}

	executeQuery(query){
		this.gridActions.executeQuery(query).subscribe(action =>
			this.store.dispatch(action));
	}

}