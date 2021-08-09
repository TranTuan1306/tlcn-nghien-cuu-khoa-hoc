import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { xetDuyetDeTaiRoutes } from './xet-duyet-de-tai.routing';
import { ListDeTaiDangKyComponent } from './list-de-tai-dang-ky/list-de-tai-dang-ky.component';
import { FormNhapDiemHoiDongComponent } from './form-nhap-diem-hoi-dong/form-nhap-diem-hoi-dong.component';
import { FormNhapBienBanHoiDongComponent } from './form-nhap-bien-ban-hoi-dong/form-nhap-bien-ban-hoi-dong.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BieuMauModule } from 'src/app/shared/bieu-mau/bieu-mau.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(xetDuyetDeTaiRoutes),
    SharedModule,
    BieuMauModule
  ],
  declarations: [ListDeTaiDangKyComponent, FormNhapDiemHoiDongComponent, FormNhapBienBanHoiDongComponent],
})
export class XetDuyetDeTaiModule { }
