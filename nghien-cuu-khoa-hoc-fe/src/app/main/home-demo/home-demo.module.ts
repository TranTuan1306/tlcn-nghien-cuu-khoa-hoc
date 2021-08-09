import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { homeDemoRoutes } from './home-demo.routing';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ListPostsComponent } from './list-posts/list-posts.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchPageComponent,
    ListPostsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Routes
    RouterModule.forChild(homeDemoRoutes),
  ]
})
export class HomeDemoModule { }
