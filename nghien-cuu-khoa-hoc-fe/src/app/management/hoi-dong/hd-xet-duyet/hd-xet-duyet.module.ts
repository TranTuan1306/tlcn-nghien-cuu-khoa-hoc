import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { hoiDongXetDuyetRoutes } from './hd-xet-duyet.routing';
import { ListHdXetDuyetComponent } from './list-hd-xet-duyet/list-hd-xet-duyet.component';
import { FormHdXetDuyetComponent } from './form-hd-xet-duyet/form-hd-xet-duyet.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(hoiDongXetDuyetRoutes)
  ],
  declarations: [ListHdXetDuyetComponent, FormHdXetDuyetComponent]
})
export class HoiDongXetDuyetModule { }
