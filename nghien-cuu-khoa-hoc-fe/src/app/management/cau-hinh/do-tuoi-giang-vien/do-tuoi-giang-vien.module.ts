import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { doTuoiGiangVienRoutes } from './do-tuoi-giang-vien.routing';
import { ListDoTuoiGiangVienComponent } from './list-do-tuoi-giang-vien/list-do-tuoi-giang-vien.component';
import { FormDoTuoiGiangVienComponent } from './form-do-tuoi-giang-vien/form-do-tuoi-giang-vien.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(doTuoiGiangVienRoutes)
  ],
  declarations: [
    ListDoTuoiGiangVienComponent,
    FormDoTuoiGiangVienComponent
  ]
})
export class DoTuoiGiangVienModule { }
