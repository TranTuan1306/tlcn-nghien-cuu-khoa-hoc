import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { baiVietRoutes } from './bai-viet-theo-chuyen-muc.routing';
import { FormBaiVietComponent } from './form-bai-viet/form-bai-viet.component';
import { ListBaiVietComponent } from './list-bai-viet/list-bai-viet.component';

@NgModule({
  declarations: [ListBaiVietComponent, FormBaiVietComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(baiVietRoutes),
  ]
})
export class BaiVietModule { }
