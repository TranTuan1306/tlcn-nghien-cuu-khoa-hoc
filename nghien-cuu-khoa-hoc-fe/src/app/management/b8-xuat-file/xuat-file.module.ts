import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListDeTaiXuatFileComponent } from './list-de-tai-xuat-file/list-de-tai-xuat-file.component';
import { xuatFileRoutes } from './xuat-file.routing';
import { ListFileOfTopicComponent } from './list-file-of-topic/list-file-of-topic.component';
import { ListFileHoiDongKiemDuyetComponent } from './list-file-hoi-dong-kiem-duyet/list-file-hoi-dong-kiem-duyet.component';
import { ListFileHoiDongNghiemThuComponent } from './list-file-hoi-dong-nghiem-thu/list-file-hoi-dong-nghiem-thu.component';
import { LichSuFileComponent } from './lich-su-file/lich-su-file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(xuatFileRoutes),
    SharedModule
  ],
  declarations: [
    ListDeTaiXuatFileComponent,
    ListFileOfTopicComponent,
    ListFileHoiDongKiemDuyetComponent,
    ListFileHoiDongNghiemThuComponent,
    LichSuFileComponent
  ],
})
export class XuatFileModule { }
