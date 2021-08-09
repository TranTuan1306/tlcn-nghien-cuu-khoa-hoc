import { Routes } from '@angular/router';
import { ListHocViComponent } from './list-hoc-vi/list-hoc-vi.component';

export const hocViRoutes: Routes = [
  {
    path: '',
    component: ListHocViComponent
    // children: [
    //     {
    //         path: '',
    //         redirectTo: 'list',
    //         pathMatch: 'full'
    //     },
    //     {
    //         path: 'list',
    //         component: YourComponentName
    //     }
    // ]
  }
];
