import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainLayoutModule } from '../layouts/main/main-layout.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkComponent } from './work/work.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { DocsFormsComponent } from './docs-forms/docs-forms.component';
import { AcceptanceCouncilSuggestionComponent } from './acceptance-council-suggestion/acceptance-council-suggestion.component';
import { FormSuggestionComponent } from './acceptance-council-suggestion/form-suggestion/form-suggestion.component';
import { ReviewTheTopicComponent } from './review-the-topic/review-the-topic.component';
@NgModule({
  declarations: [
    SidebarComponent,
    WorkComponent,
    NewsComponent,
    NewsDetailsComponent,
    DocsFormsComponent,
    AcceptanceCouncilSuggestionComponent,
    FormSuggestionComponent,
    ReviewTheTopicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MainRoutingModule,
    MainLayoutModule,
  ]
})
export class MainModule { }
