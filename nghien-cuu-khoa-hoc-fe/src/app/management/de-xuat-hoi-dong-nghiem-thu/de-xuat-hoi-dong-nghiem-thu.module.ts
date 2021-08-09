import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { deXuatHoiDongNghiemThuRoutes } from './de-xuat-hoi-dong-nghiem-thu.routing';
import { ListDeXuatHoiDongNghiemThuComponent } from './list-de-xuat-hoi-dong-nghiem-thu/list-de-xuat-hoi-dong-nghiem-thu.component';
import { FormDeXuatHoiDongNghiemThuComponent } from './form-de-xuat-hoi-dong-nghiem-thu/form-de-xuat-hoi-dong-nghiem-thu.component';
import { BieuMauModule } from 'src/app/shared/bieu-mau/bieu-mau.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BieuMauModule,
    RouterModule.forChild(deXuatHoiDongNghiemThuRoutes)
  ],
  declarations: [
    ListDeXuatHoiDongNghiemThuComponent,
    FormDeXuatHoiDongNghiemThuComponent
  ],
})
export class DeXuatHoiDongNghiemThuRoutesModule { }
