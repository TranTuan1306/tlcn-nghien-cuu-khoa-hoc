import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { hocViRoutes } from './hoc-vi.routing';
import { ListHocViComponent } from './list-hoc-vi/list-hoc-vi.component';
import { FormHocViComponent } from './form-hoc-vi/form-hoc-vi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListHocViComponent,
    FormHocViComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Re-use module here, ex: FormsModule, ReactiveFormsModule,

    // Routes
    RouterModule.forChild(hocViRoutes),
  ]
})
export class HocViModule { }
