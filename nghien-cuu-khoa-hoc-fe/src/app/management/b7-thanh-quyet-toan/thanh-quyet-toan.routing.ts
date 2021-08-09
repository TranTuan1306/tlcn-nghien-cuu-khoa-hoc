import { Routes } from '@angular/router';
import { ListDeTaiThanhLyHopDongComponent } from './list-de-tai-thanh-ly-hop-dong/list-de-tai-thanh-ly-hop-dong.component';

export const thanhQuyetToanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListDeTaiThanhLyHopDongComponent
      },
    ]
  }
];
