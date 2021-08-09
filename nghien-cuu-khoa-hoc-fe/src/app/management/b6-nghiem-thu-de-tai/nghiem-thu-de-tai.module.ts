import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { nghiemThuDeTaiRoutes } from './nghiem-thu-de-tai.routing';
import { ListDeTaiNghiemThuComponent } from './list-de-tai-nghiem-thu/list-de-tai-nghiem-thu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListDiemThanhVienHoiDongComponent } from './list-diem-thanh-vien-hoi-dong/list-diem-thanh-vien-hoi-dong.component';
import { FormBangDiemComponent } from './form-bang-diem/form-bang-diem.component';
import { FormBienBanHoiDongComponent } from './form-bien-ban-hoi-dong/form-bien-ban-hoi-dong.component';
import { FormGiaiTrinhChinhSuaComponent } from './form-giai-trinh-chinh-sua/form-giai-trinh-chinh-sua.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(nghiemThuDeTaiRoutes),
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
export class NghiemThuDeTaiModule { }
