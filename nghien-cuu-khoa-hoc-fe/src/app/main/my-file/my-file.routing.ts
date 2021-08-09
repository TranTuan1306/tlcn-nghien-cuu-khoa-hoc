import { FormFileDeTaiComponent } from './form-file-de-tai/form-file-de-tai.component';
import { ListDeTaiMyFileComponent } from './list-de-tai-my-file/list-de-tai-my-file.component';
import { Routes } from '@angular/router';

export const myFileRoutes: Routes = [
  {
    path: '',
    component: ListDeTaiMyFileComponent,
  },
  {
    path: ':id',
    component: FormFileDeTaiComponent
  }
];
