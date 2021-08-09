import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { loaiKinhPhiRoutes } from './loai-kinh-phi.routing';
import { ListLoaiKinhPhiComponent } from './list-loai-kinh-phi/list-loai-kinh-phi.component';
import { FormLoaiKinhPhiComponent } from './form-loai-kinh-phi/form-loai-kinh-phi.component';

@NgModule({
  declarations: [ListLoaiKinhPhiComponent, FormLoaiKinhPhiComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(loaiKinhPhiRoutes),
  ]
})
export class LoaiKinhPhiModule { }
