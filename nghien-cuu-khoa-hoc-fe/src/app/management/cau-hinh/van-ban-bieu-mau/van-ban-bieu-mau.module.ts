import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormVanBanBieuMauComponent } from './form-van-ban-bieu-mau/form-van-ban-bieu-mau.component';
import { ListVanBanBieuMauComponent } from './list-van-ban-bieu-mau/list-van-ban-bieu-mau.component';
import { vanBanBieuMauRoutes } from './van-ban-bieu-mau.routing';

@NgModule({
  declarations: [ListVanBanBieuMauComponent, FormVanBanBieuMauComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(vanBanBieuMauRoutes),
  ]
})
export class VanBanBieuMauModule { }
