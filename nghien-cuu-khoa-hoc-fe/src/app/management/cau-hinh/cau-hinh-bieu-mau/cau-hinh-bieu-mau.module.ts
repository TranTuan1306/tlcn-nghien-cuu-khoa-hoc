import { FormCauHinhBieuMauComponent } from './form-cau-hinh-bieu-mau/form-cau-hinh-bieu-mau.component';
import { ListCauHinhBieuMauComponent } from './list-cau-hinh-bieu-mau/list-cau-hinh-bieu-mau.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { cauHinhBieuMauRoutes } from './cau-hinh-bieu-mau.routing';

@NgModule({
  declarations: [ListCauHinhBieuMauComponent, FormCauHinhBieuMauComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(cauHinhBieuMauRoutes),
    SharedModule
  ]
})
export class CauHinhGuiMailModule { }
