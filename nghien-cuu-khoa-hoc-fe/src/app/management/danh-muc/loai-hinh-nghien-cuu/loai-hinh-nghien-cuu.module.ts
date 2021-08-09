import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormLoaiHinhNghienCuuComponent } from './form-loai-hinh-nghien-cuu/form-loai-hinh-nghien-cuu.component';
import { ListLoaiHinhNghienCuuComponent } from './list-loai-hinh-nghien-cuu/list-loai-hinh-nghien-cuu.component';
import { loaiHinhNghienCuuRoutes } from './loai-hinh-nghien-cuu.routing';

@NgModule({
  declarations: [ListLoaiHinhNghienCuuComponent, FormLoaiHinhNghienCuuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loaiHinhNghienCuuRoutes),
    SharedModule
  ]
})
export class LoaiHinhNghienCuuModule { }
