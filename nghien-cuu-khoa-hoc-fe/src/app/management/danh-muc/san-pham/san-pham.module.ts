import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormSanPhamComponent } from './form-san-pham/form-san-pham.component';
import { ListSanPhamComponent } from './list-san-pham/list-san-pham.component';
import { sanPhamRoutes } from './san-pham.routing';

@NgModule({
  declarations: [ListSanPhamComponent, FormSanPhamComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(sanPhamRoutes),
  ]
})
export class SanPhamModule { }
