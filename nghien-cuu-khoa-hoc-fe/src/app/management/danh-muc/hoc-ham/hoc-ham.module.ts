import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { hocHamRoutes } from './hoc-ham.routing';
import { ListHocHamComponent } from './list-hoc-ham/list-hoc-ham.component';
import { FormHocHamComponent } from './form-hoc-ham/form-hoc-ham.component';


@NgModule({
  declarations: [ListHocHamComponent, FormHocHamComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(hocHamRoutes),
  ]
})
export class HocHamModule { }
