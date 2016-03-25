import { Component} from 'angular2/core';

import * as obj from '../models/objects';

class resultC implements obj.Cube {
	code = 'result';
	name = 'Result';

	dimensions = {
		mkt: { id: 0, code: 'mkt', name: 'Market', id_root: 0, lv: 0, tp: 'object' },
		ptf_1: { id: 1, code: 'ptf_1', name: 'Portfolio 1', id_fth: 0, id_root: 0, lv: 1, tp: 'object' },
		ptf_2: { id: 2, code: 'ptf_2', name: 'Portfolio 2', id_fth: 1, id_root: 0, lv: 2, tp: 'object' },
		ptf_3: { id: 3, code: 'ptf_3', name: 'Portfolio 3', id_fth: 2, id_root: 0, lv: 3, tp: 'object' },
		cur: { id: 4, code: 'cur', name: 'Currency', id_root: 9, lv: 0, tp: 'object' }
	};
	measures = [{ name: 'Amount', code: 'm_amt', operation: 'sum' }, {name: 'Quantity', code:'m_qt', operation: 'sum'}];
	parameters = [{ name: 'QuantityUnit', default_value: '0h' }, { name: 'Currency', default_value: '0h' }];
}

export var resultCube : obj.Cube = new resultC()

class dummyC implements obj.Cube {
	code = 'dummy';
	name = 'Dummy';

	dimensions = [
		{ id: 0, code: 'mkt_dummy', name: 'Market_dummy', id_root: 0, lv: 0, tp: 'object' },
		{ id: 1, code: 'ptf_1_dummy', name: 'Portfolio_dummy 1', id_fth: 0, id_root: 0, lv: 1, tp: 'object' },
		{ id: 2, code: 'ptf_2_dummy', name: 'Portfolio_dummy 2', id_fth: 1, id_root: 0, lv: 2, tp: 'object' },
		{ id: 3, code: 'ptf_3_dummy', name: 'Portfolio_dummy 3', id_fth: 2, id_root: 0, lv: 3, tp: 'object' },
		{ id:4, code: 'cur_dummy', name: 'Currency_dummy', id_root: 9, lv: 0, tp: 'object' }
	];
	measures = [{ name: 'Amount', code: 'm_amt_c', operation: 'sum' }];
	parameters = [{ name: 'QuantityUnit', default_value: '0h' }, { name: 'Currency', default_value: '0h' }];
}

export var dummyCube: obj.Cube = new dummyC()