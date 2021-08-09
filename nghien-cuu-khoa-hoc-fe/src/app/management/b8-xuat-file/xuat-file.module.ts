import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListDeTaiXuatFileComponent } from './list-de-tai-xuat-file/list-de-tai-xuat-file.component';
import { xuatFileRoutes } from './xuat-file.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(xuatFileRoutes),
    SharedModule
  ],
  declarations: [ListDeTaiXuatFileComponent],
})
export class XuatFileModule { }
