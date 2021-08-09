import { PostTplWideComponent } from './post-tpl-wide/post-tpl-wide.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostTplComponent } from './post-tpl/post-tpl.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { homeRoutes } from './home.routing';
import { CardTemplateComponent } from './card-template/card-template.component';

@NgModule({
  declarations: [
    PostTplComponent,
    HomepageComponent,
    ListPostsComponent,
    PostTplWideComponent,
    CardTemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Routes
    RouterModule.forChild(homeRoutes),
  ]
})
export class HomeModule { }
