import {verifyNoBrowserErrors} from 'angular2/src/testing/e2e_util';

describe('sanity check', () => {
	afterEach(verifyNoBrowserErrors);

	it('has the correct title', () =>{
		browser.get('./app.component.html');
		expect(browser.getTitle()).toEqual('Zebulon interface');
		expect(element(by.binding('title')).getText()).toEqual('Zebulon interface');
	})
})