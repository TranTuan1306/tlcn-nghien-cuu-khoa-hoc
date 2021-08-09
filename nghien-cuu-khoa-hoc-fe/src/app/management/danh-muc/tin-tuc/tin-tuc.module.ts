import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormTinTucComponent } from './form-tin-tuc/form-tin-tuc.component';
import { ListTinTucComponent } from './list-tin-tuc/list-tin-tuc.component';
import { tinTucRoutes } from './tin-tuc.routing';

@NgModule({
  declarations: [ListTinTucComponent, FormTinTucComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(tinTucRoutes),
  ]
})
export class TinTucModule { }

