import { ListDiemThanhVienHoiDongComponent }
  from './list-diem-thanh-vien-hoi-dong/list-diem-thanh-vien-hoi-dong.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { tdvViewNghiemThuRoutes } from './tdv-view-nghiem-thu.routing';
import { ListDeTaiNghiemThuComponent } from './list-de-tai-nghiem-thu/list-de-tai-nghiem-thu.component';
import { FormBangDiemComponent } from './form-bang-diem/form-bang-diem.component';
import { FormBienBanHoiDongComponent } from './form-bien-ban-hoi-dong/form-bien-ban-hoi-dong.component';
import { FormGiaiTrinhChinhSuaComponent } from './form-giai-trinh-chinh-sua/form-giai-trinh-chinh-sua.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(tdvViewNghiemThuRoutes),
    SharedModule,
  ],
  declarations: [
    ListDeTaiNghiemThuComponent,
    ListDiemThanhVienHoiDongComponent,
    FormBangDiemComponent,
    FormBienBanHoiDongComponent,
    FormGiaiTrinhChinhSuaComponent
  ],
})
export class TDVViewNghiemThuModule { }
