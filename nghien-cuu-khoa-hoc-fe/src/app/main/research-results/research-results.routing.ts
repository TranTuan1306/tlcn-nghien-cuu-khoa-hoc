import { FormResearchResultsComponent } from './form-research-results/form-research-results.component';
import { ListResearchResultsComponent } from './list-research-results/list-research-results.component';
import { Routes } from '@angular/router';

export const researchResulsRoutes: Routes = [
  {
    path: '',
    component: ListResearchResultsComponent,
  },
  {
    path: ':id',
    component: FormResearchResultsComponent
  },
  // {
  //   path: 'requests-cancel-topic/:id',
  //   component: ListHuyDeTaiComponent,
  // },
];
