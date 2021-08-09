import { Routes } from '@angular/router';

export const thanhToanRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'payment',
        pathMatch: 'full'
      },
      {
        path: 'payment',
        // component:
      }, ]
  }
];
