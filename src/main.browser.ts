import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app/app.component';

import { ZebulonService }     from './app/services/zebulon.service';
import { StoreService }     from './app/services/store.service';
import {provideStore} from '@ngrx/store';
import { instrumentStore } from '@ngrx/devtools';

import {APP_REDUCERS} from './app/reducers/reducers';
import {APP_ACTIONS} from './app/actions/actions';

bootstrap(AppComponent,[
  ZebulonService,
  StoreService,
  APP_ACTIONS,
  provideStore(APP_REDUCERS),
  instrumentStore()
   ])
// .catch(err => console.error(err));
