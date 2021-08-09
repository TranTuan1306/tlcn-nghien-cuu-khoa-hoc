import { Routes } from '@angular/router';
import { ListDeTaiXuatFileComponent } from './list-de-tai-xuat-file/list-de-tai-xuat-file.component';

export const xuatFileRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDeTaiXuatFileComponent
      },
    ]
  }
];
