import { Routes } from '@angular/router';
import { ListDeTaiComponent } from './list-de-tai/list-de-tai.component';

export const tienDoThucHienRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDeTaiComponent
      },
    ]
  },
  {
    path: 'cancel-threads/:id',
    component: ListDeTaiComponent
  }
];
