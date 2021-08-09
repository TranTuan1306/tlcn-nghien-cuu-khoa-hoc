import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginModule } from '../plugin.module';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Form01DeXuatDeTaiComponent } from './form01-de-xuat-de-tai/form01-de-xuat-de-tai.component';
import { Form02ThuyetMinhDeTaiComponent } from './form02-thuyet-minh-de-tai/form02-thuyet-minh-de-tai.component';
import { Form02bsThanhVienThamGiaComponent }
  from './form02-thuyet-minh-de-tai/form02bs-thanh-vien-tham-gia/form02bs-thanh-vien-tham-gia.component';
import { Form02bsDonViPhoiHopComponent } from './form02-thuyet-minh-de-tai/form02bs-don-vi-phoi-hop/form02bs-don-vi-phoi-hop.component';
import { Form02bsTienDoComponent } from './form02-thuyet-minh-de-tai/form02bs-tien-do/form02bs-tien-do.component';
import { Form02bsSanPhamComponent } from './form02-thuyet-minh-de-tai/form02bs-san-pham/form02bs-san-pham.component';
import { Form02bsPhuLucKinhPhiComponent } from './form02-thuyet-minh-de-tai/form02bs-phu-luc-kinh-phi/form02bs-phu-luc-kinh-phi.component';
import { TienDoThucHienComponent } from './tien-do-thuc-hien/tien-do-thuc-hien.component';

@NgModule({
  declarations: [
    Form01DeXuatDeTaiComponent,
    Form02ThuyetMinhDeTaiComponent,
    Form02bsThanhVienThamGiaComponent,
    Form02bsDonViPhoiHopComponent,
    Form02bsTienDoComponent,
    Form02bsSanPhamComponent,
    Form02bsPhuLucKinhPhiComponent,
    TienDoThucHienComponent,
  ],
  imports: [
    CommonModule,
    PluginModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    Form01DeXuatDeTaiComponent,
    Form02ThuyetMinhDeTaiComponent,
    TienDoThucHienComponent,
  ]
})
export class BieuMauModule { }
