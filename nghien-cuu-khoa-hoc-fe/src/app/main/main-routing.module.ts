import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main/main-layout/main-layout.component';
import { DocsFormsComponent } from './docs-forms/docs-forms.component';
import { HomeComponent } from './home/home.component';
import { MyFileComponent } from './my-file/my-file.component';
import { MyInspectionComponent } from './my-inspection/my-inspection.component';
import { MyProgressComponent } from './my-progress/my-progress.component';
import { MyTopicComponent } from './my-topic/my-topic.component';
import { NewsComponent } from './news/news.component';
import { ResearchResultsComponent } from './research-results/research-results.component';
import { WorkComponent } from './work/work.component';
import { AcceptanceCouncilSuggestionComponent } from './acceptance-council-suggestion/acceptance-council-suggestion.component';
import { ReviewTheTopicComponent } from './review-the-topic/review-the-topic.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'work',
        component: WorkComponent,
        children: [
          {
            path: '',
            redirectTo: 'my-topic',
            pathMatch: 'full'
          },
          {
            path: 'my-topic',
            component: MyTopicComponent
          },
          {
            path: 'my-progress',
            component: MyProgressComponent
          },
          {
            path: 'inspection',
            component: MyInspectionComponent
          },
          {
            path: 'research-results',
            component: ResearchResultsComponent
          },
          {
            path: 'my-file',
            component: MyFileComponent
          },
          {
            path: 'review-the-topic',
            component: ReviewTheTopicComponent
          },
        ]
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'docs-forms',
        component: DocsFormsComponent
      },
      {
        path: 'acceptance-council-suggestion',
        component: AcceptanceCouncilSuggestionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
