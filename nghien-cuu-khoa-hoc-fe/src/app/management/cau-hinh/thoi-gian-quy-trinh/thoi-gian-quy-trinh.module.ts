import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { thoiGianDangKyRoutes as ThoiGianQuyTrinhRoutes } from './thoi-gian-quy-trinh.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListThoiGianQuyTrinhComponent } from './list-thoi-gian-quy-trinh/list-thoi-gian-quy-trinh.component';
import { FormThoiGianQuyTrinhComponent } from './form-thoi-gian-quy-trinh/form-thoi-gian-quy-trinh.component';

@NgModule({
  declarations: [
    ListThoiGianQuyTrinhComponent,
    FormThoiGianQuyTrinhComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ThoiGianQuyTrinhRoutes),
    SharedModule
  ]
})
export class ThoiGianQuyTrinhModule { }
