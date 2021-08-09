import { ListHuyDeTaiComponent } from './list-huy-de-tai/list-huy-de-tai.component';
import { FormMyProgressComponent } from './form-my-progress/form-my-progress.component';
import { ListMyProgressComponent } from './list-my-progress/list-my-progress.component';
import { Routes } from '@angular/router';

export const myProgressRoutes: Routes = [
  {
    path: '',
    component: ListMyProgressComponent,
  },
  {
    path: 'progress-reports/:id',
    component: FormMyProgressComponent
  },
  {
    path: 'requests-cancel-topic/:id',
    component: ListHuyDeTaiComponent,
  },
];
