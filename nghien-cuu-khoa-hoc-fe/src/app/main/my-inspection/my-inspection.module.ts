import { FormMyInspectionComponent } from './form-my-inspection/form-my-inspection.component';
import { ListDeTaiMyInspectionComponent } from './list-de-tai-my-inspection/list-de-tai-my-inspection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { myInspectionModuleRoutes } from './my-inspection.routing';
import { FormBienBanHoiDongComponent } from './form-bien-ban-hoi-dong/form-bien-ban-hoi-dong.component';
import { FormBanDiemComponent } from './form-ban-diem/form-ban-diem.component';
import { FormNhanXetPhanBienComponent } from './form-nhan-xet-phan-bien/form-nhan-xet-phan-bien.component';

@NgModule({
  declarations: [
    ListDeTaiMyInspectionComponent,
    FormMyInspectionComponent,
    FormBienBanHoiDongComponent,
    FormBanDiemComponent,
    FormNhanXetPhanBienComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Routes
    RouterModule.forChild(myInspectionModuleRoutes),
  ]
})
export class MyInspectionModule { }
