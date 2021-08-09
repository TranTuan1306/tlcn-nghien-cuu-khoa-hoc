import { FormMyInspectionComponent } from './form-my-inspection/form-my-inspection.component';
import { Routes } from '@angular/router';
import { ListDeTaiMyInspectionComponent } from './list-de-tai-my-inspection/list-de-tai-my-inspection.component';

export const myInspectionModuleRoutes: Routes = [
  {
    path: '',
    component: ListDeTaiMyInspectionComponent
  },
  {
    path: ':id',
    component: FormMyInspectionComponent
  }
];
