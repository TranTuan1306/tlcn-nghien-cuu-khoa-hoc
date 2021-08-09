import { FormMyTopicComponent } from './form-my-topic/form-my-topic.component';
import { ListTopicProposalAndExplanationComponent }
  from './list-topic-proposal-and-explanation/list-topic-proposal-and-explanation.component';

import { Routes } from '@angular/router';

export const proposalAndExplanationRoutes: Routes = [
  {
    path: '',
    component: ListTopicProposalAndExplanationComponent,
  },
  {
    path: ':id',
    component: FormMyTopicComponent
  },
];
