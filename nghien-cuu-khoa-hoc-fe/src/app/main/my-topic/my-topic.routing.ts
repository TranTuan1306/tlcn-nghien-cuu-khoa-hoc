import { ListMyTopicComponent } from './list-my-topic/list-my-topic.component';
import { Routes } from '@angular/router';

export const myTopicRoutes: Routes = [
  {
    path: '',
    component: ListMyTopicComponent,
  },
  // {
  //   path: ':id',
  //   component: FormMyTopicComponent
  // }
];
