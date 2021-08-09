import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { deXuatHoiDongNghiemThuRoutes } from './thay-doi-thoi-gian-quy-trinh-de-tai.routing';
import { BieuMauModule } from 'src/app/shared/bieu-mau/bieu-mau.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormChangeTimelineProcessComponent } from './form-change-timeline-process/form-change-timeline-process.component';
import { ListDeTaiChangeTiemlineComponent } from './list-de-tai-change-tiemline/list-de-tai-change-tiemline.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BieuMauModule,
    RouterModule.forChild(deXuatHoiDongNghiemThuRoutes)
  ],
  declarations: [FormChangeTimelineProcessComponent, ListDeTaiChangeTiemlineComponent],
})
export class DeXuatHoiDongNghiemThuRoutesModule { }
