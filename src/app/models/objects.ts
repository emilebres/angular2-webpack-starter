import { Injectable } from 'angular2/core';
import { Action, Reducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
// import { normalize, arrayOf, Schema } from 'normalizr';
// import { List, Map, Record, fromJS } from 'immutable';

// export const cubeSchema = new Schema('cubes');
// export const dimensionSchema = new Schema('dimensions');
// export const measureSchema = new Schema('measures');
// export const parameterSchema = new Schema('parameters');

// cubeSchema.define({
// 	dimensions: arrayOf(dimensionSchema),
// 	measures: arrayOf(measureSchema),
// 	parameters: arrayOf(parameterSchema)
// })

export interface Cube{
	id: number;
	code: string;
	name: string;
	dimensions: Dimension[];
	measures: Measure[];
	parameters: Parameter[];
}

export interface Dimension {
	id: number;
	code: string;
	name: string;
	id_fth?: number;
	id_root: number;
	lv: number;
	tp: string;
	children?: Dimension[];
	selected: boolean;
	expanded: boolean;
	filter?: Filter;
}

export interface Measure {
	id: number;
	code: string;
	name: string;
	operation: string;
	query_type?: string;
	selected: boolean;
}

export interface Parameter {
	id: number;
	name: string;
	tp: string;
	default_value: any;
	value?: any;
	cd_obj?: string;
	id_linked_table?: string;
	cd_linked_table?: string;
	xmltag?: string;
}

export interface Query {
	params: any[];
	cube: string;
	dimensions: string[];
	measures: string[];
	filters?: any[];
	subscriptions?: any[];
}

export interface FilterZeb {
	obj: string;
	filter: string;
	b_not: boolean;
	filter_on: string;
	val: any;
}

export interface Filter{
	id: number;
	dimcode: string;
	dimname: string;
	type: string;
	options: FilterOption[];
	hidden: boolean;
	initialized: boolean;
}

export interface FilterOption{
	id: number;
	cd: string;
	checked: boolean;
	// value: any;
}


export interface AppStore{
	cubes: Cube[];
	selectedCube: Cube;
	selectedDimensions: Dimension[];
	selectedMeasures: Measure[];
}
