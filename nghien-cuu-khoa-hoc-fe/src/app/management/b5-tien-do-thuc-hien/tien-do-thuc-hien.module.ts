import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { tienDoThucHienRoutes } from './tien-do-thuc-hien.routing';
import { ListDeTaiComponent } from './list-de-tai/list-de-tai.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListBaoCaoTienDoComponent } from './list-bao-cao-tien-do/list-bao-cao-tien-do.component';
import { FormBaoCaoTienDoComponent } from './form-bao-cao-tien-do/form-bao-cao-tien-do.component';
import { ListBienBanKiemTraComponent } from './list-bien-ban-kiem-tra/list-bien-ban-kiem-tra.component';
import { ListBoSungThuyetMinhComponent } from './list-bo-sung-thuyet-minh/list-bo-sung-thuyet-minh.component';
import { ListDeTaiXinHuyComponent } from './list-de-tai-xin-huy/list-de-tai-xin-huy.component';
import { FormXemDeNghiHuyComponent } from './form-xem-de-nghi-huy/form-xem-de-nghi-huy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(tienDoThucHienRoutes),
    SharedModule,
  ],
  declarations: [
    ListDeTaiComponent,
    ListBaoCaoTienDoComponent,
    FormBaoCaoTienDoComponent,
    ListBienBanKiemTraComponent,
    ListBoSungThuyetMinhComponent,
    ListDeTaiXinHuyComponent,
    FormXemDeNghiHuyComponent,
  ]
})
export class TienDoThucHienModule { }
