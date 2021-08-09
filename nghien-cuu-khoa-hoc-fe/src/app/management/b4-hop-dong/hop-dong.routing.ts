import { Routes } from '@angular/router';
import { ListDeTaiComponent } from './list-de-tai/list-de-tai.component';

export const hopDongRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDeTaiComponent
      }
    ]
  }
];
