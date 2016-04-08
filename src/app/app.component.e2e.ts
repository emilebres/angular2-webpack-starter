/// <reference path="../../node_modules/zone.js/dist/zone.js.d.ts" />

import {verifyNoBrowserErrors} from 'angular2/src/testing/e2e_util';

describe('sanity check', () => {

	beforeEach(() => {
		browser.get('/');
	});

	afterEach(verifyNoBrowserErrors);

	it('has a tab title', () =>{
		expect(browser.getTitle()).toEqual('Zebulon Client');
	})

	it('has the h1 title', () => {
		expect(element(by.css('h1')).getText()).toEqual('Zebulon interface');
	})

	it('has the query form component', () => {
		expect(element(by.css('query-form')).isPresent()).toBeTruthy();
	})

	it('has the grid component', () => {
		expect(element(by.css('grid')).isPresent()).toBeTruthy();
	})

})