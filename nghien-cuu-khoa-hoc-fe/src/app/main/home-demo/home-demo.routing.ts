import { SearchPageComponent } from './search-page/search-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Routes } from '@angular/router';
import { ListPostsComponent } from './list-posts/list-posts.component';

export const homeDemoRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
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
