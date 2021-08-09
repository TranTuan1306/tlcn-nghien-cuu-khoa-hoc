import { Routes } from '@angular/router';

export const hoiDongRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'censor-councils',
        pathMatch: 'full'
      },
      {
        path: 'censor',
        loadChildren: () => import('./hd-xet-duyet/hd-xet-duyet.module').then(m => m.HoiDongXetDuyetModule)
      },
      {
        path: 'acceptance',
        loadChildren: () => import('./hd-nghiem-thu/hd-nghiem-thu.module').then(m => m.HoiDongNghiemThuModule)
      },
    ]
  }
];
