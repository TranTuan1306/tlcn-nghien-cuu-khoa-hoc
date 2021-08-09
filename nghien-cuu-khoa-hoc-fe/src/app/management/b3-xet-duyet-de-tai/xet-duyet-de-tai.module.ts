import { Form02bsDonViPhoiHopManagementComponent }
  from './form02-thuyet-minh-de-tai/form02bs-don-vi-phoi-hop/form02bs-don-vi-phoi-hop.component';
import { Form02bsPhuLucKinhPhiManagementComponent }
  from './form02-thuyet-minh-de-tai/form02bs-phu-luc-kinh-phi/form02bs-phu-luc-kinh-phi.component';
import { Form02bsSanPhamManagementComponent } from './form02-thuyet-minh-de-tai/form02bs-san-pham/form02bs-san-pham.component';
import { Form02bsThanhVienThamGiaManagementComponent }
  from './form02-thuyet-minh-de-tai/form02bs-thanh-vien-tham-gia/form02bs-thanh-vien-tham-gia.component';
import { Form02bsTienDoManagementComponent } from './form02-thuyet-minh-de-tai/form02bs-tien-do/form02bs-tien-do.component';
import { Form02ThuyetMinhDeTaiManagementComponent } from './form02-thuyet-minh-de-tai/form02-thuyet-minh-de-tai.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { xetDuyetDeTaiRoutes } from './xet-duyet-de-tai.routing';
import { ListDeTaiDangKyComponent } from './list-de-tai-dang-ky/list-de-tai-dang-ky.component';
import { FormNhapDiemHoiDongComponent } from './form-nhap-diem-hoi-dong/form-nhap-diem-hoi-dong.component';
import { FormNhapBienBanHoiDongComponent } from './form-nhap-bien-ban-hoi-dong/form-nhap-bien-ban-hoi-dong.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormKiemDuyetDeTaiComponent } from './form-kiem-duyet-de-tai/form-kiem-duyet-de-tai.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(xetDuyetDeTaiRoutes),
    SharedModule
  ],
  declarations: [
    ListDeTaiDangKyComponent,
    FormNhapDiemHoiDongComponent,
    FormNhapBienBanHoiDongComponent,
    Form02ThuyetMinhDeTaiManagementComponent,
    Form02bsTienDoManagementComponent,
    Form02bsThanhVienThamGiaManagementComponent,
    Form02bsSanPhamManagementComponent,
    Form02bsPhuLucKinhPhiManagementComponent,
    Form02bsDonViPhoiHopManagementComponent,
    FormKiemDuyetDeTaiComponent
  ],
})
export class XetDuyetDeTaiModule { }
