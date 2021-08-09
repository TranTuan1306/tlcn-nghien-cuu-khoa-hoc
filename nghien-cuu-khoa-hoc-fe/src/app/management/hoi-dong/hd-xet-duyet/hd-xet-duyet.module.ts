import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { hoiDongXetDuyetRoutes } from './hd-xet-duyet.routing';
import { ListHdXetDuyetComponent } from './list-hd-xet-duyet/list-hd-xet-duyet.component';
import { FormHdXetDuyetComponent } from './form-hd-xet-duyet/form-hd-xet-duyet.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBienBanHoiDongXetDuyetComponent } from './form-bien-ban-hoi-dong-xet-duyet/form-bien-ban-hoi-dong-xet-duyet.component';
import { FormThanhVienHoiDongComponent } from './form-thanh-vien-hoi-dong/form-thanh-vien-hoi-dong.component';
import { FormDeTaiHoiDongComponent } from './form-de-tai-hoi-dong/form-de-tai-hoi-dong.component';
import { ListBienBanHoiDongComponent } from './list-bien-ban-hoi-dong/list-bien-ban-hoi-dong.component';
import { FormPhieuDiemHoiDongXetDuyetComponent } from './form-phieu-diem-hoi-dong-xet-duyet/form-phieu-diem-hoi-dong-xet-duyet.component';
import { ListPhieuDiemHoiDongXetDuyetComponent } from './list-phieu-diem-hoi-dong-xet-duyet/list-phieu-diem-hoi-dong-xet-duyet.component';
import { FormUploadBienBanHoiDongComponent } from './form-upload-bien-ban-hoi-dong/form-upload-bien-ban-hoi-dong.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(hoiDongXetDuyetRoutes)
  ],
  declarations: [
    ListHdXetDuyetComponent,
    FormHdXetDuyetComponent,
    FormBienBanHoiDongXetDuyetComponent,
    FormThanhVienHoiDongComponent,
    FormDeTaiHoiDongComponent,
    ListBienBanHoiDongComponent,
    FormPhieuDiemHoiDongXetDuyetComponent,
    ListPhieuDiemHoiDongXetDuyetComponent,
    FormUploadBienBanHoiDongComponent
  ]
})
export class HoiDongXetDuyetModule { }
