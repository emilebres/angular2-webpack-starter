import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {DashDatePipe} from './dash-date.pipe';


describe('DashDate', () => {

    let pipe;

    beforeEachProviders(() => [
        DashDatePipe
    ]);

    beforeEach(inject([DashDatePipe], p => {
        pipe = p;
    }));

    it('throws if not used with a date', () => {
        expect(() => pipe.transform(null)).toThrow();
        expect(() => pipe.transform(undefined)).toThrow();
        expect(() => pipe.transform()).toThrow();
    })

    it('converts date into dash format', () => {
        expect(pipe.transform(new Date('2016/11/24'))).toEqual('2016-11-24')
    });

    it('converts date into dash format with 0 paddings', () => {
        expect(pipe.transform(new Date('2016/1/4'))).toEqual('2016-01-04')
    });

});
