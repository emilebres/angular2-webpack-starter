import {it, describe, expect} from 'angular2/testing';
import {HiddenPipe} from './hidden.pipe';


describe('HiddenPipe', () => {
    let pipe: HiddenPipe = new HiddenPipe();
    let arr = [
        { id: 33, hidden: false },
        { id: 44, hidden: true },
        { id: 55, hidden: true },
        { id: 66, hidden: false }
    ];
    let filtered = [
        { id: 33, hidden: false },
        { id: 66, hidden: false }
    ];

    it('filters hidden objects', () => {
        expect(pipe.transform(arr)).toEqual(filtered)
    });

});
