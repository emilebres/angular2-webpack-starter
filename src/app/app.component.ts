import { Component } from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {Devtools} from '@ngrx/devtools';

import { GridComponent } from './components/grid/grid.component';
import { QueryConfigurationComponent } from './components/query-configuration/query-configuration.component';
// import { DataService }     from './data.service';
import { StoreService }     from './services/store.service';

// import {HTTP_PROVIDERS} from 'angular2/http'
// import {$WebSocket} from 'angular2-websocket/angular2-websocket'



@Component({
  selector: 'app',
  template: require('./app.component.html'),
  directives: [QueryConfigurationComponent, GridComponent, Devtools],
})
export class AppComponent {
  title = 'Zebulon interface';
  private showGrid: boolean = false;
  private gridData: any;
  private grid: Observable<any>;

  constructor(private storeService: StoreService) {
    this.grid = storeService.grid;
  }

}