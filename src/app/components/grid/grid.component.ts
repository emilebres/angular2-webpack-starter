import {Component, OnInit, OnChanges, Input} from 'angular2/core';

import {AgGridNg2} from 'ag-grid-ng2/main';
import {GridOptions} from 'ag-grid/main';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';

// import {DataService} from './data.service';
import {ZebulonService} from '../../services/zebulon.service'
// import {RefData} from './refData';
// import {skillsCellRenderer, countryCellRenderer, percentCellRenderer} from './renderer';
// import ProficiencyFilter from './proficiencyFilter';
// import SkillFilter from './skillFilter';

@Component({
    selector: 'grid',
    template: require('./grid.component.html'),
    styles: ['.toolbar button {margin: 2px; padding: 0px;}'],
    directives: [AgGridNg2],
})
export class GridComponent{

    @Input() grid;
    private gridOptions: GridOptions;
    private rowData: any[];
    // private refData: RefData;
    private columnDefs: any[];
    private rowCount: string;

    constructor(
        private _zebulonService: ZebulonService) {
        // we pass an empty gridOptions in, so we can grab the api out
        console.log('creating grid options');
        this.gridOptions = <GridOptions>{};
    }


    ngOnChanges(changes){
        console.log('changes in grid component');
        console.log(changes);
        if ((Object.keys(changes).indexOf('grid') > -1 && changes.grid.currentValue.data) ){
            console.log('data changes')
            this.buildGrid();
        }
    }

    buildGrid(){
        this.generateGridData(this.grid.data);

        // this.gridOptions.groupSuppressAutoColumn = true;
        // this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.groupUseEntireRow = false;
        // this.gridOptions.groupDefaultExpanded = 0;
        // this.gridOptions.groupHideGroupColumns = true;
        this.gridOptions.groupColumnDef = {
            cellRenderer: {
                renderer: 'group',
                // keyMap: { 21: 'ptf_1_21', 22: 'ptf_1_22' }
            },
            headerName: 'PTF_1_LB'
        };
        this.gridOptions.groupAggFunction = this.aggFunc;
    }
    getData() {
        console.log('getting data');
        this._zebulonService.execQuery().subscribe((res: any[]) => {
        // this._zebulonService.getData().subscribe((res: any[]) => {
            console.log('data return');
            console.log(res[0]);
            this.buildGrid();

        });
    }

    // aggregation function with weighted average for m_amt in comments
    private aggFunc (nodes){
            const agg = nodes.reduce((prev, curr) =>
            ({
                // m_amt: prev.m_amt + curr.data.m_amt*curr.data.m_qt,
                m_amt: prev.m_amt + curr.data.m_amt,
                m_qt: prev.m_qt + curr.data.m_qt
            })
            , ({ m_amt: 0, m_qt: 0 } )
            );
            // agg.m_amt /= agg.m_qt;
            return agg;
    }

    private generateGridData(obj: any[]) {
        const results = obj[0];
        const measures = obj[1][1];
        const dims = obj[2];

        console.log(results);
        console.log(measures);
        console.log(dims);

        this.generateColumnDefs(dims, measures);
        this.generateRowData(results);


    }

    private generateColumnDefs(dims: any[], measures: any[]) {
        var columnDefs = dims.map(dim =>
            ({ headerName: dim.lb_d[0], field: dim.lb_d[0]})    // we keep headerName and field the same at the moment for simplicity. I am not sure if it makes sense at all to have labels and codes in the grid and if it does how to implement it
        );
        var i = 0;
        for (const cDef of columnDefs){
            if (i+1 < columnDefs.length) {
                cDef['rowGroupIndex'] = i;
                i += 1;
            }
        }
        for (var mea of Object.keys(measures)){
            columnDefs.push(({ headerName: mea, field: mea }));
        }
        this.columnDefs = columnDefs;
    }

    private generateRowData(data: any[]){
        this.rowData = data;
    }

    // private createColumnDefs() {
    //     console.log('creating column defs');

        // var keys = Object.keys(this.rowData[0]);
        // this.columnDefs = keys.map((key: string) => ({ 'field': key, 'headerName': key }));
        // this.columnDefs = [
        //     { headerName: 'ptf_1_lb', field: 'ptf_1', rowGroupIndex: 0 },
        //     { headerName: 'cur_lb', field: 'cur' },
        //     { headerName: 'm_amt', field: 'm_amt' },
        //     { headerName: 'm_qt', field: 'm_qt'}
        // ];
        // this.columnDefs = [
        //     { headerName: 'ptf_1_lb', field: 'ptf_1', pinned: true },
        //     { headerName: 'cur_0_lb', groupId: 'cur_0', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_0' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_0' }] },
        //     { headerName: 'cur_1_lb', groupId: 'cur_1', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_1' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_1' }] },
        //     { headerName: 'cur_2_lb', groupId: 'cur_2', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_2' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_2' }] },
        //     { headerName: 'cur_3_lb', groupId: 'cur_3', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_3' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_3' }] },
        //     { headerName: 'cur_4_lb', groupId: 'cur_4', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_4' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_4' }] },
        //     { headerName: 'cur_5_lb', groupId: 'cur_5', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_5' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_5' }] },
        //     { headerName: 'cur_6_lb', groupId: 'cur_6', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_6' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_6' }] },
        //     { headerName: 'cur_7_lb', groupId: 'cur_7', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_7' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_7' }] },
        //     { headerName: 'cur_8_lb', groupId: 'cur_8', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_8' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_8' }] },
        //     { headerName: 'cur_9_lb', groupId: 'cur_9', children: [{ headerName: 'm_amt_lb', field: 'm_amt_cur_9' }, { headerName: 'm_qt_lb', field: 'm_qt_cur_9' }] }
        //     ];
        //     {headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        //         suppressMenu: true, pinned: true},
        //     {
        //         headerName: 'Employee',
        //         children: [
        //             {headerName: "Name", field: "name",
        //                 width: 150, pinned: true},
        //             {headerName: "Country", field: "country", width: 150,
        //                 cellRenderer: countryCellRenderer, pinned: true,
        //                 filterParams: {cellRenderer: countryCellRenderer, cellHeight: 20}},
        //         ]
        //     },
        //     {
        //         headerName: 'IT Skills',
        //         children: [
        //             {headerName: "Skills", width: 125, suppressSorting: true, cellRenderer: skillsCellRenderer, filter: SkillFilter},
        //             {headerName: "Proficiency", field: "proficiency", width: 120, cellRenderer: percentCellRenderer, filter: ProficiencyFilter},
        //         ]
        //     },
        //     {
        //         headerName: 'Contact',
        //         children: [
        //             {headerName: "Mobile", field: "mobile", width: 150, filter: 'text'},
        //             {headerName: "Land-line", field: "landline", width: 150, filter: 'text'},
        //             {headerName: "Address", field: "address", width: 500, filter: 'text'}
        //         ]
        //     }
        // ];
    // }

    private calculateRowCount() {
        if (this.gridOptions.api && this.rowData) {
            var model = this.gridOptions.api.getModel();
            var totalRows = this.rowData.length;
            var processedRows = model.getVirtualRowCount();
            this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    }

    private onModelUpdated() {
        console.log('onModelUpdated');
        // this.createColumnDefs()
        // this.calculateRowCount();
    }

    private onReady() {
        console.log('onReady');
        this.calculateRowCount();
    }

    private onCellClicked($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }

    private onCellDoubleClicked($event) {
        console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellContextMenu($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellFocused($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    private onRowSelected($event) {
        console.log('onRowSelected: ' + $event.node.data.name);
    }

    private onSelectionChanged() {
        console.log('selectionChanged');
    }

    private onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
    }

    private onAfterFilterChanged() {
        console.log('afterFilterChanged');
    }

    private onFilterModified() {
        console.log('onFilterModified');
    }

    private onBeforeSortChanged() {
        console.log('onBeforeSortChanged');
    }

    private onAfterSortChanged() {
        console.log('onAfterSortChanged');
    }

    private onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

    private onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.name);
    }

    private onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    private onColumnEvent($event) {
        console.log('onColumnEvent: ' + $event);
        if ($event.type === 'columnEverythingChanged') {
            // console.log('event !');
        }
        else {
            // console.log('small event !')
        }
    }
}