import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormLinhVucNghienCuuComponent } from './form-linh-vuc-nghien-cuu/form-linh-vuc-nghien-cuu.component';
import { ListLinhVucNghienCuuComponent } from './list-linh-vuc-nghien-cuu/list-linh-vuc-nghien-cuu.component';
import { linhVucNghienCuuRoutes } from './linh-vuc-nghien-cuu.routing';


@NgModule({
  declarations: [ListLinhVucNghienCuuComponent, FormLinhVucNghienCuuComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(linhVucNghienCuuRoutes),
    SharedModule
  ]
})
export class LinhVucNghienCuuModule { }
