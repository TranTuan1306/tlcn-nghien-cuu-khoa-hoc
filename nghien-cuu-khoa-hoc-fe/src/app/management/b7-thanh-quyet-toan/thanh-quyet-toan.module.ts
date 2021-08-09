import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { thanhQuyetToanRoutes } from './thanh-quyet-toan.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListDeTaiThanhLyHopDongComponent } from './list-de-tai-thanh-ly-hop-dong/list-de-tai-thanh-ly-hop-dong.component';
import { FormDeTaiThanhLyHopDongComponent } from './form-de-tai-thanh-ly-hop-dong/form-de-tai-thanh-ly-hop-dong.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(thanhQuyetToanRoutes),
    SharedModule
  ],
  declarations: [ListDeTaiThanhLyHopDongComponent, FormDeTaiThanhLyHopDongComponent],
})
export class ThanhQuyetToanModule { }
