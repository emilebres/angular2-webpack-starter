import {Component, Input, Output, EventEmitter, OnChanges} from 'angular2/core';
import {Directory} from './directory';
import {TreeView} from './tree-view';
import {Dimension} from '../../models/objects';

@Component({
    selector: 'dim-comp',
    template: require('./dimensions.component.html'),
    directives: [TreeView]
})
export class DimensionFormComponent implements OnChanges{
    private directories: Directory[];
    @Input() dimensions: Dimension[];
    @Output() dimClickMonitor: EventEmitter<any> = new EventEmitter;
    @Output() dimExpandMonitor: EventEmitter<any> = new EventEmitter;

    // get diagnostic(){return JSON.stringify(this.directories);}

    onClickMonitor(dimId){
        this.dimClickMonitor.emit(dimId);
    }

    onExpandMonitor(dimId) {
        this.dimExpandMonitor.emit(dimId);
    }

    ngOnChanges(changes){
        this.dimensions.length > 0 ? this.directories = this.getDirectories(this.dimensions) : null;
    }

    getDirectories(dimensions: Dimension[]): Directory[] {
        var flatDirs = dimensions.map((dim: Dimension): Directory => new Directory(dim.id, dim.code, dim.name, dim.selected, dim.expanded, dim.id_fth));
        var map = {};
        for (var dir of flatDirs) {
            dir['directories'] = [];
            map[dir.id] = dir;
            var fth = dir.id_fth || ((dir.id_fth === 0) ? 0 : -1);
            if (!map[fth]) { map[fth] = { directories: [] } };
            map[fth]['directories'].push(dir);
        }
        return map[-1]['directories'];
    }

}