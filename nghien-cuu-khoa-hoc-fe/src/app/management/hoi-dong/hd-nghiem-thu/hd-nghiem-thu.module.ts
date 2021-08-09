import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { hoiDongNghiemThuRoutes } from './hd-nghiem-thu.routing';
import { ListHdNghiemThuComponent } from './list-hd-nghiem-thu/list-hd-nghiem-thu.component';
import { FormHdNghiemThuComponent } from './form-hd-nghiem-thu/form-hd-nghiem-thu.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(hoiDongNghiemThuRoutes)
  ],
  declarations: [ListHdNghiemThuComponent, FormHdNghiemThuComponent]
})
export class HoiDongNghiemThuModule { }
