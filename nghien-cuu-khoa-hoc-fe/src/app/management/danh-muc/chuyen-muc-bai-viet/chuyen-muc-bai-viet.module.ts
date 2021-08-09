import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { chuyenMucBaiVietRoutes } from './chuyen-muc-bai-viet.routing';
import { FormChuyenMucBaiVietComponent } from './form-chuyen-muc-bai-viet/form-chuyen-muc-bai-viet.component';
import { ListChuyenMucBaiVietComponent } from './list-chuyen-muc-bai-viet/list-chuyen-muc-bai-viet.component';

@NgModule({
  declarations: [ListChuyenMucBaiVietComponent, FormChuyenMucBaiVietComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(chuyenMucBaiVietRoutes),
  ]
})
export class ChuyenMucBaiVietModule { }
