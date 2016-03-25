import {Component, Input, Output, EventEmitter, OnChanges} from 'angular2/core';
import {Directory} from './directory';
import {Dimension} from '../../models/objects';

@Component({
    selector: 'tree-view',
    template: require('./tree-view.html'),
    directives: [TreeView]
})
export class TreeView{
    @Input() directories: Directory[];
    @Output() clickMonitor: EventEmitter<any> = new EventEmitter;
    @Output() expandMonitor: EventEmitter<any> = new EventEmitter;

    onClick(dircode){
        this.clickMonitor.emit(dircode);
    }

    onExpand(dircode){
        this.expandMonitor.emit(dircode);
    }
}