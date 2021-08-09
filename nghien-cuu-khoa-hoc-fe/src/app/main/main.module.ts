import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MainLayoutModule } from '../layouts/main/main-layout.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkComponent } from './work/work.component';
import { MyTopicComponent } from './my-topic/my-topic.component';
import { MyProgressComponent } from './my-progress/my-progress.component';
import { MyInspectionComponent } from './my-inspection/my-inspection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BieuMauModule } from '../shared/bieu-mau/bieu-mau.module';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { ResearchResultsComponent } from './research-results/research-results.component';
import { PostTplComponent } from './home/post-tpl/post-tpl.component';
import { PostTplWideComponent } from './home/post-tpl-wide/post-tpl-wide.component';
import { DocsFormsComponent } from './docs-forms/docs-forms.component';
import { MyFileComponent } from './my-file/my-file.component';
import { AcceptanceCouncilSuggestionComponent } from './acceptance-council-suggestion/acceptance-council-suggestion.component';
import { FormSuggestionComponent } from './acceptance-council-suggestion/form-suggestion/form-suggestion.component';
import { ReviewTheTopicComponent } from './review-the-topic/review-the-topic.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    WorkComponent,
    MyTopicComponent,
    MyProgressComponent,
    MyInspectionComponent,
    NewsComponent,
    NewsDetailsComponent,
    ResearchResultsComponent,
    PostTplComponent,
    PostTplWideComponent,
    DocsFormsComponent,
    MyFileComponent,
    AcceptanceCouncilSuggestionComponent,
    FormSuggestionComponent,
    ReviewTheTopicComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MainRoutingModule,
    MainLayoutModule,
    BieuMauModule,
  ]
})
export class MainModule { }
