import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main/main-layout/main-layout.component';
import { DocsFormsComponent } from './docs-forms/docs-forms.component';
import { NewsComponent } from './news/news.component';
import { WorkComponent } from './work/work.component';
import { AcceptanceCouncilSuggestionComponent } from './acceptance-council-suggestion/acceptance-council-suggestion.component';
import { MasterGuard } from '../core/guards/master.guard';
import { AuthorGuard } from '../core/guards/author.guard';
import { UrlConstant } from '../core/constants/url.constant';
// import { AdminGuard } from '../core/guards/admin.guard';
// import { UnitLeaderGuard } from '../core/guards/unitLeader.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home-demo/home-demo.module').then(m => m.HomeDemoModule)
      },
      {
        path: 'work',
        component: WorkComponent,
        canActivate: [MasterGuard],
        data: {
          guards: [AuthorGuard],
          guardsRelation: 'OR',
          fallbackUrl: UrlConstant.ROUTE.MAIN.HOME
        },
        children: [
          {
            path: '',
            redirectTo: 'my-topic',
            pathMatch: 'full'
          },
          {
            path: 'my-topic',
            loadChildren: () => import('./my-topic/my-topic.module').then(m => m.MyTopicModule),
          },
          {
            path: 'proposal-and-explanation',
            loadChildren: () => import('./proposal-and-explanation/proposal-and-explanation.module')
              .then(m => m.ProposalAndExplanationRoutesModule)
          },
          {
            path: 'additional-explanation',
            loadChildren: () => import('./additional-explanation/additional-explanation.module')
              .then(m => m.AdditionalExplanationModule),
          },
          {
            path: 'update-code-topic',
            loadChildren: () => import('./update-code-topic/update-code-topic.module')
              .then(m => m.UpdateCodeTopicModule),
          },
          {
            path: 'my-progress',
            loadChildren: () => import('./my-progress/my-progress.module').then(m => m.MyProgressModule),
          },
          {
            path: 'inspection',
            loadChildren: () => import('./my-inspection/my-inspection.module').then(m => m.MyInspectionModule),
          },
          {
            path: 'research-results',
            loadChildren: () => import('./research-results/research-results.module').then(m => m.ResearchResultsModule)
          },
          {
            path: 'my-file',
            loadChildren: () => import('./my-file/my-file.module').then(m => m.MyFileModule)
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
      {
        path: 'home-demo',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
