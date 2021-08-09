import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormNoiDungEmailComponent } from './form-noi-dung-email/form-noi-dung-email.component';
import { ListNoiDungEmailComponent } from './list-noi-dung-email/list-noi-dung-email.component';
import { noiDungEmailRoutes } from './noi-dung-email.routing';

@NgModule({
  declarations: [ListNoiDungEmailComponent, FormNoiDungEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(noiDungEmailRoutes),
    SharedModule
  ]
})
export class NoiDungEmailModule { }
