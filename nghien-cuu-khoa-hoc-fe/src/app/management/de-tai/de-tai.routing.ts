import { Routes } from '@angular/router';
import { ListDeTaiDaDuyetComponent } from './list-de-tai-da-duyet/list-de-tai-da-duyet.component';
import { ListDeTaiComponent } from './list-de-tai-dang-ky/list-de-tai.component';
import { ListDeTaiXinHuyComponent } from './list-de-tai-xin-huy/list-de-tai-xin-huy.component';

export const deTaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'proposed',
        pathMatch: 'full'
      },
      {
        path: 'proposed',
        component: ListDeTaiComponent
      },
      {
        path: 'approved',
        component: ListDeTaiDaDuyetComponent
      },
      {
        path: 'cancel',
        component: ListDeTaiXinHuyComponent
      }
    ]
  }
];
