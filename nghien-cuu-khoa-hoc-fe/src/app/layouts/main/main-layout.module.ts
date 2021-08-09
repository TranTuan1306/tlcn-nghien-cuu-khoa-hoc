import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainSiderComponent } from './main-sider/main-sider.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthModule } from 'src/app/auth/auth.module';

@NgModule({
  declarations: [
    MainHeaderComponent,
    MainFooterComponent,
    MainSiderComponent,
    MainLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    AuthModule,
  ],
  exports: [
  ],
  providers: [
  ],
})
export class MainLayoutModule { }
