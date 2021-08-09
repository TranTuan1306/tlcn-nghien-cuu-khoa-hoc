import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementLayoutModule } from '../layouts/management/management-layout.module';
import { SharedModule } from '../shared/shared.module';
import { BieuMauModule } from '../shared/bieu-mau/bieu-mau.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ManagementLayoutModule,
    SharedModule,
    BieuMauModule
  ]
})
export class ManagementModule { }
