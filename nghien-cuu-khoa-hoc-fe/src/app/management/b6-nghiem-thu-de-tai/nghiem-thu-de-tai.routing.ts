import { Routes } from '@angular/router';
import { ListDeTaiNghiemThuComponent } from './list-de-tai-nghiem-thu/list-de-tai-nghiem-thu.component';

export const nghiemThuDeTaiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDeTaiNghiemThuComponent
      },
    ]
  }
];

