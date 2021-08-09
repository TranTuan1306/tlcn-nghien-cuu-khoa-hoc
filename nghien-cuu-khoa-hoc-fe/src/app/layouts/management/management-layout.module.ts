import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ManagementHeaderComponent } from './management-header/management-header.component';
import { ManagementFooterComponent } from './management-footer/management-footer.component';
import { ManagementSiderComponent } from './management-sider/management-sider.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementLayoutComponent } from './management-layout/management-layout.component';

@NgModule({
  declarations: [
    ManagementHeaderComponent,
    ManagementFooterComponent,
    ManagementSiderComponent,
    ManagementLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
  ],
})
export class ManagementLayoutModule { }
