import { HomepageComponent } from './homepage/homepage.component';
import { Routes } from '@angular/router';
import { ListPostsComponent } from './list-posts/list-posts.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    // children: [
    //   {
    //     path: 'posts/:id',
    //     component: ListPostsComponent
    //   },
    //   {
    //     path: 'posts/:id/:idPost',
    //     component: ListPostsComponent
    //   },
    // ]
  },
  {
    path: 'posts/:id',
    component: ListPostsComponent
  },
  {
    path: 'posts/:id/:idPost',
    component: ListPostsComponent
  },
];
